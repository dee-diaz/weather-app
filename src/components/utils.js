import { format, parse } from 'date-fns';

// Utility functions
export function getCurrentDate() {
  const date = new Date();
  const formatted = format(date, 'MMMM d');
  return formatted;
}

export function formatTime(timeStr) {
  return format(parse(timeStr, 'HH:mm:ss', new Date()), 'HH:mm');
}

export function getValueOrDefault(value, unit) {
  return !value ? 'N/A' : `${value} ${unit}`;
}
