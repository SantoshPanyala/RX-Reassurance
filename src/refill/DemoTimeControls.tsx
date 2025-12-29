import { Box, HStack, Button, Text } from '@chakra-ui/react';

interface DemoTimeControlsProps {
  advanceDays: (days: number) => void;
}

/**
 * Demo-only: Time progression controls
 * 
 * Non-intrusive footer panel for advancing simulated time.
 * Only visible in demo mode.
 */
export function DemoTimeControls({ advanceDays }: DemoTimeControlsProps) {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
      px={4}
      py={3}
      zIndex={1000}
      boxShadow="0 -2px 8px rgba(0, 0, 0, 0.05)"
    >
      <HStack justify="center" gap={3}>
        <Text fontSize="xs" color="gray.600" fontWeight="500">
          Demo: simulate time progression
        </Text>
        <HStack gap={2}>
          <Button
            size="sm"
            variant="outline"
            colorPalette="blue"
            onClick={() => advanceDays(1)}
            aria-label="Advance time by 1 day"
          >
            +1 day
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorPalette="blue"
            onClick={() => advanceDays(3)}
            aria-label="Advance time by 3 days"
          >
            +3 days
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorPalette="blue"
            onClick={() => advanceDays(7)}
            aria-label="Advance time by 7 days"
          >
            +7 days
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}

