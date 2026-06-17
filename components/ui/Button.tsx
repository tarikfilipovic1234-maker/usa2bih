import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight whitespace-nowrap rounded-full transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-midnight hover:bg-accent-bright shadow-[0_8px_30px_-8px_var(--color-accent-glow)] hover:shadow-[0_10px_40px_-6px_var(--color-accent-glow)] active:scale-[0.98]",
  secondary:
    "glass text-chrome hover:bg-graphite-2/80 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-steel-2 text-silver hover:border-accent hover:text-chrome hover:bg-accent/5",
  ghost: "text-silver hover:text-chrome hover:bg-white/5",
  danger: "bg-danger/90 text-white hover:bg-danger active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
