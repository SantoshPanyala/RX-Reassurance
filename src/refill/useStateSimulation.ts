import { useState, useEffect, useRef } from 'react';
import { Refill, BackendRefillState } from '../types';

/**
 * Demo-only: Simulates real-time state transitions
 * Automatically progresses refill through states over time
 * This makes the UI feel alive and demonstrates real-time behavior
 */
export function useStateSimulation(initialRefill: Refill | null): Refill | null {
  const [simulatedRefill, setSimulatedRefill] = useState<Refill | null>(initialRefill);
  const transitionCountRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!initialRefill) {
      return;
    }

    // Reset simulation when refill changes
    setSimulatedRefill(initialRefill);
    transitionCountRef.current = 0;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only simulate if not already in final state
    if (initialRefill.backendState === BackendRefillState.READY) {
      return;
    }

    // Simulate state transitions
    intervalRef.current = window.setInterval(() => {
      setSimulatedRefill((current) => {
        if (!current) return current;

        transitionCountRef.current += 1;
        const count = transitionCountRef.current;

        // Transition sequence:
        // 1. REQUEST_RECEIVED (initial)
        // 2. WAITING_FOR_DOCTOR (after 5s)
        // 3. READY (after 10s)
        
        if (current.backendState === BackendRefillState.REQUEST_RECEIVED && count >= 5) {
          return {
            ...current,
            backendState: BackendRefillState.WAITING_FOR_DOCTOR,
            updatedAt: Date.now(),
          };
        }

        if (current.backendState === BackendRefillState.WAITING_FOR_DOCTOR && count >= 10) {
          return {
            ...current,
            backendState: BackendRefillState.READY,
            updatedAt: Date.now(),
          };
        }

        // Update timestamp to show "live" feel
        return {
          ...current,
          updatedAt: Date.now() - (count * 1000), // Simulate time passing
        };
      });
    }, 1000); // Update every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initialRefill?.id]); // Re-run when refill ID changes

  return simulatedRefill;
}



