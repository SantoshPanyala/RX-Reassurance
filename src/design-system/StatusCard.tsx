import { Box, BoxProps } from '@chakra-ui/react';

interface StatusCardProps extends BoxProps {
  children: React.ReactNode;
  variant?: 'default' | 'risk' | 'ready' | 'waiting';
}

/**
 * Soft card container for status screens
 * Includes subtle background tints based on state
 */
export function StatusCard({ children, variant = 'default', ...props }: StatusCardProps) {
  const bgColors = {
    default: 'white',
    risk: 'red.50', // Very subtle red tint for risk
    ready: 'green.50', // Very subtle green tint for ready
    waiting: 'gray.50', // Very subtle gray tint for waiting
  };

  return (
    <Box
      bg={bgColors[variant]}
      borderRadius="lg"
      p={6}
      border="1px"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  );
}

