import { useState, useCallback, useEffect } from 'react';
import { isDemoMode } from './demoMode';

/**
 * Time controller that switches between real and simulated time
 * 
 * - Demo mode (?demo=true): Uses simulated time that can be advanced manually
 * - Production mode: Uses real Date.now() that updates automatically
 */
export function useSimulatedTime() {
  const [simulatedTime, setSimulatedTime] = useState(() => Date.now());
  const [realTime, setRealTime] = useState(() => Date.now());
  const demoMode = isDemoMode();

  // Update real time every second in production mode
  useEffect(() => {
    if (demoMode) {
      return; // Don't update real time in demo mode
    }

    const interval = setInterval(() => {
      setRealTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const advanceDays = useCallback((days: number) => {
    if (!demoMode) {
      return; // No-op in production mode
    }
    setSimulatedTime(prev => prev + (days * 24 * 60 * 60 * 1000));
  }, [demoMode]);

  return {
    currentTime: demoMode ? simulatedTime : realTime,
    advanceDays,
  };
}

