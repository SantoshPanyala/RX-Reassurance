import { Medication } from './types';
import { STALE_WAITING_DAYS } from './refill/refillThresholds';

// Base mock data with initial timestamps (relative to a fixed start time)
const BASE_TIME = Date.now();

const baseMedicationsMock: Medication[] = [
  {
    id: '1',
    name: 'Atorvastatin',
    dose: '20 mg',
    daysLeft: 12,
    refillState: 'REQUEST_RECEIVED',
    updatedAt: BASE_TIME - (1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Lisinopril',
    dose: '10 mg',
    daysLeft: 2,
    refillState: 'WAITING_FOR_DOCTOR',
    updatedAt: BASE_TIME - (2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Metformin',
    dose: '500 mg',
    daysLeft: 25,
    refillState: 'WAITING_FOR_DOCTOR',
    updatedAt: BASE_TIME - (5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'Amlodipine',
    dose: '5 mg',
    refillState: 'READY',
    updatedAt: BASE_TIME - (1 * 24 * 60 * 60 * 1000),
  },
];

// Export base mock for backward compatibility
export const medicationsMock = baseMedicationsMock;

/**
 * Demo-only: Evolves mock medication data based on simulated time
 * 
 * Deterministic changes:
 * - daysLeft decreases as time advances from base time
 * - WAITING_FOR_DOCTOR becomes stale after STALE_WAITING_DAYS threshold
 * - States transition deterministically based on time progression
 */
export function getEvolvedMedications(currentTime: number): Medication[] {
  const timeDelta = currentTime - BASE_TIME;
  const daysDelta = timeDelta / (1000 * 60 * 60 * 24);

  return baseMedicationsMock.map(med => {
    const daysSinceUpdate = (currentTime - med.updatedAt) / (1000 * 60 * 60 * 24);
    
    // Evolve daysLeft if it exists
    let evolvedDaysLeft = med.daysLeft;
    if (med.daysLeft !== undefined) {
      evolvedDaysLeft = Math.max(0, med.daysLeft - daysDelta);
    }

    // Deterministic state transitions based on time
    let evolvedState = med.refillState;
    
    // REQUEST_RECEIVED → WAITING_FOR_DOCTOR after 1 day
    if (med.refillState === 'REQUEST_RECEIVED' && daysSinceUpdate >= 1) {
      evolvedState = 'WAITING_FOR_DOCTOR';
    }
    
    // WAITING_FOR_DOCTOR can become stale (but state stays WAITING_FOR_DOCTOR - resolver handles stale display)
    // RISK appears when daysLeft <= 3 (handled by resolver, not here)
    
    // WAITING_FOR_DOCTOR → READY after 7 days (if not in risk)
    if (
      med.refillState === 'WAITING_FOR_DOCTOR' && 
      daysSinceUpdate >= 7 &&
      (evolvedDaysLeft === undefined || evolvedDaysLeft > 3)
    ) {
      evolvedState = 'READY';
    }

    return {
      ...med,
      daysLeft: evolvedDaysLeft,
      refillState: evolvedState,
      // Keep original updatedAt - it represents when the backend state was last updated
      // The resolver uses this to calculate daysSinceUpdate
    };
  });
}
