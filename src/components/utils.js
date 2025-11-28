import { format, parse, parseISO } from 'date-fns';

// Utility functions
export function formatTime(timeStr) {
  return format(parse(timeStr, 'HH:mm:ss', new Date()), 'HH:mm');
}

export function getValueOrDefault(value, unit) {
  return !value ? 'N/A' : `${value} ${unit}`;
}

export function formatDate(dateStr) {
  const date = parseISO(dateStr);
  const dayOfWeek = format(date, 'EEE');
  return dayOfWeek;
}

export function convertCtoF(tempInC) {
  const tempInF = Math.round((tempInC * 9) / 5 + 32);
  return tempInF;
}

export function convertFtoC(tempInF) {
  const tempInC = Math.round((tempInF - 32) * 5) / 9;
  return tempInC;
}
