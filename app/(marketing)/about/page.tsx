import type { Metadata } from "next";
import { Calculator, FileText, Gavel, Ship } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "USA2BIH handles the full import of American cars into Bosnia and Herzegovina: auction bidding, ocean freight, customs clearance and registration.",
};

const WHAT_WE_DO = [
  {
    icon: Calculator,
    title: "Costing before you bid",
    body: "The calculator applies the same duty, VAT and conversion rates we use internally, so the figure you see before bidding is the figure we work to.",
  },
  {
    icon: Gavel,
    title: "Bidding at US auctions",
    body: "We hold the broker access needed to bid at Copart and IAAI on your behalf, and we bid only up to the ceiling you set.",
  },
  {
    icon: Ship,
    title: "Freight and clearance",
    body: "Inland transport to the export port, ocean freight to Europe, and customs clearance into Bosnia and Herzegovina are handled as one job.",
  },
  {
    icon: FileText,
    title: "Paperwork in one place",
    body: "The US title, bill of lading, customs declaration and registration documents are uploaded to your dashboard as each one is issued.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-12">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="About us"
          title="Importing American cars into Bosnia"
          description="Buying a car at a US auction is the easy part. The cost of getting it onto Bosnian plates is where most imports go wrong, so we quote that cost first and handle every step that follows."
        />
      </Container>

      <Container className="pb-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_WE_DO.map((v) => (
            <Card key={v.title} interactive className="p-6">
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-accent/10 text-accent-bright">
                <v.icon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-base font-semibold text-chrome">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-silver-dim">{v.body}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-4">
        <div className="max-w-2xl border-l-2 border-accent/40 pl-6">
          <h2 className="font-display text-xl font-semibold text-chrome">
            Where the estimate can move
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-silver-dim">
            An estimate is not a binding quote. Auction fees vary with the final hammer price,
            ocean freight rates change with the shipping season, and the customs value is set by
            the authority at clearance, not by us. Send an inquiry on a specific vehicle and we
            will put an itemised quote in writing before any money moves.
          </p>
        </div>
      </Container>

      <CTA />
    </>
  );
}
