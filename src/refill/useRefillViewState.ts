import { useRef, useEffect, useMemo } from 'react';
import { Refill, RefillViewState } from '../types';
import { getRefillViewState } from './getRefillViewState';
import { checkAndNotifyStateTransition } from './notificationSimulator';

export function useRefillViewState(
  refill: Refill | null,
  currentTime: number = Date.now()
): RefillViewState {
  const previousStateRef = useRef<RefillViewState | null>(null);
  
  // Memoize state calculation based on refill properties and current time
  const currentState = useMemo(() => getRefillViewState(refill, currentTime), [
    refill?.id,
    refill?.backendState,
    refill?.daysLeft,
    refill?.updatedAt,
    currentTime,
  ]);

  // Check for state transitions and trigger notifications
  useEffect(() => {
    const medicationName = refill?.medicationName;
    checkAndNotifyStateTransition(previousStateRef.current, currentState, medicationName);
    previousStateRef.current = currentState;
  }, [currentState, refill?.medicationName]);

  return currentState;
}

