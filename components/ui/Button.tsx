import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "border-accent-deep bg-accent-deep text-white hover:border-accent hover:bg-accent",
  secondary: "border-steel-2 bg-graphite-2 text-chrome hover:border-silver-dim hover:bg-steel",
  outline: "border-steel-2 bg-transparent text-silver hover:border-silver-dim hover:text-chrome",
  ghost: "border-transparent bg-transparent text-silver hover:bg-graphite-2 hover:text-chrome",
  danger: "border-danger bg-danger text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
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
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
