import { Box, HStack, Text, VStack, Badge, CardRoot, CardBody } from '@chakra-ui/react';
import { Medication, Refill } from '../types';
import { useRefillViewState } from './useRefillViewState';
import { useNotification } from './useNotification';
import { getStatusIcon, getOwnerIcon } from './getStatusIcon';
import { getStatusBadgeConfig } from './getStatusBadge';
import { formatStatusTimestamp } from '../utils/formatTimestamp';
import { ArrowLeftIcon } from '../design-system/ArrowLeftIcon';
import { 
  PageContainer, 
  StatusTitle, 
  StatusDescription, 
  ActionButton, 
  NotificationBanner
} from '../design-system';

interface RefillStatusProps {
  medication: Medication;
  refill: Refill | null;
  isDemoMode?: boolean;
  currentTime: number;
  onBack: () => void;
}

export function RefillStatus({ medication, refill, isDemoMode, currentTime, onBack }: RefillStatusProps) {
  // Get resolved view state with notification simulation (ZERO business logic in component)
  const viewState = useRefillViewState(refill, currentTime);

  // Track notification-worthy state transitions (presentation only)
  const notification = useNotification(viewState);

  // Get status badge config with icon
  const badgeConfig = getStatusBadgeConfig(viewState);
  const BadgeIcon = badgeConfig.icon;
  
  // Get status icon
  const StatusIcon = getStatusIcon({ title: viewState.title });
  
  // Get owner icon
  const OwnerIcon = getOwnerIcon(viewState.owner);

  // Map owner to friendly label
  const ownerLabel = viewState.owner === 'Doctor' 
    ? 'Handled by your doctor'
    : viewState.owner === 'Pharmacy'
    ? 'Handled by the pharmacy'
    : viewState.owner
    ? `Handled by ${viewState.owner.toLowerCase()}`
    : undefined;
  
  // Phone number for pharmacy contact
  const pharmacyPhone = '301-569-6464';

  // Get timestamp for status
  const statusTimestamp = refill 
    ? formatStatusTimestamp(
        viewState.title === "Request received" ? "Requested" :
        viewState.title === "Waiting for doctor approval" ? "Waiting" :
        viewState.title === "Your medication is ready" ? "Ready" :
        "Updated",
        refill.updatedAt,
        currentTime
      )
    : null;

  // Render ONLY from resolver output
  return (
    <PageContainer>
      <VStack align="stretch" gap={6}>
        {/* Demo indicator - subtle, removable */}
        {isDemoMode && (
          <Text fontSize="xs" color="gray.400" fontWeight="400" textAlign="center">
            Demo: live refill simulation
          </Text>
        )}

        {/* Notification banner - non-intrusive, dismissible */}
        {notification && (
          <NotificationBanner message={notification} />
        )}

        {/* Back button with icon */}
        <HStack>
          <ActionButton
            variant="ghost"
            onClick={onBack}
            colorPalette="blue"
            size="sm"
            h="40px"
            px={3}
            aria-label="Go back to medications list"
          >
            <HStack gap={2}>
              <ArrowLeftIcon size={16} />
              <Text fontSize="sm" fontWeight="500">Back</Text>
            </HStack>
          </ActionButton>
        </HStack>

        {/* Status card - modern, clean */}
        <CardRoot 
          bg="#E8E4DD" 
          border="1px solid"
          borderColor="gray.300"
        >
          <CardBody>
            <VStack align="stretch" gap={5}>
              {/* Header with title and badge */}
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="flex-start" gap={4}>
                  <HStack gap={3} align="flex-start" flex={1}>
                    {StatusIcon && (
                      <Box 
                        flexShrink={0} 
                        mt={1}
                        color={
                          viewState.title === "You may run out soon" ? "status.risk" :
                          viewState.title === "Your medication is ready" ? "status.ready" :
                          "status.waiting"
                        }
                      >
                        <StatusIcon size={24} />
                      </Box>
                    )}
                    <StatusTitle flex={1} lineHeight="1.3">{viewState.title}</StatusTitle>
                  </HStack>
                  <Badge
                    colorPalette={badgeConfig.colorPalette}
                    variant={badgeConfig.variant}
                    fontSize="xs"
                    fontWeight="600"
                    px={3}
                    py={1}
                    css={badgeConfig.animate ? {
                      animation: 'pulse 2s ease-in-out infinite',
                    } : undefined}
                  >
                    <HStack gap={1.5} align="center">
                      <Box>
                        <BadgeIcon size={12} />
                      </Box>
                      <Text>{badgeConfig.label}</Text>
                    </HStack>
                  </Badge>
                </HStack>

                {/* Supporting context */}
                {viewState.description && (
                  <StatusDescription color="gray.600">
                    {viewState.description}
                  </StatusDescription>
                )}

                {/* Reassurance microcopy - neutral, calming */}
                {viewState.reassurance && (
                  <Text fontSize="sm" color="#3C4043" lineHeight="1.5">
                    {viewState.reassurance}
                  </Text>
                )}

                {/* Timestamp - real-time feel */}
                {statusTimestamp && (
                  <Text fontSize="xs" color="gray.500" fontWeight="500">
                    {statusTimestamp}
                  </Text>
                )}
              </VStack>

              {/* Ownership section */}
              {ownerLabel && OwnerIcon && (
                <>
                  <Box borderTop="1px" borderColor="gray.200" pt={4}>
                    <HStack gap={2} align="center" flexWrap="wrap">
                      <Box color="gray.400" flexShrink={0}>
                        <OwnerIcon size={16} />
                      </Box>
                      <HStack gap={2} align="center" flexWrap="wrap">
                        <Text 
                          fontSize="sm" 
                          color="gray.600"
                          fontWeight="500"
                        >
                          {ownerLabel}
                        </Text>
                        {viewState.owner === 'Pharmacy' && (
                          <Text 
                            fontSize="sm" 
                            color="blue.500"
                            fontWeight="500"
                            as="a"
                            href={`tel:${pharmacyPhone}`}
                            _hover={{ 
                              color: 'blue.600',
                              textDecoration: 'underline'
                            }}
                          >
                            {pharmacyPhone}
                          </Text>
                        )}
                      </HStack>
                    </HStack>
                  </Box>
                </>
              )}
            </VStack>
          </CardBody>
        </CardRoot>

        {/* Actions - Only when showActions === true */}
        {viewState.showActions && viewState.actions && (
          <VStack align="stretch" gap={3}>
            {viewState.actions.includes("CONTACT_PHARMACY") && (
              <ActionButton 
                aria-label="Contact pharmacy about this refill"
                as="a"
                href={`tel:${pharmacyPhone}`}
              >
                Contact pharmacy ({pharmacyPhone})
              </ActionButton>
            )}
            {viewState.actions.includes("CONTACT_DOCTOR") && (
              <ActionButton 
                variant="outline"
                colorPalette="blue"
                aria-label="Contact doctor about this refill"
              >
                Contact doctor
              </ActionButton>
            )}
          </VStack>
        )}
      </VStack>
    </PageContainer>
  );
}
