import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleString(undefined, { 
    month: "short", day: "numeric", 
    year: "numeric", hour: "numeric", 
    minute: "numeric", timeZoneName: "short" 
  });
}