import { useState, useEffect, useRef, useMemo } from 'react';
import { Medication, Refill, BackendRefillState } from '../types';
import { getEvolvedMedications } from '../mockData';
import { adaptMedicationToRefill } from '../refill/adaptRefill';
import { startDemoSimulation } from '../refill/demoRefillSimulator';
import { useSimulatedTime } from '../utils/useSimulatedTime';

export function useAppState() {
  // Simulated time controller
  const { currentTime, advanceDays } = useSimulatedTime();
  
  // Get evolved medications based on current simulated time
  const medications = useMemo(() => getEvolvedMedications(currentTime), [currentTime]);
  
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  
  // Demo simulation: track simulated refill state (only ONE refill)
  const [simulatedRefill, setSimulatedRefill] = useState<Refill | null>(null);
  const simulatorCleanupRef = useRef<(() => void) | null>(null);
  const simulatedMedicationIdRef = useRef<string | null>(null);

  // Enable simulation ONLY in development mode
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

  useEffect(() => {
    if (!isDevelopment) {
      return;
    }

    // Find the first medication that's not READY to simulate
    const medicationToSimulate = medications.find(
      med => med.refillState !== 'READY' && med.refillState !== 'RISK'
    );

    if (!medicationToSimulate) {
      return; // No medication to simulate
    }

    // Convert to Refill format
    const initialRefill = adaptMedicationToRefill(medicationToSimulate);
    if (!initialRefill) {
      return;
    }

    // Store which medication we're simulating
    simulatedMedicationIdRef.current = medicationToSimulate.id;

    // Initialize with initial refill
    setSimulatedRefill(initialRefill);

    // Start simulation
    const cleanup = startDemoSimulation(initialRefill, {
      onUpdate: (updatedRefill: Refill) => {
        setSimulatedRefill(updatedRefill);
      },
    });

    simulatorCleanupRef.current = cleanup;

    // Cleanup on unmount
    return () => {
      if (simulatorCleanupRef.current) {
        simulatorCleanupRef.current();
        simulatorCleanupRef.current = null;
      }
    };
  }, [isDevelopment, medications]);

  // Get the refill for the selected medication (use simulated if available)
  const getRefillForMedication = (medication: Medication | null): Refill | null => {
    if (!medication) return null;
    
    // If this is the simulated medication, return simulated refill (or initial if not set yet)
    if (isDevelopment && simulatedMedicationIdRef.current === medication.id) {
      if (simulatedRefill) {
        return simulatedRefill;
      }
      // Fallback to initial refill if simulation hasn't started yet
      return adaptMedicationToRefill(medication, currentTime);
    }
    
    // Otherwise, return adapted refill
    return adaptMedicationToRefill(medication, currentTime);
  };

  return {
    medications,
    selectedMedication,
    selectMedication: setSelectedMedication,
    goBack: () => setSelectedMedication(null),
    getRefillForMedication,
    isDemoMode: isDevelopment && simulatedMedicationIdRef.current !== null,
    currentTime,
    advanceDays,
  };
}
