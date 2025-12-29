import { Refill, BackendRefillState, RefillViewState } from '../types';
import { RISK_DAYS_THRESHOLD, STALE_WAITING_DAYS } from './refillThresholds';
import { formatDaysLeftDescription } from '../utils/formatDays';

export function getRefillViewState(
  refill: Refill | null,
  currentTime: number = Date.now()
): RefillViewState {
  // 1) Handle failure safely
  if (!refill || !refill.id || !refill.backendState) {
    return {
      title: "We're having trouble loading this refill",
      description: undefined,
      owner: undefined,
      showActions: true,
      actions: ["CONTACT_PHARMACY"],
    };
  }

  const { backendState, daysLeft, updatedAt } = refill;
  const now = currentTime;
  const daysSinceUpdate = (now - updatedAt) / (1000 * 60 * 60 * 24);

  // 2) Risk overrides everything
  if (daysLeft !== undefined && daysLeft <= RISK_DAYS_THRESHOLD) {
    const owner = backendState === BackendRefillState.WAITING_FOR_DOCTOR 
      ? "Doctor" 
      : "Pharmacy";

    return {
      title: "You may run out soon",
      description: formatDaysLeftDescription(daysLeft),
      owner,
      showActions: true,
      actions: ["CONTACT_PHARMACY", "CONTACT_DOCTOR"],
      daysLeft,
      // No reassurance for risk states - preserve urgency
    };
  }

  // 3) Handle backend states
  switch (backendState) {
    case BackendRefillState.REQUEST_RECEIVED:
      return {
        title: "Request received",
        description: undefined, // Reassurance handles the message for REQUEST_RECEIVED state
        owner: "Pharmacy",
        showActions: false,
        reassurance: "No action needed right now. We'll keep you updated.",
      };

    case BackendRefillState.WAITING_FOR_DOCTOR:
      if (daysSinceUpdate > STALE_WAITING_DAYS) {
        return {
          title: "This is taking longer than expected",
          description: "Your refill request is still pending doctor approval.",
          owner: "Doctor",
          showActions: false,
          // No reassurance for stale waiting - user should be aware
        };
      }
      return {
        title: "Waiting for doctor approval",
        description: undefined, // Reassurance handles the message for WAITING state
        owner: "Doctor",
        showActions: false,
        reassurance: "This is common. We'll let you know if anything changes.",
      };

    case BackendRefillState.DELAYED:
      return {
        title: "There's a delay",
        description: "Your refill request has been delayed. We'll notify you when it's ready.",
        owner: "Pharmacy",
        showActions: false,
        // No reassurance for delayed state
      };

    case BackendRefillState.READY:
      return {
        title: "Your medication is ready",
        description: undefined, // Reassurance handles the message for READY state
        owner: "Pharmacy",
        showActions: false,
        reassurance: "You're all set. Pick up when it's convenient for you.",
      };

    default:
      // Reassurance fallback
      return {
        title: "Refill in progress",
        description: "Your refill is being processed.",
        owner: "Pharmacy",
        showActions: false,
      };
  }
}

