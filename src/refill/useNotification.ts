import { useState, useEffect, useRef } from 'react';
import { RefillViewState } from '../types';

/**
 * Hook to detect notification-worthy state transitions
 * This mirrors the logic in notificationSimulator but is presentation-only
 * Does not change notification logic
 */
export function useNotification(
  currentState: RefillViewState
): string | null {
  const [notification, setNotification] = useState<string | null>(null);
  const previousTitleRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize on first render
    if (previousTitleRef.current === null) {
      previousTitleRef.current = currentState.title;
      return;
    }

    // Only show notification if title changed (state transition detected)
    if (previousTitleRef.current !== currentState.title) {
      // Notification 1: RISK state transition
      if (currentState.title === "You may run out soon") {
        setNotification("Medication risk detected: You may run out soon");
      }
      // Notification 2: STALE WAITING state transition
      else if (currentState.title === "This is taking longer than expected") {
        setNotification("Refill delayed longer than expected");
      }
      // Clear notification if state changed to something else
      else {
        setNotification(null);
      }

      previousTitleRef.current = currentState.title;
    }
  }, [currentState.title]);

  return notification;
}
