/**
 * Rx number validation utility
 * 
 * Validates Rx numbers against the demo Rx list.
 * Used to gate access to the tracking app.
 */

export interface DemoCustomer {
  rxNumber: string;
  name: string;
  dob: string;
  visitCount: number;
}

// Demo customer data - only these 5 Rx numbers will work
export const DEMO_RX_LIST: DemoCustomer[] = [
  { rxNumber: "RX1001", name: "John Doe", dob: "1985-04-12", visitCount: 12 },
  { rxNumber: "RX1002", name: "Maria Smith", dob: "1978-09-22", visitCount: 8 },
  { rxNumber: "RX1003", name: "Anil Kumar", dob: "1990-01-15", visitCount: 5 },
  { rxNumber: "RX1004", name: "Sarah Johnson", dob: "1969-11-03", visitCount: 15 },
  { rxNumber: "RX1005", name: "David Lee", dob: "1982-06-30", visitCount: 3 }
];

/**
 * Validates an Rx number against the demo list
 * @param rxNumber - The Rx number to validate
 * @returns The matching customer data if valid, null otherwise
 */
export function validateRxNumber(rxNumber: string | null): DemoCustomer | null {
  if (!rxNumber) {
    return null;
  }

  const trimmedRx = rxNumber.trim().toUpperCase();
  const foundCustomer = DEMO_RX_LIST.find(
    customer => customer.rxNumber.toUpperCase() === trimmedRx
  );

  return foundCustomer || null;
}

/**
 * Gets Rx number from URL search params
 */
export function getRxFromUrl(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('rx');
}

