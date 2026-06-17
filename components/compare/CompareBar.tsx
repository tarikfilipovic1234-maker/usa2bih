"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import { useCompare } from "./compareStore";

export function CompareBar() {
  const { ids, count, clear } = useCompare();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="glass chrome-edge flex items-center gap-4 rounded-full py-2.5 pl-5 pr-2.5 shadow-2xl">
            <span className="flex items-center gap-2 text-sm text-silver">
              <GitCompareArrows className="h-4 w-4 text-accent" />
              <span className="font-medium text-chrome">{count}</span> selected to compare
            </span>
            <button
              type="button"
              onClick={clear}
              aria-label="Clear comparison"
              className="grid h-8 w-8 place-items-center rounded-full text-silver-dim hover:bg-white/5 hover:text-chrome"
            >
              <X className="h-4 w-4" />
            </button>
            <Link
              href={`/compare?ids=${ids.join(",")}`}
              className="inline-flex h-9 items-center rounded-full bg-accent px-5 text-sm font-medium text-midnight transition-colors hover:bg-accent-bright"
            >
              Compare
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
