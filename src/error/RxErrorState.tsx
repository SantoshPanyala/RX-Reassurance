import { VStack, Heading, Text, Box, Link } from '@chakra-ui/react';
import { PageContainer } from '../design-system';

/**
 * Error state shown when Rx number is invalid or missing
 * 
 * This is a full-page error state that prevents access to medication tracking
 * when the Rx number is not in the demo list.
 */
export function RxErrorState() {
  return (
    <PageContainer>
      <VStack align="stretch" gap={6} py={12}>
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          p={8}
          shadow="sm"
          textAlign="center"
        >
          <VStack align="stretch" gap={4}>
            <Heading
              as="h1"
              fontSize="2xl"
              fontWeight="700"
              color="gray.900"
              lineHeight="1.3"
            >
              We couldn't find this refill
            </Heading>
            
            <Text
              fontSize="md"
              color="gray.600"
              lineHeight="1.6"
            >
              Please check your Rx number or contact Ultracare Germantown for assistance.
            </Text>

            <Box pt={4}>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Need help?
              </Text>
              <Link
                href="tel:301-569-6464"
                fontSize="md"
                color="blue.500"
                fontWeight="600"
                _hover={{
                  color: 'blue.600',
                  textDecoration: 'underline'
                }}
              >
                Contact Ultracare Germantown: 301-569-6464
              </Link>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </PageContainer>
  );
}

