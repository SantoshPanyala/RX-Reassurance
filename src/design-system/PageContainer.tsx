import { Container } from '@chakra-ui/react';

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Container 
      maxW="container.md" 
      py={8}
      px={6}
    >
      {children}
    </Container>
  );
}

