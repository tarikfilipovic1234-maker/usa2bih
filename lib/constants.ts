/** Central site + domain constants shared across the app. */

export const SITE = {
  name: "USA2BIH",
  tagline: "American cars, delivered to Bosnia.",
  description:
    "Browse US auction vehicles, estimate the full landed cost in BAM & EUR, and manage every step of importing your car to Bosnia and Herzegovina.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  email: "info@usa2bih.com",
  phone: "+387 33 000 000",
} as const;

export const MAIN_NAV = [
  { href: "/cars", label: "Browse Cars" },
  { href: "/calculator", label: "Cost Calculator" },
  { href: "/guide", label: "Import Guide" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/imports", label: "My Imports", icon: "Truck" },
  { href: "/dashboard/favorites", label: "Saved Vehicles", icon: "Heart" },
  { href: "/dashboard/inquiries", label: "Inquiries", icon: "MessageSquare" },
  { href: "/dashboard/calculations", label: "Calculations", icon: "Calculator" },
  { href: "/dashboard/documents", label: "Documents", icon: "FileText" },
  { href: "/dashboard/profile", label: "Profile", icon: "User" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/vehicles", label: "Vehicles", icon: "Car" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "MessageSquare" },
  { href: "/admin/users", label: "Users", icon: "Users" },
  { href: "/admin/guide", label: "Guide Content", icon: "BookOpen" },
] as const;

// ── Domain enums (mirror the Prisma enums; used for filter/select options) ──

export const FUEL_TYPES = ["GASOLINE", "DIESEL", "HYBRID", "ELECTRIC", "FLEX", "OTHER"] as const;
export const TRANSMISSIONS = ["AUTOMATIC", "MANUAL", "CVT", "DUAL_CLUTCH"] as const;
export const BODY_STYLES = [
  "SEDAN",
  "COUPE",
  "SUV",
  "TRUCK",
  "HATCHBACK",
  "CONVERTIBLE",
  "WAGON",
  "VAN",
  "MINIVAN",
] as const;
export const DRIVE_TYPES = ["FWD", "RWD", "AWD", "FOUR_WD"] as const;
export const DAMAGE_STATUSES = [
  "CLEAN",
  "MINOR",
  "MODERATE",
  "SEVERE",
  "SALVAGE",
] as const;
export const VEHICLE_STATUSES = ["DRAFT", "ACTIVE", "SOLD", "ARCHIVED"] as const;
export const INQUIRY_STATUSES = ["NEW", "IN_PROGRESS", "CLOSED"] as const;

/** Import tracking stages, in order. */
export const IMPORT_STAGES = [
  { key: "VEHICLE_FOUND", label: "Vehicle Found" },
  { key: "AUCTION_WON", label: "Auction Won" },
  { key: "PAYMENT_COMPLETED", label: "Payment Completed" },
  { key: "SHIPPING", label: "Shipping" },
  { key: "PORT_ARRIVAL", label: "Port Arrival" },
  { key: "CUSTOMS_CLEARANCE", label: "Customs Clearance" },
  { key: "DELIVERY", label: "Delivery to Bosnia" },
  { key: "COMPLETED", label: "Completed" },
] as const;

export type ImportStageKey = (typeof IMPORT_STAGES)[number]["key"];

/** Popular manufacturers for quick-filter chips on the home/browse pages. */
export const POPULAR_BRANDS = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Ford",
  "Chevrolet",
  "Tesla",
  "Toyota",
  "Dodge",
  "Jeep",
  "Volkswagen",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "year_desc", label: "Year: newest" },
  { value: "mileage_asc", label: "Mileage: lowest" },
] as const;

export const PAGE_SIZE = 12;
