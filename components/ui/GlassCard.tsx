import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type GlassCardProps = ComponentProps<"div"> & {
  /** Render the chrome top-edge highlight. */
  chrome?: boolean;
  /** Add an interactive hover lift + glow. */
  interactive?: boolean;
};

export function GlassCard({
  className,
  chrome = true,
  interactive = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        chrome && "chrome-edge",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_30px_70px_-30px_var(--color-accent-glow)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
