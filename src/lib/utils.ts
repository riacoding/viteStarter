import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000) + 1
}

export function parseBoolean(value: unknown): boolean {
  return value.toString().toLowerCase() === 'true'
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str // Handle empty string case
  return str.charAt(0).toUpperCase() + str.slice(1)
}
