import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // setTimeoutの第一引数の関数として簡略化できる
    }, ms)
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