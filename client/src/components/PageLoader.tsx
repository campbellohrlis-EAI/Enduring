// The previous full-screen splash intentionally held the first render for 1.2s.
// The site now prioritizes immediate access to its primary content. Route-level
// loading states are handled by React Suspense, so no blocking overlay is needed.

export default function PageLoader() {
  return null;
}
