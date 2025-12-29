import { Button, ButtonProps } from '@chakra-ui/react';

interface BackLinkProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode;
}

export function BackLink({ children = 'Back', onClick, ...props }: BackLinkProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      colorPalette="gray"
      fontSize="md"
      h="44px"
      alignSelf="flex-start"
      aria-label="Go back to medications list"
      {...props}
    >
      {children}
    </Button>
  );
}

