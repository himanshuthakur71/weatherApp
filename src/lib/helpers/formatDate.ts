// src/lib/utils/formatDate.ts
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Format time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Format date
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };

  const timeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
  const dateStr = new Intl.DateTimeFormat("en-US", dateOptions).format(date);

  return `${timeStr} | ${dateStr}`;
}
