import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // setTimeoutの第一引数の関数として簡略化できる
    }, ms);
  });
}

export function zeroPadding(number: number, length: number) {
  return (Array(length).join('0') + number).slice(-length);
}

export function formatNumber(num: number): string {
  if (num >= 1000 && num < 10000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num >= 10000) {
    return (num / 1000).toFixed(0) + 'k';
  } else {
    return num.toString();
  }
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function nullToUndefinedOrValue<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}
