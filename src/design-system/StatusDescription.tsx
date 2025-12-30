import { Text, TextProps } from '@chakra-ui/react';

interface StatusDescriptionProps extends TextProps {
  children: React.ReactNode;
}

export function StatusDescription({ children, ...props }: StatusDescriptionProps) {
  return (
    <Text 
      fontSize="md"
      color="#3C4043"
      lineHeight="1.6"
      {...props}
    >
      {children}
    </Text>
  );
}

