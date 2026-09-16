"use client";

import Link from "next/link";
import { GitCompareArrows, X } from "lucide-react";
import { useCompare } from "./compareStore";

export function CompareBar() {
  const { ids, count, clear } = useCompare();

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-label="Vehicle comparison"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
    >
      <div className="panel flex items-center gap-4 rounded-md py-2 pl-4 pr-2 shadow-lg shadow-black/50">
        <span className="flex items-center gap-2 text-sm text-silver">
          <GitCompareArrows aria-hidden="true" className="h-4 w-4 text-accent" />
          <span className="font-medium text-chrome">{count}</span> selected
        </span>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear comparison"
          className="grid h-8 w-8 place-items-center rounded-md text-silver-dim hover:bg-graphite-2 hover:text-chrome"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
        <Link
          href={`/compare?ids=${ids.join(",")}`}
          className="inline-flex h-9 items-center rounded-md border border-accent-deep bg-accent-deep px-4 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
