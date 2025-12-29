import { RefillViewState } from '../types';
import { ClockIcon, AlertIcon, CheckIcon } from '../design-system/icons';

/**
 * Returns status badge configuration with icon
 * Used to create modern status indicators with visual feedback
 */
export function getStatusBadgeConfig(viewState: RefillViewState) {
  const title = viewState.title;

  // Risk state
  if (title === "You may run out soon") {
    return {
      label: "Running low",
      colorPalette: "orange" as const,
      variant: "subtle" as const,
      icon: AlertIcon,
      animate: true, // Pulse animation for risk
    };
  }

  // Ready state
  if (title === "Your medication is ready") {
    return {
      label: "Ready",
      colorPalette: "green" as const,
      variant: "subtle" as const,
      icon: CheckIcon,
      animate: false, // Static for ready
    };
  }

  // Waiting states
  if (
    title === "Waiting for doctor approval" ||
    title === "This is taking longer than expected"
  ) {
    return {
      label: "Waiting",
      colorPalette: "blue" as const,
      variant: "subtle" as const,
      icon: ClockIcon,
      animate: true, // Pulse animation for waiting
    };
  }

  // Request received
  if (title === "Request received") {
    return {
      label: "Received",
      colorPalette: "gray" as const,
      variant: "subtle" as const,
      icon: ClockIcon,
      animate: false,
    };
  }

  // Delayed
  if (title === "There's a delay") {
    return {
      label: "Delayed",
      colorPalette: "orange" as const,
      variant: "subtle" as const,
      icon: ClockIcon,
      animate: true, // Pulse for delayed
    };
  }

  // Default
  return {
    label: "In progress",
    colorPalette: "gray" as const,
    variant: "subtle" as const,
    icon: ClockIcon,
    animate: false,
  };
}
