import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div"> & {
  /** Lift the border on hover. Use only when the whole card is a link. */
  interactive?: boolean;
};

export function Card({ className, interactive = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "panel rounded-lg",
        interactive && "transition-colors duration-150 hover:border-steel-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
