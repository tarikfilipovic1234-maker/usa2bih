import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="USA2BIH home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span className="grid h-8 w-8 place-items-center rounded-md border border-steel-2 bg-graphite-2">
        <span className="font-display text-xs font-bold tracking-tight text-accent-bright">U2</span>
      </span>
      <span className="font-display text-base font-semibold tracking-tight text-chrome">
        USA2BIH
      </span>
    </Link>
  );
}
