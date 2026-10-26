import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { getStaticSeo, injectStaticSeo, isKnownPublicRoute } from "./seo";
import { registerStorageProxy } from "./_core/storageProxy";
import { createContext } from "./_core/context";
import { getPermanentRedirect, normalizeCrawlPath, shouldCanonicalizeTrailingSlash } from "./crawlRouting";
import { appRouter } from "./routers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https://*.cloudfront.net https://*.manuscdn.com https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com",
  "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://formspree.io https://api.formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://forge.butterfly-effect.dev",
  "frame-src https://calendar.app.google https://maps.google.com https://www.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

function applySecurityHeaders(_req: express.Request, res: express.Response, next: express.NextFunction) {
  res.set({
    "Content-Security-Policy": CONTENT_SECURITY_POLICY,
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Origin-Agent-Cluster": "?1",
    "Permissions-Policy": "accelerometer=(), autoplay=(), camera=(), clipboard-read=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    "X-Download-Options": "noopen",
    "X-Frame-Options": "DENY",
    "X-Permitted-Cross-Domain-Policies": "none",
  });
  next();
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.disable("x-powered-by");
  app.use(applySecurityHeaders);

  // RFC 9116 gives researchers a clear, non-sensitive reporting path while the
  // public site is in Coming Soon mode.
  app.get("/.well-known/security.txt", (_req, res) => {
    res.type("text/plain").send([
      "Contact: mailto:partnerships@enduringadvantage.com?subject=Security%20report",
      "Preferred-Languages: en",
      "Canonical: https://enduringadvantage.com/.well-known/security.txt",
      "Expires: 2027-10-23T00:00:00.000Z",
      "",
    ].join("\n"));
  });

  // Managed media continues to resolve from the same /manus-storage paths used
  // across the editorial site when the public Node runtime serves the domain.
  registerStorageProxy(app);

  app.use("/api/trpc", createExpressMiddleware({
    router: appRouter,
    createContext,
  }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use((req, res, next) => {
    const requestedPath = req.path;
    const canonicalPath = normalizeCrawlPath(requestedPath);

    const destination = getPermanentRedirect(canonicalPath);
    if (destination) return res.redirect(301, destination);

    // Sitemap and canonical tags use slashless public URLs. Keep a single
    // crawl target instead of serving duplicate slash and slashless documents.
    if (shouldCanonicalizeTrailingSlash(requestedPath, isKnownPublicRoute)) {
      return res.redirect(301, canonicalPath);
    }

    next();
  });

  // Keep canonical public URLs slashless. Route metadata shells are also
  // generated for static hosts, while this fallback handles direct requests.
  app.use(express.static(staticPath, {
    redirect: false,
    setHeaders: (res, filePath) => {
      const isHashedBuildAsset = /[\\/]assets[\\/].+\.(?:js|css|woff2?|svg|png|webp|avif)$/i.test(filePath);
      const isVersionedAppIcon = /[\\/]favicon-(?:32|192|512)\.png$/i.test(filePath);

      if (isHashedBuildAsset || isVersionedAppIcon) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (req, res) => {
    const shell = fs.readFileSync(path.join(staticPath, "index.html"), "utf-8");
    const requestedPath = normalizeCrawlPath(req.path);
    const route = isKnownPublicRoute(requestedPath) ? requestedPath : "/404";
    const page = getStaticSeo(route);
    if (page.noIndex) res.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.status(route === "/404" ? 404 : 200).type("html").send(injectStaticSeo(shell, route));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
