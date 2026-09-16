import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply to using the USA2BIH website, its cost estimates, and the vehicle import service arranged through it.",
};

const UPDATED = "16 September 2026";

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated={UPDATED}>
      <LegalSection heading="Scope">
        <p>
          These terms apply to your use of this website and to any import we arrange through it.
          They are between you and USA2BIH, operating from Sarajevo, Bosnia and Herzegovina. Using
          the site means you accept them.
        </p>
      </LegalSection>

      <LegalSection heading="Cost estimates are not quotes">
        <p>
          The calculator and the landed-cost figures shown beside vehicles are estimates produced
          by applying published duty and VAT rates and typical fee assumptions to the price you
          enter. They are not offers and they do not bind either party. Several inputs are outside
          our control:
        </p>
        <ul className="flex flex-col gap-2">
          <li>Auction and broker fees vary with the final hammer price.</li>
          <li>Ocean and inland freight rates change with the route and season.</li>
          <li>
            The customs value, and therefore the duty and VAT charged, is determined by the customs
            authority at clearance and not by us.
          </li>
          <li>The USD to EUR rate used for conversion is a maintained constant, not a live rate.</li>
        </ul>
        <p>
          A binding, itemised quote is issued in writing for a specific vehicle before you commit
          to anything. Where a written quote and a figure on this site disagree, the written quote
          governs.
        </p>
      </LegalSection>

      <LegalSection heading="Vehicle listings">
        <p>
          Listings reproduce information from the auction house, including mileage, specification,
          title status and damage description. We pass that information on in good faith but we do
          not originate it and cannot warrant it. Vehicles offered at US salvage auctions may have
          damage that is not fully described or visible in the photographs. Availability changes
          without notice; a vehicle may be sold or withdrawn between your viewing it and your
          inquiry reaching us.
        </p>
      </LegalSection>

      <LegalSection heading="Bidding on your behalf">
        <p>
          When you instruct us to bid, you set a maximum. We do not bid above it. Auctions are
          binding on the winning bidder, so if your bid wins, you are committed to the purchase and
          to the fees that follow from it. We cannot guarantee that any particular bid will win.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          The amounts payable, what each one covers and when each falls due are set out in the
          written quote for your import. Duty, VAT and registration charges are collected by the
          relevant authorities at their rates; we pass those through without markup and account for
          them separately from our service fee.
        </p>
      </LegalSection>

      <LegalSection heading="Timelines">
        <p>
          Stage dates shown in your dashboard reflect what has happened and what is currently
          expected. Sailing schedules, port congestion, customs inspection and inspection queues
          are not within our control, and an expected date is not a guaranteed one.
        </p>
      </LegalSection>

      <LegalSection heading="Your account">
        <p>
          Keep your password to yourself and tell us promptly if you believe someone else has
          access to your account. You are responsible for what is done through it. Documents you
          upload must relate to your own import. We may suspend an account used to misuse the
          service or to submit false information.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          We are responsible for performing the import service we have agreed to perform, with
          reasonable care. We are not liable for the mechanical condition of a vehicle bought at
          auction, for information originating with the auction house, for decisions taken by
          customs or registration authorities, or for delays caused by carriers or by those
          authorities. Nothing here limits liability that cannot be limited under the law of Bosnia
          and Herzegovina.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the law of Bosnia and Herzegovina, and the courts of Bosnia
          and Herzegovina have jurisdiction over any dispute arising from them.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p>
          If these terms change, the date at the top of this page changes with it. Terms already
          agreed for an import in progress continue to apply to that import. Questions can go to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or through the{" "}
          <Link href="/contact">contact page</Link>. See also our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
