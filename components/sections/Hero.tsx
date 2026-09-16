"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { POPULAR_BRANDS } from "@/lib/constants";
import { calculateImportCost } from "@/lib/calculator";
import { formatBAM, formatUSD } from "@/lib/utils";

/**
 * A worked example on a round-number auction price, computed by the same
 * function the calculator page uses. It is an illustration of the cost
 * structure, not a quote, and the copy beside it says so.
 */
const EXAMPLE_PRICE = 18000;
const example = calculateImportCost({
  purchasePrice: EXAMPLE_PRICE,
  auctionFees: 1440,
  shipping: 1900,
  registration: 600,
  serviceFee: 750,
  fuelType: "GASOLINE",
});

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/cars?q=${encodeURIComponent(q.trim())}` : "/cars");
  }

  return (
    <section className="border-b border-steel">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-chrome sm:text-5xl lg:text-6xl">
            American cars, landed in Bosnia at a price you saw first.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver-dim">
            Browse vehicles from US auctions, work out the full cost of getting one onto Bosnian
            plates before you bid, and follow the import through every stage from your account.
          </p>

          <form onSubmit={onSearch} className="mt-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-dim"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by make, model or VIN"
                aria-label="Search vehicles"
                className="h-10 w-full rounded-md border border-steel bg-midnight-2 pl-9 pr-3 text-sm text-chrome placeholder:text-silver-dim/80 focus:border-accent focus:outline-none"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="mt-5 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-silver-dim">Popular makes</span>
            {POPULAR_BRANDS.slice(0, 5).map((brand) => (
              <Link
                key={brand}
                href={`/cars?make=${encodeURIComponent(brand)}`}
                className="text-silver underline-offset-4 hover:text-accent-bright hover:underline"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>

        {/* Worked cost example, computed live from the shared rate model. */}
        <div className="panel rounded-lg">
          <div className="border-b border-steel px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver-dim">
              Example: a {formatUSD(EXAMPLE_PRICE)} auction car
            </h2>
          </div>
          <dl className="divide-y divide-steel">
            {example.lineItems
              .filter((li) => li.amountUSD > 0)
              .map((li) => (
                <div key={li.key} className="flex items-baseline justify-between px-5 py-2.5">
                  <dt className="text-sm text-silver-dim">{li.label}</dt>
                  <dd className="font-mono text-sm tabular-nums text-silver">
                    {formatUSD(li.amountUSD)}
                  </dd>
                </div>
              ))}
          </dl>
          <div className="flex items-baseline justify-between border-t border-steel bg-midnight-2 px-5 py-4">
            <span className="text-sm font-medium text-chrome">Landed cost</span>
            <span className="font-display text-xl font-semibold tabular-nums text-chrome">
              {formatBAM(example.totalBAM)}
            </span>
          </div>
          <p className="border-t border-steel px-5 py-3 text-xs leading-relaxed text-silver-dim">
            An illustration on typical fees, not a quote. Shipping and auction fees vary by vehicle
            and port.{" "}
            <Link href="/calculator" className="text-accent underline-offset-4 hover:underline">
              Use the calculator
            </Link>{" "}
            for your own figures.
          </p>
        </div>
      </div>
    </section>
  );
}
