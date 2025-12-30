import { VStack } from '@chakra-ui/react';
import { useAppState } from './state/useAppState';
import { WireframeLayout } from './layout/WireframeLayout';
import { MedicationsOverview } from './medications/MedicationsOverview';
import { RefillStatus } from './refill/RefillStatus';
import { DemoTimeControls } from './refill/DemoTimeControls';
import { SimulatedTimeProvider } from './utils/SimulatedTimeContext';
import { DemoBanner } from './demo/DemoBanner';
import { ScenarioSelector } from './demo/ScenarioSelector';

function AppContent() {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:9',message:'AppContent render start',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:13',message:'About to call useAppState',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const {
    medications,
    selectedMedication,
    selectMedication,
    goBack,
    getRefillForMedication,
    isDemoMode,
    currentTime,
    advanceDays,
    selectedScenario,
    selectScenario,
  } = useAppState();
  
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:28',message:'useAppState returned',data:{medicationsCount:medications?.length,selectedMedication:!!selectedMedication},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  const refill = selectedMedication ? getRefillForMedication(selectedMedication) : null;

  return (
    <SimulatedTimeProvider currentTime={currentTime}>
      <WireframeLayout>
        <VStack align="stretch" gap={0}>
          {/* Demo-only UI */}
          {isDemoMode && (
            <>
              <DemoBanner />
              <ScenarioSelector
                selectedScenarioId={selectedScenario?.id || null}
                onSelectScenario={selectScenario}
              />
            </>
          )}

          {/* Main content */}
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
        </VStack>
        {isDemoMode && <DemoTimeControls advanceDays={advanceDays} />}
      </WireframeLayout>
    </SimulatedTimeProvider>
  );
}

function App() {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:45',message:'App component render',data:{url:window.location.href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  console.log('✅ Tracking App loaded successfully');
  return <AppContent />;
}

export default App;
