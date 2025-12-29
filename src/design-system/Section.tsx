import { VStack } from '@chakra-ui/react';

interface SectionProps {
  children: React.ReactNode;
  gap?: number;
  align?: 'stretch' | 'start' | 'center' | 'end';
}

export function Section({ children, gap = 6, align = 'stretch' }: SectionProps) {
  return (
    <VStack 
      align={align} 
      gap={gap}
    >
      {children}
    </VStack>
  );
}

