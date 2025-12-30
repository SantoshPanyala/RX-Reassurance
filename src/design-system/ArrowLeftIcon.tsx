// Arrow left icon for back button - using lucide-react to match website
import { ArrowLeft } from 'lucide-react';

interface IconProps {
  size?: number;
  color?: string;
}

export function ArrowLeftIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return <ArrowLeft size={size} color={color} aria-hidden="true" />;
}

