import { Box, VStack, HStack, Button, Text, Heading } from '@chakra-ui/react';
import { DemoScenario, DEMO_SCENARIOS } from './demoScenarios';

interface ScenarioSelectorProps {
  selectedScenarioId: string | null;
  onSelectScenario: (scenario: DemoScenario) => void;
}

/**
 * Demo-only: Scenario selector component
 * 
 * Allows selecting from predefined demo scenarios during interview walkthroughs.
 * Only visible in demo mode.
 */
export function ScenarioSelector({ selectedScenarioId, onSelectScenario }: ScenarioSelectorProps) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="sm"
    >
      <VStack align="stretch" gap={3}>
        <Heading fontSize="md" fontWeight="600" color="gray.900">
          Demo Scenarios
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Select a scenario to demonstrate different refill states
        </Text>
        <HStack gap={2} flexWrap="wrap">
          {DEMO_SCENARIOS.map((scenario) => (
            <Button
              key={scenario.id}
              size="sm"
              variant={selectedScenarioId === scenario.id ? 'solid' : 'outline'}
              colorPalette={selectedScenarioId === scenario.id ? 'blue' : 'gray'}
              onClick={() => onSelectScenario(scenario)}
              aria-label={`Select scenario: ${scenario.name}`}
            >
              {scenario.name}
            </Button>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}

