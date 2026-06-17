import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { FaqAccordion, type Faq } from "@/components/FaqAccordion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about importing cars from the US to Bosnia & Herzegovina — costs, customs, timelines, salvage titles and more.",
};

const FAQS: Faq[] = [
  {
    q: "How much does it cost to import a car from the US to Bosnia?",
    a: "The total landed cost includes the auction price, auction/broker fees, ocean shipping, customs duty (≈5%), VAT/PDV (17%), registration and our service fee. Use our calculator for a live estimate in BAM and EUR.",
  },
  {
    q: "How long does shipping take?",
    a: "Ocean transit is typically 3–5 weeks depending on the US port, plus customs clearance and registration in BiH. Most imports complete within 5–8 weeks end to end.",
  },
  {
    q: "Can I import salvage or damaged vehicles?",
    a: "Yes. Many great-value vehicles come from Copart and IAAI with minor to moderate damage. Each listing shows the damage status and notes so you know exactly what you're buying.",
  },
  {
    q: "Do I need to pay everything upfront?",
    a: "You pay for the vehicle and auction fees once you win the bid, then shipping and import costs as the process progresses. We outline the payment schedule clearly before you commit.",
  },
  {
    q: "What documents will I receive?",
    a: "You'll receive the US title, export documents, bill of lading, and after clearance the BiH customs and registration paperwork — all stored in your dashboard.",
  },
  {
    q: "Can I track my import?",
    a: "Absolutely. Your dashboard shows a live progress tracker through every stage: auction won, payment, shipping, port arrival, customs, and delivery.",
  },
  {
    q: "Do you offer a binding quote?",
    a: "The calculator gives an indicative estimate. For a binding, itemised quote tailored to a specific vehicle, send us an inquiry and our team will follow up.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Container className="py-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about importing your next car. Can't find an answer? Get in touch."
        />
        <div className="mt-12">
          <FaqAccordion items={FAQS} />
        </div>
      </Container>
      <CTA />
    </>
  );
}
