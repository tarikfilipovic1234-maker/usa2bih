import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the USA2BIH team about importing a vehicle from the US to Bosnia & Herzegovina.",
};

const INFO = [
  { icon: Mail, label: "Email", value: SITE.email },
  { icon: Phone, label: "Phone", value: SITE.phone },
  { icon: MapPin, label: "Location", value: "Sarajevo, Bosnia & Herzegovina" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 09:00–17:00 CET" },
];

export default function ContactPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Contact"
        title="Let's get your import started"
        description="Questions about a specific vehicle or the process? Send us a message and our team will get back to you."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {INFO.map((item) => (
            <GlassCard key={item.label} className="flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-bright">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-silver-dim">{item.label}</p>
                <p className="font-medium text-chrome">{item.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard chrome className="p-6 sm:p-8">
          <ContactForm />
        </GlassCard>
      </div>
    </Container>
  );
}
