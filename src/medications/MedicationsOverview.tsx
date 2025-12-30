import { useEffect, useState } from 'react';
import { Heading, VStack, Box, Text, HStack, Button, Avatar } from '@chakra-ui/react';
import { Medication } from '../types';
import { MedicationCard } from './MedicationCard';
import { PageContainer, PromoCard } from '../design-system';
import { getPromoPoster } from '../utils/promoData';
import Logo from '../assets/Logo.png';

interface RxIntakeData {
  rxNumber: string;
  patientName: string;
  dob: string;
  submittedAt: number;
  visitCount?: number;
}

interface MedicationsOverviewProps {
  medications: Medication[];
  onSelect: (medication: Medication) => void;
}

export function MedicationsOverview({ medications, onSelect }: MedicationsOverviewProps) {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MedicationsOverview.tsx:20',message:'MedicationsOverview render start',data:{medicationsCount:medications?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const promo = getPromoPoster();
  const [rxIntakeData, setRxIntakeData] = useState<RxIntakeData | null>(null);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MedicationsOverview.tsx:26',message:'Reading localStorage',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    // Read from localStorage on mount
    const stored = localStorage.getItem('ultracare_rx_intake');
    if (stored) {
      try {
        const data = JSON.parse(stored) as RxIntakeData;
        console.log('Loaded from localStorage:', data);
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MedicationsOverview.tsx:32',message:'localStorage data found',data:{rxNumber:data.rxNumber,patientName:data.patientName,visitCount:data.visitCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        setRxIntakeData(data);
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MedicationsOverview.tsx:36',message:'localStorage parse error',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      }
    } else {
      console.log('No localStorage data found');
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MedicationsOverview.tsx:40',message:'No localStorage data',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
  }, []);

  return (
    <PageContainer>
      <VStack align="stretch" gap={6}>
        {/* Page title with logo - confident, large */}
        <HStack gap={4} align="center" justify="space-between">
          <HStack gap={4} align="center">
            <img 
              src={Logo} 
              alt="Ultracare Pharmacy" 
              style={{ height: '40px', width: 'auto' }}
            />
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
          </HStack>
          <Button
            onClick={() => {
              // Clear localStorage and redirect to website
              localStorage.removeItem('ultracare_rx_intake');
              window.location.href = 'http://localhost:5173/';
            }}
            colorScheme="blue"
            variant="solid"
            bg="blue.500"
            color="white"
            fontWeight="600"
            px="24px"
            py="10px"
            borderRadius="8px"
            fontFamily="'Poppins', sans-serif"
            fontSize="16px"
            transition="all 0.3s ease-out"
            _hover={{
              bg: 'blue.600',
              color: 'white',
            }}
            _active={{
              bg: 'blue.600',
            }}
          >
            Back to Website
          </Button>
        </HStack>

        {/* Patient profile if Rx intake data exists */}
        {rxIntakeData && rxIntakeData.patientName && (
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            borderRadius="lg"
            shadow="sm"
          >
            <HStack gap={4} align="center">
              {/* Patient Avatar */}
              <Avatar.Root
                size="md"
                bg="#235BC5"
                color="white"
              >
                <Avatar.Fallback>
                  {rxIntakeData.patientName ? rxIntakeData.patientName.charAt(0).toUpperCase() : 'P'}
                </Avatar.Fallback>
              </Avatar.Root>
              
              {/* Patient Info */}
              <VStack align="flex-start" gap={1} flex={1}>
                <Text fontSize="md" fontWeight="600" color="gray.900">
                  {rxIntakeData.patientName || 'Patient'}
                </Text>
                <HStack gap={4} flexWrap="wrap">
                  {rxIntakeData.rxNumber && (
                    <Text fontSize="sm" color="gray.600">
                      Rx #{rxIntakeData.rxNumber}
                    </Text>
                  )}
                  {rxIntakeData.visitCount !== undefined && rxIntakeData.visitCount !== null && (
                    <Text fontSize="sm" color="gray.600">
                      {rxIntakeData.visitCount} {rxIntakeData.visitCount === 1 ? 'visit' : 'visits'} to store
                    </Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        )}

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
            // Redirect to social media based on CTA text
            if (promo.ctaText === 'View offer') {
              // Redirect to Instagram
              window.open('https://www.instagram.com/ultracarepharmacy', '_blank');
            } else if (promo.ctaText === 'Learn more') {
              // Redirect to YouTube
              window.open('https://www.youtube.com/@ultracarepharmacy', '_blank');
            } else if (promo.ctaText === 'Schedule now') {
              // Redirect to TikTok
              window.open('https://www.tiktok.com/@ultracarepharmacy', '_blank');
            } else {
              // Default to Instagram
              window.open('https://www.instagram.com/ultracarepharmacy', '_blank');
            }
          }}
        />
      </VStack>
    </PageContainer>
  );
}
