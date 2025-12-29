import { ClockIcon, AlertIcon, CheckIcon } from '../design-system/icons';
import { RefillState } from '../types';

/**
 * Returns appropriate icon based on refill state
 * Icons are assistive - always used with text
 */
export function getStatusIcon(refillState: RefillState) {
  switch (refillState) {
    case 'RISK':
      return AlertIcon;
    case 'READY':
      return CheckIcon;
    case 'REQUEST_RECEIVED':
    case 'WAITING_FOR_DOCTOR':
    case 'DELAYED':
      return ClockIcon;
    default:
      return ClockIcon;
  }
}

