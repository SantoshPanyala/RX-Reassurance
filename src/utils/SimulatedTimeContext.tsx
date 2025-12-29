import { createContext, useContext, ReactNode } from 'react';

interface SimulatedTimeContextValue {
  currentTime: number;
}

const SimulatedTimeContext = createContext<SimulatedTimeContextValue | null>(null);

export function SimulatedTimeProvider({
  currentTime,
  children,
}: {
  currentTime: number;
  children: ReactNode;
}) {
  return (
    <SimulatedTimeContext.Provider value={{ currentTime }}>
      {children}
    </SimulatedTimeContext.Provider>
  );
}

export function useSimulatedTimeContext(): number {
  const context = useContext(SimulatedTimeContext);
  return context?.currentTime ?? Date.now();
}

