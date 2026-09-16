import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, deduping conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Number and date formatting is done explicitly rather than through
 * Intl.NumberFormat locale data. Node and browser builds ship different ICU
 * versions, and the separators they pick for locales such as bs-BA disagree,
 * which produced a hydration mismatch between the server and client renders.
 */
function group(value: number, separator: string) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  return (
    sign + String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  );
}

/** Format a number as USD, e.g. $18,000. */
export function formatUSD(value: number) {
  const rounded = Math.round(value);
  return `${rounded < 0 ? "-" : ""}$${group(Math.abs(rounded), ",")}`;
}

/** Convertible marks, written the way they are in BiH: 49.514 KM. */
export const formatBAM = (value: number) => `${group(value, ".")} KM`;

/** Euros, written with the same grouping convention: 25.312 EUR. */
export const formatEUR = (value: number) => `${group(value, ".")} EUR`;

/** Format mileage in miles. */
export function formatMiles(value: number) {
  return `${group(value, ",")} mi`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Human-readable date, e.g. 16 Sep 2026. */
export function formatDate(date: Date | string) {
  const d = new Date(date);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
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
