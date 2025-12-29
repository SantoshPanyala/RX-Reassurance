/**
 * Format days left in human-readable format
 * 
 * Healthcare-focused: clear, calm messaging for older users
 * Examples:
 * - 0 or negative: "Less than a day"
 * - 1: "About 1 day"
 * - 2-7: "About X days"
 * - 8+: "About X days"
 * 
 * This logic belongs outside the UI layer.
 */

export function formatDaysLeft(days: number | undefined): string {
  if (days === undefined || days === null) {
    return '';
  }

  const rounded = Math.round(days);

  if (rounded <= 0) {
    return 'Less than a day';
  }

  if (rounded === 1) {
    return 'About 1 day';
  }

  return `About ${rounded} days`;
}

/**
 * Format days left for description text
 * Returns format like "About 2 days of medication left"
 */
export function formatDaysLeftDescription(days: number | undefined): string {
  const formatted = formatDaysLeft(days);
  if (!formatted) return '';

  if (formatted === 'Less than a day') {
    return 'Less than a day of medication left';
  }

  return `${formatted.toLowerCase()} of medication left`;
}

