import { Heading, VStack } from '@chakra-ui/react';
import { Medication } from '../types';
import { MedicationCard } from './MedicationCard';
import { PageContainer, PromoCard } from '../design-system';
import { getPromoPoster } from '../utils/promoData';

interface MedicationsOverviewProps {
  medications: Medication[];
  onSelect: (medication: Medication) => void;
}

export function MedicationsOverview({ medications, onSelect }: MedicationsOverviewProps) {
  const promo = getPromoPoster();

  return (
    <PageContainer>
      <VStack align="stretch" gap={6}>
        {/* Page title - confident, large */}
        <Heading 
          as="h1" 
          fontSize="3xl" 
          fontWeight="700"
          color="gray.900"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          Medications
        </Heading>

        {/* Medications list - premium card rows */}
        <VStack align="stretch" gap={3}>
          {medications.map((med) => (
            <MedicationCard
              key={med.id}
              medication={med}
              onClick={() => onSelect(med)}
            />
          ))}
        </VStack>

        {/* Promotional poster - bottom placement, non-distracting */}
        <PromoCard
          imageSrc={promo.imageSrc}
          imageAlt={promo.imageAlt}
          caption={promo.caption}
          ctaText={promo.ctaText}
          onCtaClick={() => {
            // Placeholder - in production this would navigate or show details
            console.log('Promo CTA clicked');
          }}
        />
      </VStack>
    </PageContainer>
  );
}
