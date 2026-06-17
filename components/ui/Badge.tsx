import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Tone = "default" | "accent" | "positive" | "warning" | "danger" | "outline";

const tones: Record<Tone, string> = {
  default: "bg-white/5 text-silver border-white/10",
  accent: "bg-accent/15 text-accent-bright border-accent/30",
  positive: "bg-positive/15 text-positive border-positive/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-danger/15 text-danger border-danger/30",
  outline: "bg-transparent text-silver-dim border-steel-2",
};

export function Badge({
  tone = "default",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
