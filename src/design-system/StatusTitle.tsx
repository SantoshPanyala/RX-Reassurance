import { Heading, HeadingProps } from '@chakra-ui/react';

interface StatusTitleProps extends Omit<HeadingProps, 'children'> {
  children: React.ReactNode;
}

export function StatusTitle({ children, ...props }: StatusTitleProps) {
  return (
    <Heading 
      as="h1" 
      fontSize="2xl" 
      fontWeight="700"
      color="gray.900"
      lineHeight="1.3"
      letterSpacing="-0.01em"
      {...props}
    >
      {children}
    </Heading>
  );
}

