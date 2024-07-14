import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function initialText(str: string) {
  return str?.match(/(\b\S)?/g)?.join("")?.slice(0, 2).toUpperCase()
}

export function parseDateString(date: string) {
  return new Date(date).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })
}

export function capitalizeLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
