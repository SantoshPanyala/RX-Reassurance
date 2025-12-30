import { Box, HStack, Text, Badge } from '@chakra-ui/react';

/**
 * Demo-only: Explanation banner
 * 
 * Displays a clear indicator that the app is in demo mode.
 * Only visible when ?demo=true is in the URL.
 */
export function DemoBanner() {
  return (
    <Box
      bg="blue.50"
      border="1px solid"
      borderColor="blue.200"
      borderRadius="md"
      p={3}
      mb={4}
    >
      <HStack justify="space-between" align="center" gap={3}>
        <HStack gap={2} align="center">
          <Badge colorPalette="blue" variant="solid" fontSize="xs">
            DEMO MODE
          </Badge>
          <Text fontSize="sm" color="blue.900" fontWeight="500">
            This is a demo environment for walkthroughs. Production users will not see this.
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
}

