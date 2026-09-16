import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Use "h1" when this heading is the page's main title. */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      )}
      <Tag className="font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty leading-relaxed text-silver-dim",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Section header used by the home-page sections. Keeps one heading size,
 * one rule and one spacing rhythm across them.
 */
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-steel pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-chrome">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl leading-relaxed text-silver-dim">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
