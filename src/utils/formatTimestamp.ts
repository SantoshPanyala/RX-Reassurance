/**
 * Format relative timestamp for display
 * Creates "real-time" feel without actual backend
 */
export function formatRelativeTime(timestamp: number, currentTime: number = Date.now()): string {
  const now = currentTime;
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return 'now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return 'over a week ago';
  }
}

/**
 * Format timestamp for status display
 * Returns format like "Requested · 2h ago"
 */
export function formatStatusTimestamp(
  action: string,
  timestamp: number,
  currentTime: number = Date.now()
): string {
  const relativeTime = formatRelativeTime(timestamp, currentTime);
  return `${action} · ${relativeTime}`;
}



