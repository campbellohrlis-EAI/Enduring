import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_SEO, injectStaticSeo } from '../server/seo';
import { IS_COMING_SOON } from '../shared/siteMode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PUBLIC = path.join(PROJECT_ROOT, 'dist', 'public');
const shell = fs.readFileSync(path.join(DIST_PUBLIC, 'index.html'), 'utf8');

const indexableRoutes = IS_COMING_SOON
  ? ['/']
  : Object.entries(STATIC_SEO)
    .filter(([route, metadata]) => route !== '/404' && !metadata.noIndex)
    .map(([route]) => route);

for (const route of indexableRoutes) {
  const destination = route === '/'
    ? path.join(DIST_PUBLIC, 'index.html')
    : path.join(DIST_PUBLIC, route.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, injectStaticSeo(shell, route), 'utf8');
}

console.log(`Prerendered crawlable metadata shells for ${indexableRoutes.length} canonical routes.`);
