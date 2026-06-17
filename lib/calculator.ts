import type { CalculatorInput } from "@/lib/validation";

/**
 * Import cost model for vehicles entering Bosnia & Herzegovina from the US.
 *
 * Rates are transparent, configurable constants. BAM is pegged to EUR at a
 * fixed rate; USD→EUR is a maintained constant (upgradeable to a live FX API).
 * Customs duty + VAT (PDV) follow standard BiH passenger-vehicle treatment.
 */
export const RATES = {
  /** USD → EUR (maintained constant; replace with live FX later). */
  usdToEur: 0.92,
  /** EUR → BAM fixed peg. */
  eurToBam: 1.95583,
  /** Customs duty on (purchase + shipping). */
  customsDutyRate: 0.05,
  /** BiH VAT / PDV on the customs value (purchase + shipping + duty). */
  vatRate: 0.17,
} as const;

export type CostLineItem = { key: string; label: string; amountUSD: number };

export type ImportCostResult = {
  lineItems: CostLineItem[];
  subtotalUSD: number;
  customsDutyUSD: number;
  vatUSD: number;
  totalUSD: number;
  totalEUR: number;
  totalBAM: number;
};

const round = (n: number) => Math.round(n);

/**
 * Pure function — given purchase/shipping/fees, returns the full landed-cost
 * breakdown in USD plus EUR & BAM totals. Used by the calculator page, the
 * vehicle-detail "estimated landed cost", and saved calculations.
 */
export function calculateImportCost(input: CalculatorInput): ImportCostResult {
  const purchasePrice = Math.max(0, input.purchasePrice);
  const auctionFees = Math.max(0, input.auctionFees ?? 0);
  const shipping = Math.max(0, input.shipping ?? 0);
  const registration = Math.max(0, input.registration ?? 0);
  const serviceFee = Math.max(0, input.serviceFee ?? 0);

  // Customs value = purchase + auction fees + shipping.
  const customsValue = purchasePrice + auctionFees + shipping;
  const customsDutyUSD = round(customsValue * RATES.customsDutyRate);
  const vatUSD = round((customsValue + customsDutyUSD) * RATES.vatRate);

  const lineItems: CostLineItem[] = [
    { key: "purchase", label: "Vehicle purchase price", amountUSD: round(purchasePrice) },
    { key: "auctionFees", label: "Auction & broker fees", amountUSD: round(auctionFees) },
    { key: "shipping", label: "Shipping (ocean + inland)", amountUSD: round(shipping) },
    { key: "customs", label: "Customs duty (5%)", amountUSD: customsDutyUSD },
    { key: "vat", label: "VAT / PDV (17%)", amountUSD: vatUSD },
    { key: "registration", label: "Registration & inspection", amountUSD: round(registration) },
    { key: "service", label: "USA2BIH service fee", amountUSD: round(serviceFee) },
  ];

  const subtotalUSD = round(customsValue);
  const totalUSD = lineItems.reduce((sum, li) => sum + li.amountUSD, 0);
  const totalEUR = round(totalUSD * RATES.usdToEur);
  const totalBAM = round(totalEUR * RATES.eurToBam);

  return { lineItems, subtotalUSD, customsDutyUSD, vatUSD, totalUSD, totalEUR, totalBAM };
}

/** Convenience: landed total only, from a vehicle's purchase price + an est. shipping default. */
export function estimateLandedTotal(purchasePriceUSD: number, shippingUSD = 1900) {
  return calculateImportCost({
    purchasePrice: purchasePriceUSD,
    auctionFees: Math.round(purchasePriceUSD * 0.08),
    shipping: shippingUSD,
    fuelType: "GASOLINE",
    registration: 600,
    serviceFee: 750,
  });
}
