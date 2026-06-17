import { z } from "zod";
import {
  BODY_STYLES,
  DAMAGE_STATUSES,
  DRIVE_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  VEHICLE_STATUSES,
  INQUIRY_STATUSES,
} from "@/lib/constants";

const currentYear = new Date().getFullYear();

/** Shared vehicle field schema (create + edit). */
export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required").max(60),
  model: z.string().min(1, "Model is required").max(60),
  year: z.coerce.number().int().min(1950).max(currentYear + 1),
  trim: z.string().max(60).optional().or(z.literal("")),
  mileage: z.coerce.number().int().min(0).max(2_000_000),
  fuelType: z.enum(FUEL_TYPES),
  transmission: z.enum(TRANSMISSIONS),
  bodyStyle: z.enum(BODY_STYLES),
  driveType: z.enum(DRIVE_TYPES),
  exteriorColor: z.string().max(40).optional().or(z.literal("")),
  interiorColor: z.string().max(40).optional().or(z.literal("")),
  price: z.coerce.number().int().min(0).max(10_000_000),
  vin: z.string().max(20).optional().or(z.literal("")),
  engine: z.string().max(80).optional().or(z.literal("")),
  cylinders: z.coerce.number().int().min(0).max(16).optional(),
  condition: z.string().max(80).optional().or(z.literal("")),
  damageStatus: z.enum(DAMAGE_STATUSES).default("CLEAN"),
  damageNotes: z.string().max(1000).optional().or(z.literal("")),
  auctionName: z.string().max(80).optional().or(z.literal("")),
  lotNumber: z.string().max(40).optional().or(z.literal("")),
  location: z.string().max(80).optional().or(z.literal("")),
  estimatedArrivalDays: z.coerce.number().int().min(0).max(365).optional(),
  description: z.string().max(5000).optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  status: z.enum(VEHICLE_STATUSES).default("DRAFT"),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;

export const inquirySchema = z.object({
  vehicleId: z.string().optional(),
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more (min 10 characters)").max(2000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Add a subject").max(120),
  message: z.string().min(10, "Message is too short").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const profileSchema = z.object({
  name: z.string().max(80).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  locale: z.enum(["bs", "en"]).default("bs"),
});

export const inquiryStatusSchema = z.enum(INQUIRY_STATUSES);

/** Calculator inputs (USD). FX + rate config lives in lib/calculator. */
export const calculatorSchema = z.object({
  purchasePrice: z.coerce.number().min(0).max(10_000_000),
  auctionFees: z.coerce.number().min(0).default(0),
  shipping: z.coerce.number().min(0).default(0),
  engineCc: z.coerce.number().int().min(0).max(10000).optional(),
  fuelType: z.enum(FUEL_TYPES).default("GASOLINE"),
  registration: z.coerce.number().min(0).default(0),
  serviceFee: z.coerce.number().min(0).default(0),
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;
