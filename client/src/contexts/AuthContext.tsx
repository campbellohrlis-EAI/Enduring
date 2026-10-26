// =============================================================================
// ENDURING ADVANTAGE, Auth Context
// Lightweight client-side auth gate for supplier contact details.
// No real backend, stores a flag in localStorage after "login".
// =============================================================================

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "ea_auth_v1";

// Demo credentials, in production these would be validated server-side
const DEMO_EMAIL = "member@enduringadvantage.com";
const DEMO_PASSWORD = "EnduringAdvantage2025";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const login = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      // Simulate a brief network delay
      await new Promise((r) => setTimeout(r, 600));
      if (
        email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() &&
        password === DEMO_PASSWORD
      ) {
        setIsLoggedIn(true);
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        setLoginModalOpen(false);
        return { ok: true };
      }
      return { ok: false, error: "Invalid email or password." };
    },
    []
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const openLoginModal = useCallback(() => setLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setLoginModalOpen(false), []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, openLoginModal, closeLoginModal, loginModalOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
