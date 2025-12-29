import { useState, useCallback } from 'react';

/**
 * Demo-only: Simulated time controller
 * 
 * Manages a simulated "now" that can be advanced manually for demo purposes.
 * Time only moves when user triggers it (no setInterval).
 */
export function useSimulatedTime() {
  const [simulatedTime, setSimulatedTime] = useState(() => Date.now());

  const advanceDays = useCallback((days: number) => {
    setSimulatedTime(prev => prev + (days * 24 * 60 * 60 * 1000));
  }, []);

  return {
    currentTime: simulatedTime,
    advanceDays,
  };
}

