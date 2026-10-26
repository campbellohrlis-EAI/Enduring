// =============================================================================
// ENDURING ADVANTAGE, Login Modal
// Sage Editorial design: light cream, dark forest-green text, serif headings
// Shown when an unauthenticated user tries to view supplier contact details.
// =============================================================================

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginModal() {
  const { loginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus email field when modal opens
  useEffect(() => {
    if (loginModalOpen) {
      setError(null);
      setTimeout(() => emailRef.current?.focus(), 80);
    }
  }, [loginModalOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Login failed.");
    }
  }

  return (
    <Dialog open={loginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-0 shadow-2xl"
        style={{ background: "#f9f6f0" }}
      >
        {/* Header band */}
        <div
          className="px-8 pt-8 pb-6"
          style={{ background: "#1a2e1a" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#8fba8f" }}
            >
              Members Only
            </span>
          </div>
          <DialogHeader>
            <DialogTitle
              className="text-2xl font-serif text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sign in to view<br />contact details
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm" style={{ color: "#a8c5a8" }}>
              Supplier website and email links are available to Enduring Advantage members.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
              style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="login-email"
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "#3d5c3d" }}
            >
              Email address
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#8fba8f" }}
              />
              <Input
                id="login-email"
                ref={emailRef}
                type="email"
                autoComplete="email"
                placeholder="you@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 border-2 bg-white focus:ring-0"
                style={{
                  borderColor: "#d4e4d4",
                  color: "#1a2e1a",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="login-password"
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "#3d5c3d" }}
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 h-11 border-2 bg-white focus:ring-0"
                style={{
                  borderColor: "#d4e4d4",
                  color: "#1a2e1a",
                  fontSize: "0.9rem",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded"
                style={{ color: "#8fba8f" }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-sm font-semibold tracking-wide transition-all"
            style={{
              background: loading ? "#6b9e6b" : "#2d5a2d",
              color: "#fff",
              border: "none",
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Footer note */}
          <p className="text-center text-xs" style={{ color: "#7a9e7a" }}>
            Not a member?{" "}
            <a
              href="#contact"
              onClick={closeLoginModal}
              className="underline underline-offset-2 hover:text-[#2d5a2d] transition-colours"
              style={{ color: "#3d7a3d" }}
            >
              Get in touch
            </a>{" "}
            to request access.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
