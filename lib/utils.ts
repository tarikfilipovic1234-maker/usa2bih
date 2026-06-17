import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, deduping conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD. */
export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format a number as a currency in the given ISO code (default BAM/EUR helpers below). */
export function formatCurrency(value: number, currency: string, locale = "de-DE") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export const formatBAM = (value: number) =>
  `${new Intl.NumberFormat("bs-BA", { maximumFractionDigits: 0 }).format(value)} KM`;

export const formatEUR = (value: number) => formatCurrency(value, "EUR");

/** Compact number formatting (e.g. 12.4k). */
export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

/** Format mileage in miles. */
export function formatMiles(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)} mi`;
}

/** Human-readable date. */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/** Build a query string from a record, dropping empty values. */
export function buildQuery(params: Record<string, string | number | undefined | null>) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") sp.set(key, String(value));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

/** Title-case an UPPER_SNAKE enum value, e.g. FRONT_WHEEL -> Front Wheel. */
export function humanizeEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
