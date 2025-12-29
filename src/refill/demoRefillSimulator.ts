import { Refill, BackendRefillState } from '../types';
import { RISK_DAYS_THRESHOLD } from './refillThresholds';

/**
 * DEMO-ONLY: Live refill progression simulator
 * 
 * This is NOT production logic.
 * This is for showcasing real-time behavior in a prototype.
 * 
 * Simulates realistic refill state transitions over time so the UI feels alive.
 * 
 * Rules:
 * - REQUEST_RECEIVED → (5s) → WAITING_FOR_DOCTOR
 * - WAITING_FOR_DOCTOR → (8s) → DELAYED
 * - DELAYED → (8s) → READY
 * - RISK OVERRIDE: If daysLeft <= RISK_DAYS_THRESHOLD, RISK interrupts any progression
 * - READY state stops progression
 * 
 * This file must NOT contain UI code.
 * This file must NOT duplicate resolver logic.
 */

export type SimulatorCleanup = () => void;

export interface SimulatorOptions {
  onUpdate: (updatedRefill: Refill) => void;
}

/**
 * Starts a demo simulation for a refill.
 * 
 * @param refill - Initial refill data
 * @param options - Configuration including update callback
 * @returns Cleanup function to stop the simulation
 */
export function startDemoSimulation(
  refill: Refill,
  options: SimulatorOptions
): SimulatorCleanup {
  // Don't simulate if already in final state
  if (refill.backendState === BackendRefillState.READY) {
    return () => {}; // No-op cleanup
  }

  let currentRefill: Refill = { ...refill };
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  // Check for RISK override
  const isRiskState = currentRefill.daysLeft !== undefined && 
                      currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;

  // RISK interrupts progression - don't progress if in risk
  if (isRiskState) {
    return () => {}; // No-op cleanup - risk state doesn't progress
  }

  // Transition: REQUEST_RECEIVED → WAITING_FOR_DOCTOR (after 5 seconds)
  if (currentRefill.backendState === BackendRefillState.REQUEST_RECEIVED) {
    const timeout1 = setTimeout(() => {
      currentRefill = {
        ...currentRefill,
        backendState: BackendRefillState.WAITING_FOR_DOCTOR,
        updatedAt: Date.now(),
      };
      options.onUpdate(currentRefill);

      // Check for RISK after transition
      const isRiskAfterTransition = currentRefill.daysLeft !== undefined && 
                                     currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
      if (isRiskAfterTransition) {
        return; // Stop progression if risk detected
      }

      // Transition: WAITING_FOR_DOCTOR → DELAYED (after 8 seconds from this point)
      const timeout2 = setTimeout(() => {
        // Check for RISK before transitioning
        const isRiskBeforeTransition = currentRefill.daysLeft !== undefined && 
                                       currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
        if (isRiskBeforeTransition) {
          return; // Stop progression if risk detected
        }

        currentRefill = {
          ...currentRefill,
          backendState: BackendRefillState.DELAYED,
          updatedAt: Date.now(),
        };
        options.onUpdate(currentRefill);

        // Check for RISK after transition
        const isRiskAfterDelayed = currentRefill.daysLeft !== undefined && 
                                   currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
        if (isRiskAfterDelayed) {
          return; // Stop progression if risk detected
        }

        // Transition: DELAYED → READY (after 8 seconds from this point)
        const timeout3 = setTimeout(() => {
          // Check for RISK before transitioning
          const isRiskBeforeReady = currentRefill.daysLeft !== undefined && 
                                    currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
          if (isRiskBeforeReady) {
            return; // Stop progression if risk detected
          }

          currentRefill = {
            ...currentRefill,
            backendState: BackendRefillState.READY,
            updatedAt: Date.now(),
          };
          options.onUpdate(currentRefill);
        }, 8000); // 8 seconds

        timeouts.push(timeout3);
      }, 8000); // 8 seconds

      timeouts.push(timeout2);
    }, 5000); // 5 seconds

    timeouts.push(timeout1);
  }
  // Transition: WAITING_FOR_DOCTOR → DELAYED (after 8 seconds)
  else if (currentRefill.backendState === BackendRefillState.WAITING_FOR_DOCTOR) {
    const timeout1 = setTimeout(() => {
      // Check for RISK before transitioning
      const isRiskBeforeTransition = currentRefill.daysLeft !== undefined && 
                                     currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
      if (isRiskBeforeTransition) {
        return; // Stop progression if risk detected
      }

      currentRefill = {
        ...currentRefill,
        backendState: BackendRefillState.DELAYED,
        updatedAt: Date.now(),
      };
      options.onUpdate(currentRefill);

      // Check for RISK after transition
      const isRiskAfterTransition = currentRefill.daysLeft !== undefined && 
                                    currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
      if (isRiskAfterTransition) {
        return; // Stop progression if risk detected
      }

      // Transition: DELAYED → READY (after 8 seconds from this point)
      const timeout2 = setTimeout(() => {
        // Check for RISK before transitioning
        const isRiskBeforeReady = currentRefill.daysLeft !== undefined && 
                                  currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
        if (isRiskBeforeReady) {
          return; // Stop progression if risk detected
        }

        currentRefill = {
          ...currentRefill,
          backendState: BackendRefillState.READY,
          updatedAt: Date.now(),
        };
        options.onUpdate(currentRefill);
      }, 8000); // 8 seconds

      timeouts.push(timeout2);
    }, 8000); // 8 seconds

    timeouts.push(timeout1);
  }
  // Transition: DELAYED → READY (after 8 seconds)
  else if (currentRefill.backendState === BackendRefillState.DELAYED) {
    const timeout1 = setTimeout(() => {
      // Check for RISK before transitioning
      const isRiskBeforeReady = currentRefill.daysLeft !== undefined && 
                                currentRefill.daysLeft <= RISK_DAYS_THRESHOLD;
      if (isRiskBeforeReady) {
        return; // Stop progression if risk detected
      }

      currentRefill = {
        ...currentRefill,
        backendState: BackendRefillState.READY,
        updatedAt: Date.now(),
      };
      options.onUpdate(currentRefill);
    }, 8000); // 8 seconds

    timeouts.push(timeout1);
  }

  // Return cleanup function
  return () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
}

