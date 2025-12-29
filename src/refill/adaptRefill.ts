import { Medication, Refill, BackendRefillState } from '../types';

export function adaptMedicationToRefill(
  medication: Medication | null,
  currentTime: number = Date.now()
): Refill | null {
  if (!medication) return null;

  // Map legacy refillState string to BackendRefillState enum
  let backendState: BackendRefillState;
  switch (medication.refillState) {
    case 'REQUEST_RECEIVED':
      backendState = BackendRefillState.REQUEST_RECEIVED;
      break;
    case 'WAITING_FOR_DOCTOR':
      backendState = BackendRefillState.WAITING_FOR_DOCTOR;
      break;
    case 'DELAYED':
      backendState = BackendRefillState.DELAYED;
      break;
    case 'READY':
      backendState = BackendRefillState.READY;
      break;
    case 'RISK':
      // RISK is not a backend state - treat as WAITING_FOR_DOCTOR for now
      backendState = BackendRefillState.WAITING_FOR_DOCTOR;
      break;
    default:
      backendState = BackendRefillState.REQUEST_RECEIVED;
  }

  return {
    id: medication.id,
    medicationName: medication.name,
    daysLeft: medication.daysLeft,
    backendState,
    updatedAt: medication.updatedAt || currentTime - (7 * 24 * 60 * 60 * 1000), // default to 7 days ago if missing
  };
}

