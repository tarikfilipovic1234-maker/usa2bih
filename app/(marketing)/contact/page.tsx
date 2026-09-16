import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
        as="h1"
        eyebrow="Contact"
        title="Get in touch"
        description="Ask about a specific vehicle, or about how the import process would work for you. Include a lot number or VIN if you have one and we can quote against it."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {INFO.map((item) => (
            <Card key={item.label} className="flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-bright">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-silver-dim">{item.label}</p>
                <p className="font-medium text-chrome">{item.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 sm:p-8">
          <ContactForm />
        </Card>
      </div>
    </Container>
  );
}
