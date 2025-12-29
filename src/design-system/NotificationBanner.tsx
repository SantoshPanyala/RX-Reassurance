import { useState } from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';

interface NotificationBannerProps {
  message: string;
  onDismiss?: () => void;
}

export function NotificationBanner({ message, onDismiss }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      role="alert"
      bg="blue.50"
      border="1px"
      borderColor="blue.200"
      borderRadius="md"
      p={4}
      mb={4}
    >
      <HStack justify="space-between" align="flex-start" gap={4}>
        <Text fontSize="md" color="gray.900" lineHeight="1.5" flex={1}>
          {message}
        </Text>
        <Button
          variant="ghost"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          h="44px"
          minW="44px"
          px={3}
          fontSize="xl"
        >
          ×
        </Button>
      </HStack>
    </Box>
  );
}

