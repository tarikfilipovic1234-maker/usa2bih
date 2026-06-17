import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Link-based pagination that preserves the current filter query string. */
export function Pagination({
  page,
  pageCount,
  searchParams,
}: {
  page: number;
  pageCount: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (pageCount <= 1) return null;

  const hrefFor = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) if (v) sp.set(k, v);
    sp.set("page", String(p));
    return `/cars?${sp.toString()}`;
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <PageLink href={hrefFor(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </PageLink>

      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const gap = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {gap && <span className="px-1 text-silver-dim">…</span>}
            <Link
              href={hrefFor(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-medium transition-colors",
                p === page
                  ? "bg-accent text-midnight"
                  : "border border-steel-2 text-silver hover:border-accent hover:text-chrome",
              )}
            >
              {p}
            </Link>
          </span>
        );
      })}

      <PageLink href={hrefFor(Math.min(pageCount, page + 1))} disabled={page === pageCount} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  children,
  ...props
}: {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  if (disabled) {
    return (
      <span className="grid h-10 w-10 place-items-center rounded-full border border-steel/40 text-steel-2" {...props}>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="grid h-10 w-10 place-items-center rounded-full border border-steel-2 text-silver transition-colors hover:border-accent hover:text-chrome"
      {...props}
    >
      {children}
    </Link>
  );
}
