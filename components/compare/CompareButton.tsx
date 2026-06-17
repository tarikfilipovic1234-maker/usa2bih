"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompare } from "./compareStore";
import { cn } from "@/lib/utils";

export function CompareButton({ vehicleId, variant = "icon" }: { vehicleId: string; variant?: "icon" | "full" }) {
  const { has, toggle, count, max } = useCompare();
  const active = has(vehicleId);
  const disabled = !active && count >= max;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(vehicleId)}
        disabled={disabled}
        aria-pressed={active}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-sm font-medium transition-all disabled:opacity-40",
          active
            ? "border-accent/40 bg-accent/10 text-accent-bright"
            : "border-steel-2 text-silver hover:border-accent hover:text-chrome",
        )}
      >
        <GitCompareArrows className="h-4 w-4" />
        {active ? "In comparison" : "Compare"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(vehicleId)}
      disabled={disabled}
      aria-label={active ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={active}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-all disabled:opacity-40",
        active ? "bg-accent text-midnight" : "bg-midnight/50 text-silver hover:bg-midnight/80 hover:text-chrome",
      )}
    >
      <GitCompareArrows className="h-4 w-4" />
    </button>
  );
}
