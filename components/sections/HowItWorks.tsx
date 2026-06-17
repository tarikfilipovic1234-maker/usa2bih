"use client";

import { Calculator, Gavel, Ship, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealGroup, revealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const STEPS = [
  {
    icon: Calculator,
    title: "Estimate the cost",
    body: "Use our transparent calculator to see the full landed price in BAM & EUR before you commit.",
  },
  {
    icon: Gavel,
    title: "We win the auction",
    body: "Our team bids on your behalf at Copart, IAAI & Manheim to secure your vehicle.",
  },
  {
    icon: Ship,
    title: "Ocean shipping",
    body: "Your car is shipped and cleared through customs — every step tracked in your dashboard.",
  },
  {
    icon: Truck,
    title: "Delivered in BiH",
    body: "We register and deliver the road-ready vehicle straight to your city.",
  },
];

export function HowItWorks() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="How it works"
        title="From US auction to your driveway"
        description="A fully managed, transparent import process — no surprises, no hidden fees."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div key={step.title} variants={revealItem}>
            <GlassCard interactive className="relative h-full p-6">
              <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/5">
                {i + 1}
              </span>
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-bright">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-semibold text-chrome">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-dim">{step.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </RevealGroup>

      <div className="mt-10 flex justify-center">
        <ButtonLink href="/guide" variant="secondary">
          See the full import guide
        </ButtonLink>
      </div>
    </Container>
  );
}
