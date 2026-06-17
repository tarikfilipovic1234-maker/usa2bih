import type { Metadata } from "next";
import { Eye, Gauge, HandshakeIcon, ShieldCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "USA2BIH makes importing American cars to Bosnia & Herzegovina transparent, simple, and fully managed — from US auctions to your driveway.",
};

const VALUES = [
  {
    icon: Eye,
    title: "Radical transparency",
    body: "Every fee, upfront. Our calculator shows the full landed cost before you commit — no surprises at the port.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end trust",
    body: "We handle bidding, payment, shipping, customs and registration, keeping you informed at every stage.",
  },
  {
    icon: Gauge,
    title: "Speed & efficiency",
    body: "Optimised logistics and auction partnerships mean faster delivery and better prices for you.",
  },
  {
    icon: HandshakeIcon,
    title: "People first",
    body: "Real support from a team that knows both the US auction world and the Bosnian import process.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-12">
        <SectionHeading
          eyebrow="About us"
          title="Importing American cars, the honest way"
          description="We started USA2BIH because importing a car shouldn't feel like a gamble. Our mission is to bring American vehicles to Bosnia & Herzegovina with complete transparency and zero stress."
        />
      </Container>

      <StatsStrip />

      <Container className="py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <GlassCard key={v.title} interactive className="p-6">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-bright">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-semibold text-chrome">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-dim">{v.body}</p>
            </GlassCard>
          ))}
        </div>
      </Container>

      <CTA />
    </>
  );
}
