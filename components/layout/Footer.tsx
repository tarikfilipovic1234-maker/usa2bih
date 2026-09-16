import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/cars", label: "Browse Cars" },
      { href: "/calculator", label: "Cost Calculator" },
      { href: "/guide", label: "Import Guide" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-midnight-2/60">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-silver-dim">{SITE.description}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-silver-dim">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-silver transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-silver-dim">
              Contact
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-silver">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                Sarajevo, Bosnia &amp; Herzegovina
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-silver-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Landed-cost figures on this site are estimates, not binding quotes.</p>
        </div>
      </Container>
    </footer>
  );
}
