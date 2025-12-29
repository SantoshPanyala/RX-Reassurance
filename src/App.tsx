import { useAppState } from './state/useAppState';
import { WireframeLayout } from './layout/WireframeLayout';
import { MedicationsOverview } from './medications/MedicationsOverview';
import { RefillStatus } from './refill/RefillStatus';
import { DemoTimeControls } from './refill/DemoTimeControls';
import { SimulatedTimeProvider } from './utils/SimulatedTimeContext';

function App() {
  const {
    medications,
    selectedMedication,
    selectMedication,
    goBack,
    getRefillForMedication,
    isDemoMode,
    currentTime,
    advanceDays,
  } = useAppState();

  const refill = selectedMedication ? getRefillForMedication(selectedMedication) : null;

  return (
    <SimulatedTimeProvider currentTime={currentTime}>
      <WireframeLayout>
        {!selectedMedication ? (
          <MedicationsOverview
            medications={medications}
            onSelect={selectMedication}
          />
        ) : (
          <RefillStatus
            medication={selectedMedication}
            refill={refill}
            isDemoMode={isDemoMode}
            currentTime={currentTime}
            onBack={goBack}
          />
        )}
        {isDemoMode && <DemoTimeControls advanceDays={advanceDays} />}
      </WireframeLayout>
    </SimulatedTimeProvider>
  );
}

export default App;
