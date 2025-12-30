import { useState, useEffect, useRef, useMemo } from 'react';
import { Medication, Refill } from '../types';
import { getEvolvedMedications } from '../mockData';
import { adaptMedicationToRefill } from '../refill/adaptRefill';
import { startDemoSimulation } from '../refill/demoRefillSimulator';
import { useSimulatedTime } from '../utils/useSimulatedTime';
import { isDemoMode } from '../utils/demoMode';
import { DemoScenario, getDefaultScenario } from '../demo/demoScenarios';

export function useAppState() {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useAppState.ts:8',message:'useAppState hook entry',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  // Check if we're in demo mode (URL-based)
  const demoMode = isDemoMode();
  
  // Simulated time controller (uses real time in production, simulated in demo)
  const { currentTime, advanceDays } = useSimulatedTime();
  
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useAppState.ts:13',message:'About to call getEvolvedMedications',data:{currentTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  // Get evolved medications based on current time
  // In production: uses real time
  // In demo mode: uses simulated time
  const medications = useMemo(() => getEvolvedMedications(currentTime), [currentTime]);
  
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useAppState.ts:16',message:'getEvolvedMedications completed',data:{medicationsCount:medications?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  
  // Demo mode: Selected scenario and demo refill
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(
    demoMode ? getDefaultScenario() : null
  );
  const [demoRefill, setDemoRefill] = useState<Refill | null>(
    demoMode && selectedScenario ? selectedScenario.refill : null
  );
  const simulatorCleanupRef = useRef<(() => void) | null>(null);

  // Demo mode: Update demo refill when scenario changes
  useEffect(() => {
    if (!demoMode) {
      return;
    }

    if (selectedScenario) {
      // Reset demo refill to scenario's initial state
      setDemoRefill(selectedScenario.refill);
      
      // Cleanup any existing simulation
      if (simulatorCleanupRef.current) {
        simulatorCleanupRef.current();
        simulatorCleanupRef.current = null;
      }

      // Start simulation for the scenario
      const cleanup = startDemoSimulation(selectedScenario.refill, {
        onUpdate: (updatedRefill: Refill) => {
          setDemoRefill(updatedRefill);
        },
      });

      simulatorCleanupRef.current = cleanup;

      return () => {
        if (simulatorCleanupRef.current) {
          simulatorCleanupRef.current();
          simulatorCleanupRef.current = null;
        }
      };
    }
  }, [demoMode, selectedScenario]);

  // Production mode: Legacy development simulation (preserved for backward compatibility)
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  const [legacySimulatedRefill, setLegacySimulatedRefill] = useState<Refill | null>(null);
  const legacySimulatorCleanupRef = useRef<(() => void) | null>(null);
  const legacySimulatedMedicationIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Skip legacy simulation if in demo mode (demo mode takes precedence)
    if (demoMode || !isDevelopment) {
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
    legacySimulatedMedicationIdRef.current = medicationToSimulate.id;

    // Initialize with initial refill
    setLegacySimulatedRefill(initialRefill);

    // Start simulation
    const cleanup = startDemoSimulation(initialRefill, {
      onUpdate: (updatedRefill: Refill) => {
        setLegacySimulatedRefill(updatedRefill);
      },
    });

    legacySimulatorCleanupRef.current = cleanup;

    // Cleanup on unmount
    return () => {
      if (legacySimulatorCleanupRef.current) {
        legacySimulatorCleanupRef.current();
        legacySimulatorCleanupRef.current = null;
      }
    };
  }, [demoMode, isDevelopment, medications]);

  // Get the refill for the selected medication
  const getRefillForMedication = (medication: Medication | null): Refill | null => {
    if (!medication) return null;
    
    // Demo mode: Use demo refill if available
    if (demoMode && demoRefill) {
      return demoRefill;
    }
    
    // Legacy development mode: Use simulated refill if this is the simulated medication
    if (!demoMode && isDevelopment && legacySimulatedMedicationIdRef.current === medication.id) {
      if (legacySimulatedRefill) {
        return legacySimulatedRefill;
      }
      // Fallback to initial refill if simulation hasn't started yet
      return adaptMedicationToRefill(medication, currentTime);
    }
    
    // Production mode: Return adapted refill from medication data
    return adaptMedicationToRefill(medication, currentTime);
  };

  return {
    medications,
    selectedMedication,
    selectMedication: setSelectedMedication,
    goBack: () => setSelectedMedication(null),
    getRefillForMedication,
    isDemoMode: demoMode,
    currentTime,
    advanceDays,
    // Demo mode only
    selectedScenario,
    selectScenario: setSelectedScenario,
  };
}
