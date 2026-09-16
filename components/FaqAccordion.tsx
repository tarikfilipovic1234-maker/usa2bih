"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export type Faq = { q: string; a: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Card key={item.q} className="overflow-hidden p-0">
            <h2>
              <button
                type="button"
                id={`faq-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-chrome"
              >
                {item.q}
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-silver-dim transition-transform duration-200",
                    isOpen && "rotate-45 text-accent",
                  )}
                />
              </button>
            </h2>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
            >
              <p className="border-t border-steel px-5 py-4 text-sm leading-relaxed text-silver-dim">
                {item.a}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
