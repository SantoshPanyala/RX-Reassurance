import { RefillViewState } from '../types';

export function checkAndNotifyStateTransition(
  previousState: RefillViewState | null,
  currentState: RefillViewState,
  medicationName?: string
): void {
  if (!previousState) {
    // First render, no notification
    return;
  }

  // Check if state meaning changed (transition detected)
  const titleChanged = previousState.title !== currentState.title;
  if (!titleChanged) {
    // Same state, no notification
    return;
  }

  // Notification 1: RISK state transition detected
  if (currentState.title === "You may run out soon") {
    const name = medicationName || "medication";
    console.log(`NOTIFICATION: Medication risk detected – ${name}`);
    return;
  }

  // Notification 2: STALE WAITING state transition detected
  if (currentState.title === "This is taking longer than expected") {
    const name = medicationName || "medication";
    console.log(`NOTIFICATION: Refill delayed longer than expected – ${name}`);
    return;
  }

  // Notification 3: READY state transition detected
  if (currentState.title === "Your medication is ready") {
    const name = medicationName || "medication";
    console.log(`NOTIFICATION: Medication ready – ${name}`);
    return;
  }
}

