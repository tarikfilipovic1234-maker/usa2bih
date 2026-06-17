import {
  BookOpen,
  Calculator,
  Car,
  CarFront,
  FileText,
  Gavel,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Maps stored icon-name strings (nav config, guide content) to components. */
export const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Calculator,
  Car,
  CarFront,
  FileText,
  Gavel,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  User,
  Users,
};

export function resolveIcon(name?: string | null): LucideIcon {
  return (name && ICONS[name]) || CarFront;
}
