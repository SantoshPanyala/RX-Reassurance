import { createSystem, defaultConfig } from '@chakra-ui/react';

/**
 * UltraCare Pharmacy Design System Theme
 * 
 * Healthcare-focused, accessible design system with:
 * - Trust-driven color palette inspired by Ultracare brand
 * - Semantic status tokens for consistent status representation
 * - Inter font family for readability
 * - Calm, readable aesthetics optimized for older users
 */

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
        heading: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
      },
      colors: {
        // Primary brand blue (trustworthy) - inspired by Ultracare
        'blue.50': { value: '#E4EBF8' },
        'blue.100': { value: '#B9C9E9' },
        'blue.200': { value: '#B6C8E9' },
        'blue.300': { value: '#B6C8E9' },
        'blue.400': { value: '#396AC8' },
        'blue.500': { value: '#235BC5' }, // Main brand blue
        'blue.600': { value: '#1557B0' }, // Hover state
        'blue.700': { value: '#1F4A99' },
        'blue.800': { value: '#112759' },
        // Gray scale (no pure black for accessibility)
        'gray.50': { value: '#FFFFFF' },
        'gray.100': { value: '#ECEEF0' },
        'gray.200': { value: '#E4EBF8' },
        'gray.300': { value: '#D1D5DB' },
        'gray.400': { value: '#9CA3AF' },
        'gray.500': { value: '#6B7280' },
        'gray.600': { value: '#4B5563' },
        'gray.700': { value: '#374151' },
        'gray.800': { value: '#1F2937' },
        'gray.900': { value: '#111827' }, // Near-black, not pure black
        // Status colors (calm, not alarming)
        'green.50': { value: '#E8F5E9' },
        'green.100': { value: '#C8E6C9' },
        'green.500': { value: '#4CAF50' }, // Success green
        'green.600': { value: '#43A047' },
        'orange.50': { value: '#FFF3E0' },
        'orange.100': { value: '#FFE0B2' },
        'orange.500': { value: '#FF9800' }, // Warning amber (gentle)
        'orange.600': { value: '#FB8C00' },
        'red.50': { value: '#FEF2F2' },
        'red.100': { value: '#FEE2E2' },
        'red.500': { value: '#E24334' }, // Soft red for risk
        'red.600': { value: '#C33427' },
        // Semantic tokens for status (direct color values)
        'status.ready': { value: '#4CAF50' },
        'status.ready.bg': { value: '#E8F5E9' },
        'status.waiting': { value: '#235BC5' },
        'status.waiting.bg': { value: '#E4EBF8' },
        'status.risk': { value: '#FF9800' },
        'status.risk.bg': { value: '#FFF3E0' },
        'status.delayed': { value: '#E24334' },
        'status.delayed.bg': { value: '#FEF2F2' },
        // Semantic tokens for actions
        'action.primary': { value: '#235BC5' },
        'action.primary.hover': { value: '#1557B0' },
        'action.secondary': { value: '#4B5563' },
        'action.secondary.hover': { value: '#374151' },
      },
      radii: {
        // Rounded card styles
        card: { value: '12px' },
        button: { value: '8px' },
        badge: { value: '6px' },
      },
      shadows: {
        // Soft shadows for depth
        card: { value: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)' },
        'card.hover': { value: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)' },
        elevated: { value: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)' },
      },
    },
    keyframes: {
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.7 },
      },
    },
  },
  globalCss: {
    body: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      bg: 'gray.50',
      color: 'gray.900',
      fontSize: '16px', // Base font size for accessibility
      lineHeight: '1.5',
    },
  },
});

export default system;
