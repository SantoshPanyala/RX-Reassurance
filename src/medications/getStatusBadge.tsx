import { RefillState } from '../types';
import { ClockIcon, AlertIcon, CheckIcon } from '../design-system/icons';

/**
 * Returns status badge configuration for medication cards
 */
export function getMedicationStatusBadge(refillState: RefillState) {
  switch (refillState) {
    case 'RISK':
      return {
        label: "Running low",
        colorPalette: "orange" as const,
        variant: "subtle" as const,
        icon: AlertIcon,
        animate: true,
      };
    case 'READY':
      return {
        label: "Ready",
        colorPalette: "green" as const,
        variant: "subtle" as const,
        icon: CheckIcon,
        animate: false,
      };
    case 'WAITING_FOR_DOCTOR':
      return {
        label: "Waiting",
        colorPalette: "blue" as const,
        variant: "subtle" as const,
        icon: ClockIcon,
        animate: true,
      };
    case 'REQUEST_RECEIVED':
      return {
        label: "Received",
        colorPalette: "gray" as const,
        variant: "subtle" as const,
        icon: ClockIcon,
        animate: false,
      };
    case 'DELAYED':
      return {
        label: "Delayed",
        colorPalette: "orange" as const,
        variant: "subtle" as const,
        icon: ClockIcon,
        animate: true,
      };
    default:
      return {
        label: "In progress",
        colorPalette: "gray" as const,
        variant: "subtle" as const,
        icon: ClockIcon,
        animate: false,
      };
  }
}
