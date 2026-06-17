"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealGroup, revealItem } from "@/components/motion/Reveal";

const TESTIMONIALS = [
  {
    name: "Amar H.",
    city: "Sarajevo",
    quote:
      "I imported a 2021 Model 3 and the final cost matched the calculator almost to the mark. The tracking dashboard kept me calm the whole way.",
  },
  {
    name: "Lejla K.",
    city: "Tuzla",
    quote:
      "Transparent pricing was the dealbreaker for me. No hidden fees, and the team handled customs and registration end to end.",
  },
  {
    name: "Mirza D.",
    city: "Banja Luka",
    quote:
      "Found a clean Mustang GT at auction, won it within my budget, and it arrived in just over four weeks. Outstanding service.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by importers across BiH"
          description="Real customers, real cars delivered — here's what they say."
        />

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={revealItem}>
              <GlassCard interactive className="flex h-full flex-col gap-4 p-6">
                <Quote className="h-8 w-8 text-accent/40" />
                <p className="flex-1 leading-relaxed text-silver">{t.quote}</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="font-semibold text-chrome">{t.name}</p>
                    <p className="text-xs text-silver-dim">{t.city}</p>
                  </div>
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
