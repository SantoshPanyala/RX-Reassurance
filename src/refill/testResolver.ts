import { getRefillViewState } from "./getRefillViewState";
import { Refill, BackendRefillState } from "../types";

const now = Date.now();

console.log("=== TEST HARNESS: Refill State Resolver ===\n");

// Case 1: REQUEST_RECEIVED
console.log("CASE 1: REQUEST_RECEIVED");
const case1: Refill = {
  id: "1",
  medicationName: "Atorvastatin",
  backendState: BackendRefillState.REQUEST_RECEIVED,
  updatedAt: now,
};
const result1 = getRefillViewState(case1);
console.log("Input:", case1);
console.log("Output:", result1);
console.log("Expected: title='Request received', owner='Pharmacy', showActions=false");
console.log("PASS:", 
  result1.title === "Request received" &&
  result1.owner === "Pharmacy" &&
  result1.showActions === false
);
console.log("--------------\n");

// Case 2: Risk overrides waiting
console.log("CASE 2: Risk overrides WAITING_FOR_DOCTOR");
const case2: Refill = {
  id: "2",
  medicationName: "Lisinopril",
  backendState: BackendRefillState.WAITING_FOR_DOCTOR,
  daysLeft: 2,
  updatedAt: now - 2 * 24 * 60 * 60 * 1000,
};
const result2 = getRefillViewState(case2);
console.log("Input:", case2);
console.log("Output:", result2);
console.log("Expected: title='You may run out soon', owner='Doctor', showActions=true, actions include both");
console.log("PASS:", 
  result2.title === "You may run out soon" &&
  result2.owner === "Doctor" &&
  result2.showActions === true &&
  result2.actions?.includes("CONTACT_PHARMACY") &&
  result2.actions?.includes("CONTACT_DOCTOR")
);
console.log("--------------\n");

// Case 3: Stale waiting
console.log("CASE 3: Stale WAITING_FOR_DOCTOR");
const case3: Refill = {
  id: "3",
  medicationName: "Metformin",
  backendState: BackendRefillState.WAITING_FOR_DOCTOR,
  daysLeft: 10,
  updatedAt: now - 5 * 24 * 60 * 60 * 1000, // 5 days ago (> 3 days stale threshold)
};
const result3 = getRefillViewState(case3);
console.log("Input:", case3);
console.log("Output:", result3);
console.log("Expected: title='This is taking longer than expected', owner='Doctor', showActions=false");
console.log("PASS:", 
  result3.title === "This is taking longer than expected" &&
  result3.owner === "Doctor" &&
  result3.showActions === false
);
console.log("--------------\n");

// Case 4: READY
console.log("CASE 4: READY");
const case4: Refill = {
  id: "4",
  medicationName: "Amlodipine",
  backendState: BackendRefillState.READY,
  updatedAt: now,
};
const result4 = getRefillViewState(case4);
console.log("Input:", case4);
console.log("Output:", result4);
console.log("Expected: title='Your medication is ready', owner='Pharmacy', showActions=false");
console.log("PASS:", 
  result4.title === "Your medication is ready" &&
  result4.owner === "Pharmacy" &&
  result4.showActions === false
);
console.log("--------------\n");

// Case 5: Edge-case dominance proof - READY with risk
console.log("CASE 5: Edge-case - READY with daysLeft=1 (risk should override)");
const case5: Refill = {
  id: "5",
  medicationName: "Warfarin",
  backendState: BackendRefillState.READY,
  daysLeft: 1,
  updatedAt: now,
};
const result5 = getRefillViewState(case5);
console.log("Input:", case5);
console.log("Output:", result5);
console.log("Expected: title='You may run out soon' (NOT 'Your medication is ready')");
const case5Pass = result5.title === "You may run out soon";
console.log("PASS:", case5Pass);
console.log("VERIFY: title is NOT 'Your medication is ready' (risk overrides ready)");
console.log("--------------\n");

// Case 6: Error state (null refill)
console.log("CASE 6: Error state (null refill)");
const result6 = getRefillViewState(null);
console.log("Input: null");
console.log("Output:", result6);
console.log("Expected: title='We're having trouble loading this refill', showActions=true, actions=['CONTACT_PHARMACY']");
console.log("PASS:", 
  result6.title === "We're having trouble loading this refill" &&
  result6.showActions === true &&
  result6.actions?.includes("CONTACT_PHARMACY")
);
console.log("--------------\n");

// Case 7: Fresh waiting (not stale)
console.log("CASE 7: Fresh WAITING_FOR_DOCTOR (not stale)");
const case7: Refill = {
  id: "7",
  medicationName: "Aspirin",
  backendState: BackendRefillState.WAITING_FOR_DOCTOR,
  daysLeft: 15,
  updatedAt: now - 1 * 24 * 60 * 60 * 1000, // 1 day ago (< 3 days, not stale)
};
const result7 = getRefillViewState(case7);
console.log("Input:", case7);
console.log("Output:", result7);
console.log("Expected: title='Waiting for doctor approval' (NOT stale message)");
const case7Pass = result7.title === "Waiting for doctor approval";
console.log("PASS:", case7Pass);
console.log("VERIFY: title is NOT stale message (fresh waiting)");
console.log("--------------\n");

console.log("=== TEST COMPLETE ===");

