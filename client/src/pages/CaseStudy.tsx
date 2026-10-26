// Redirect legacy case study URLs to home
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function CaseStudy() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation('/');
  }, [setLocation]);
  return null;
}
