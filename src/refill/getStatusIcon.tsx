import { ClockIcon, AlertIcon, CheckIcon, BuildingIcon, UserIcon } from '../design-system/icons';

interface StatusIconProps {
  title: string;
}

/**
 * Returns appropriate icon based on status title
 * Icons are assistive - always used with text
 */
export function getStatusIcon({ title }: StatusIconProps) {
  // Risk state - alert icon
  if (title === "You may run out soon") {
    return AlertIcon;
  }
  
  // Ready state - check icon
  if (title === "Your medication is ready") {
    return CheckIcon;
  }
  
  // Waiting states - clock icon
  if (
    title === "Waiting for doctor approval" ||
    title === "This is taking longer than expected" ||
    title === "Request received" ||
    title === "There's a delay" ||
    title === "Refill in progress"
  ) {
    return ClockIcon;
  }
  
  return null;
}

/**
 * Returns ownership icon
 */
export function getOwnerIcon(owner?: 'Pharmacy' | 'Doctor' | 'Insurance') {
  if (owner === 'Pharmacy') {
    return BuildingIcon;
  }
  if (owner === 'Doctor') {
    return UserIcon;
  }
  return null;
}

