// Backend refill states (from API)
export enum BackendRefillState {
  REQUEST_RECEIVED = "REQUEST_RECEIVED",
  WAITING_FOR_DOCTOR = "WAITING_FOR_DOCTOR",
  DELAYED = "DELAYED",
  READY = "READY",
}

// Raw refill data from backend
export interface Refill {
  id: string;
  medicationName: string;
  daysLeft?: number;
  backendState: BackendRefillState;
  updatedAt: number; // timestamp in ms
}

// UI contract - what components receive
export interface RefillViewState {
  title: string;
  description?: string;
  owner?: "Pharmacy" | "Doctor" | "Insurance";
  showActions: boolean;
  actions?: ("CONTACT_PHARMACY" | "CONTACT_DOCTOR")[];
  daysLeft?: number;
  reassurance?: string; // Optional reassurance microcopy for non-risk states
}

// Legacy types (for backward compatibility)
export type RefillState =
  | 'REQUEST_RECEIVED'
  | 'WAITING_FOR_DOCTOR'
  | 'DELAYED'
  | 'RISK'
  | 'READY';

export interface Medication {
  id: string;
  name: string;
  dose: string;
  daysLeft?: number;
  refillState: RefillState;
  updatedAt?: number;
}
