/**
 * Demo mode detection utility
 * 
 * Demo mode is active when URL contains ?demo=true
 * This is URL-based only - no environment variables required
 * Works on Vercel and local development
 */

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('demo') === 'true';
}

