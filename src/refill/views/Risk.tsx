import { Medication } from '../../types';

interface RiskProps {
  medication: Medication;
}

export function Risk({ medication }: RiskProps) {
  return (
    <>
      <h2>You may run out soon</h2>
      <p>About {medication.daysLeft} days of medication left</p>
      <button>Contact pharmacy</button>
      <button>Contact doctor</button>
    </>
  );
}