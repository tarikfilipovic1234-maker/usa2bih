import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTA } from "@/components/sections/CTA";
import { getPublishedGuide } from "@/lib/queries";
import { resolveIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Import Process Guide",
  description:
    "Step-by-step: how importing a car from a US auction to Bosnia & Herzegovina works — from finding a vehicle to delivery at your door.",
};

export default async function GuidePage() {
  const steps = await getPublishedGuide();

  return (
    <>
      <Container className="py-12">
        <SectionHeading
          eyebrow="Import guide"
          title="How importing works, step by step"
          description="A transparent, fully managed process. Here's exactly what happens from start to finish."
        />

        <ol className="relative mx-auto mt-14 max-w-3xl">
          <span className="absolute left-6 top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/60 via-steel-2 to-transparent" />
          {steps.map((step, i) => {
            const Icon = resolveIcon(step.icon);
            return (
              <li key={step.id} className="relative mb-8 flex gap-6 pl-0">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-bright to-accent-deep text-midnight shadow-[0_6px_20px_-6px_var(--color-accent-glow)]">
                  <Icon className="h-5 w-5" />
                </span>
                <GlassCard interactive className="flex-1 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-chrome">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-dim">{step.body}</p>
                </GlassCard>
              </li>
            );
          })}
        </ol>
      </Container>
      <CTA />
    </>
  );
}
