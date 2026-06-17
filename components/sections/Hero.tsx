"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { POPULAR_BRANDS } from "@/lib/constants";

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/cars?q=${encodeURIComponent(q.trim())}` : "/cars");
  }

  return (
    <section className="relative overflow-hidden noise">
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-accent-deep/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent-bright"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Transparent US car imports to Bosnia & Herzegovina
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-chrome-gradient">American cars,</span>
            <br />
            <span className="text-accent-gradient text-glow">delivered to your door.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-silver-dim"
          >
            Browse live US auction vehicles, estimate the full landed cost in BAM &amp; EUR, and
            track every step from auction win to your driveway — all in one place.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            onSubmit={onSearch}
            className="glass chrome-edge mt-8 flex items-center gap-2 rounded-full p-2 pl-5"
          >
            <Search className="h-5 w-5 shrink-0 text-silver-dim" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search make, model, or VIN…"
              aria-label="Search vehicles"
              className="h-10 w-full bg-transparent text-sm text-chrome placeholder:text-silver-dim/70 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-midnight transition-colors hover:bg-accent-bright"
            >
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs text-silver-dim">Popular:</span>
            {POPULAR_BRANDS.slice(0, 6).map((brand) => (
              <ButtonLink
                key={brand}
                href={`/cars?make=${encodeURIComponent(brand)}`}
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                {brand}
              </ButtonLink>
            ))}
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative hidden lg:block"
        >
          <div className="glass chrome-edge relative overflow-hidden rounded-[2rem] p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Premium imported vehicle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass chrome-edge absolute -bottom-5 -left-6 flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-positive/15 text-positive">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-chrome">All-in landed cost</p>
              <p className="text-xs text-silver-dim">No hidden fees — BAM &amp; EUR</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
