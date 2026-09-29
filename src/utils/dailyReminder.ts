/**
 * Dynamic Daily Reminder Utility
 * Calculates the current day index based on the Gregorian calendar
 * ensuring content changes automatically every single day at midnight.
 */

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getDaysSinceEpoch(date: Date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / (1000 * 60 * 60 * 24));
}

export function getDailyIndex(length: number, offsetDays: number = 0, date: Date = new Date()): number {
  if (length <= 0) return 0;
  const dayNumber = getDaysSinceEpoch(date) + offsetDays;
  return ((dayNumber % length) + length) % length;
}

export function getDailyItem<T>(items: T[], offsetDays: number = 0, date: Date = new Date()): T {
  if (!items || items.length === 0) {
    throw new Error('Items array is empty');
  }
  const index = getDailyIndex(items.length, offsetDays, date);
  return items[index];
}

export function formatReminderDate(date: Date = new Date(), offsetDays: number = 0): string {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() + offsetDays);
  return targetDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatReminderDateUrdu(date: Date = new Date(), offsetDays: number = 0): string {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() + offsetDays);
  return targetDate.toLocaleDateString('ur-PK', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
