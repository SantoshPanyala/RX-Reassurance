import { CardRoot, CardBody, Text, VStack, HStack, Button, Box, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface PromoCardProps {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

/**
 * PromoCard - Image-based promotional poster container
 * 
 * Healthcare-safe design for pharmacy services, discounts, and coupons.
 * This is a visual poster slot - designers will provide the actual images.
 * 
 * Design rules:
 * - Soft card background, clearly secondary to medication content
 * - Dismissible for accessibility
 * - No auto-animation
 * - WCAG AA contrast
 * - Poster-style: image with optional caption and CTA
 */
export function PromoCard({ 
  imageSrc, 
  imageAlt, 
  caption, 
  ctaText, 
  onCtaClick 
}: PromoCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <CardRoot
      role="region"
      aria-label="Pharmacy promotions and offers"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      shadow="card"
    >
      <CardBody p={0}>
        <VStack align="stretch" gap={0}>
          {/* Poster image */}
          <Box position="relative" width="100%">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width="100%"
              height="auto"
              objectFit="cover"
              borderRadius="12px 12px 0 0"
            />
            
            {/* Dismiss button - positioned top right */}
            <Button
              position="absolute"
              top={2}
              right={2}
              size="xs"
              variant="solid"
              bg="blackAlpha.700"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={() => setDismissed(true)}
              aria-label="Dismiss promotion"
              borderRadius="full"
              minW="24px"
              h="24px"
              p={0}
            >
              ×
            </Button>
          </Box>

          {/* Optional caption and CTA */}
          {(caption || ctaText) && (
            <Box p={4} pt={3}>
              <VStack align="stretch" gap={3}>
                {caption && (
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    lineHeight="1.5"
                  >
                    {caption}
                  </Text>
                )}

                {ctaText && onCtaClick && (
                  <Button
                    size="sm"
                    variant="outline"
                    colorPalette="blue"
                    onClick={onCtaClick}
                    width="100%"
                  >
                    {ctaText}
                  </Button>
                )}
              </VStack>
            </Box>
          )}
        </VStack>
      </CardBody>
    </CardRoot>
  );
}
