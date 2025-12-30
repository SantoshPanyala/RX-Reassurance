// Icons from lucide-react to match website design system
// Icons are assistive, not decorative - always appear with text

import { Clock, AlertTriangle, Check, Building2, User } from 'lucide-react';

interface IconProps {
  size?: number;
  color?: string;
}

// Wrapper components to maintain consistent API with size and color props
export function ClockIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <Clock size={size} color={color} aria-hidden="true" />;
}

export function AlertIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <AlertTriangle size={size} color={color} aria-hidden="true" />;
}

export function CheckIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <Check size={size} color={color} aria-hidden="true" />;
}

export function BuildingIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <Building2 size={size} color={color} aria-hidden="true" />;
}

export function UserIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <User size={size} color={color} aria-hidden="true" />;
}

