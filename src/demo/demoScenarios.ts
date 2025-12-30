import { Refill, BackendRefillState } from '../types';

/**
 * Demo scenarios for interview walkthroughs
 * 
 * Each scenario represents a distinct refill state that can be selected
 * during demo mode. Scenarios map to existing Refill data structure.
 * No new logic - just predefined data for consistent demos.
 */

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  refill: Refill;
}

const BASE_TIME = Date.now();

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'fresh-request',
    name: 'Fresh Refill Request',
    description: 'Just submitted a refill request',
    refill: {
      id: 'demo-1',
      medicationName: 'Atorvastatin 20 mg',
      daysLeft: 15,
      backendState: BackendRefillState.REQUEST_RECEIVED,
      updatedAt: BASE_TIME - (1 * 60 * 60 * 1000), // 1 hour ago
    },
  },
  {
    id: 'waiting-doctor',
    name: 'Waiting for Doctor',
    description: 'Pharmacy is waiting for doctor approval',
    refill: {
      id: 'demo-2',
      medicationName: 'Lisinopril 10 mg',
      daysLeft: 8,
      backendState: BackendRefillState.WAITING_FOR_DOCTOR,
      updatedAt: BASE_TIME - (2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  },
  {
    id: 'delayed',
    name: 'Delayed Refill',
    description: 'Refill is delayed due to external factors',
    refill: {
      id: 'demo-3',
      medicationName: 'Metformin 500 mg',
      daysLeft: 5,
      backendState: BackendRefillState.DELAYED,
      updatedAt: BASE_TIME - (5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  },
  {
    id: 'low-supply',
    name: 'Low Supply Risk',
    description: 'Running low on medication - urgent attention needed',
    refill: {
      id: 'demo-4',
      medicationName: 'Amlodipine 5 mg',
      daysLeft: 2,
      backendState: BackendRefillState.WAITING_FOR_DOCTOR,
      updatedAt: BASE_TIME - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  },
  {
    id: 'ready',
    name: 'Ready for Pickup',
    description: 'Medication is ready - can pick up anytime',
    refill: {
      id: 'demo-5',
      medicationName: 'Levothyroxine 50 mcg',
      daysLeft: 20,
      backendState: BackendRefillState.READY,
      updatedAt: BASE_TIME - (1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  },
];

/**
 * Get a scenario by ID
 */
export function getScenarioById(id: string): DemoScenario | undefined {
  return DEMO_SCENARIOS.find(scenario => scenario.id === id);
}

/**
 * Get the default scenario (first one)
 */
export function getDefaultScenario(): DemoScenario {
  return DEMO_SCENARIOS[0];
}

