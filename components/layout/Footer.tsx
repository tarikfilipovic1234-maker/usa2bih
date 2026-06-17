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
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-midnight-2/60">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-silver-dim">{SITE.description}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-silver-dim">
                {col.title}
              </h3>
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
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-silver-dim">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-silver">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent" /> {SITE.email}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent" /> Sarajevo, Bosnia & Herzegovina
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-silver-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Vehicles imported transparently — from US auctions to your driveway in BiH.</p>
        </div>
      </Container>
    </footer>
  );
}
