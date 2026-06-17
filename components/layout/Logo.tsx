import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent-bright to-accent-deep shadow-[0_6px_20px_-6px_var(--color-accent-glow)]">
        <span className="font-display text-sm font-extrabold tracking-tighter text-midnight">
          U2
        </span>
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/40 blur-sm transition-transform duration-700 group-hover:translate-x-[300%]" />
        </span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-chrome">
        USA<span className="text-accent">2</span>BIH
      </span>
    </Link>
  );
}
