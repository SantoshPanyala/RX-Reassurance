import { RefillState } from '../types';

/**
 * Convert backend refill state enum to human-readable label
 * Used for display only - no business logic
 */
export function getStatusLabel(refillState: RefillState): string {
  switch (refillState) {
    case 'REQUEST_RECEIVED':
      return 'Request received';
    case 'WAITING_FOR_DOCTOR':
      return 'Waiting for approval';
    case 'DELAYED':
      return 'Delayed';
    case 'RISK':
      return 'Running low';
    case 'READY':
      return 'Ready for pickup';
    default:
      return 'In progress';
  }
}

