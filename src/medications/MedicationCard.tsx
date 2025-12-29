import { Text, VStack, HStack, Badge, Box, CardRoot, CardBody } from '@chakra-ui/react';
import { Medication } from '../types';
import { getStatusIcon } from './getStatusIcon';
import { getMedicationStatusBadge } from './getStatusBadge';
import { formatRelativeTime } from '../utils/formatTimestamp';
import { useSimulatedTimeContext } from '../utils/SimulatedTimeContext';
import { formatDaysLeft } from '../utils/formatDays';

interface MedicationCardProps {
  medication: Medication;
  onClick: () => void;
}

export function MedicationCard({ medication, onClick }: MedicationCardProps) {
  const currentTime = useSimulatedTimeContext();
  const StatusIcon = getStatusIcon(medication.refillState);
  const badgeConfig = getMedicationStatusBadge(medication.refillState);
  const BadgeIcon = badgeConfig.icon;

  // Get relative timestamp
  const timestamp = medication.updatedAt 
    ? formatRelativeTime(medication.updatedAt, currentTime)
    : null;

  return (
    <CardRoot
      as="button"
      onClick={onClick}
      width="100%"
      textAlign="left"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-1px)',
      }}
      _active={{
        transform: 'translateY(0)',
        shadow: 'sm',
      }}
      _focus={{
        outline: '2px solid',
        outlineColor: 'action.primary',
        outlineOffset: '2px',
      }}
      aria-label={`View refill status for ${medication.name}`}
    >
      <CardBody p={5}>
        <HStack justify="space-between" align="flex-start" gap={4}>
          {/* Left: Medication info */}
          <VStack align="flex-start" gap={2} flex={1} minW={0}>
            {/* Medication name - strong, prominent */}
            <Text
              fontSize="lg"
              fontWeight="600"
              color="gray.900"
              lineHeight="1.4"
            >
              {medication.name} {medication.dose}
            </Text>

            {/* Days left - secondary, muted */}
            {medication.daysLeft !== undefined && (
              <Text
                fontSize="sm"
                color="gray.600"
                lineHeight="1.5"
              >
                {formatDaysLeft(medication.daysLeft)} left
              </Text>
            )}

            {/* Timestamp - real-time feel */}
            {timestamp && (
              <Text fontSize="xs" color="gray.500" fontWeight="500">
                Updated · {timestamp}
              </Text>
            )}
          </VStack>

          {/* Right: Status badge */}
          <VStack align="flex-end" gap={2} flexShrink={0}>
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
            {StatusIcon && (
              <Box 
                color={
                  medication.refillState === 'RISK' ? 'status.risk' :
                  medication.refillState === 'READY' ? 'status.ready' :
                  'status.waiting'
                }
              >
                <StatusIcon size={20} />
              </Box>
            )}
          </VStack>
        </HStack>
      </CardBody>
    </CardRoot>
  );
}
