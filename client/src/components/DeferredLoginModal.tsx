import { lazy, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LoginModal = lazy(() => import('@/components/LoginModal'));

/** Loads the supplier sign-in interface only after a visitor requests it. */
export default function DeferredLoginModal() {
  const { loginModalOpen } = useAuth();

  if (!loginModalOpen) return null;

  return (
    <Suspense fallback={null}>
      <LoginModal />
    </Suspense>
  );
}
