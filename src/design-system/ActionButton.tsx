import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function ActionButton({ children, ...props }: ActionButtonProps) {
  return (
    <Button
      colorPalette="blue"
      h="44px"
      fontSize="md"
      {...props}
    >
      {children}
    </Button>
  );
}

