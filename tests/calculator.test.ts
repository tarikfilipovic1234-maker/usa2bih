import { describe, expect, it } from "vitest";
import { calculateImportCost, estimateLandedTotal, RATES } from "@/lib/calculator";
import { calculatorSchema } from "@/lib/validation";

const base = {
  purchasePrice: 18_000,
  auctionFees: 1_440,
  shipping: 1_900,
  fuelType: "GASOLINE" as const,
  registration: 600,
  serviceFee: 750,
};

describe("calculateImportCost", () => {
  it("matches the worked example shown on the home page", () => {
    const r = calculateImportCost(base);

    // Customs value = 18,000 + 1,440 + 1,900 = 21,340
    expect(r.subtotalUSD).toBe(21_340);
    // Duty 5% of 21,340 = 1,067
    expect(r.customsDutyUSD).toBe(1_067);
    // VAT 17% of (21,340 + 1,067) = 3,809.19 -> 3,809
    expect(r.vatUSD).toBe(3_809);
    expect(r.totalUSD).toBe(27_566);
    expect(r.totalBAM).toBe(49_602);
  });

  it("charges VAT on the duty-inclusive value, not on the purchase price alone", () => {
    const r = calculateImportCost({ ...base, auctionFees: 0, shipping: 0 });
    const expectedVat = Math.round((18_000 + 900) * RATES.vatRate);
    expect(r.vatUSD).toBe(expectedVat);
    expect(r.vatUSD).not.toBe(Math.round(18_000 * RATES.vatRate));
  });

  it("does not apply duty or VAT to registration and service fee", () => {
    const without = calculateImportCost({ ...base, registration: 0, serviceFee: 0 });
    const withFees = calculateImportCost(base);
    expect(withFees.customsDutyUSD).toBe(without.customsDutyUSD);
    expect(withFees.vatUSD).toBe(without.vatUSD);
    expect(withFees.totalUSD - without.totalUSD).toBe(600 + 750);
  });

  it("line items always add up to the total", () => {
    const r = calculateImportCost({ ...base, purchasePrice: 12_345.67, shipping: 1_234.5 });
    const sum = r.lineItems.reduce((s, li) => s + li.amountUSD, 0);
    expect(sum).toBe(r.totalUSD);
  });

  it("converts EUR to BAM at the fixed peg", () => {
    const r = calculateImportCost(base);
    expect(r.totalBAM).toBe(Math.round(r.totalEUR * 1.95583));
  });

  it("treats negative inputs as zero", () => {
    const r = calculateImportCost({ ...base, purchasePrice: -500, auctionFees: -1, shipping: -1 });
    expect(r.subtotalUSD).toBe(0);
    expect(r.customsDutyUSD).toBe(0);
    expect(r.vatUSD).toBe(0);
  });

  it("handles a zero-price vehicle without NaN", () => {
    const r = calculateImportCost({ purchasePrice: 0, fuelType: "GASOLINE", auctionFees: 0, shipping: 0, registration: 0, serviceFee: 0 });
    expect(r.totalUSD).toBe(0);
    expect(Number.isNaN(r.totalBAM)).toBe(false);
  });
});

describe("estimateLandedTotal", () => {
  it("uses 8% auction fees and the default shipping estimate", () => {
    const r = estimateLandedTotal(10_000);
    const fees = r.lineItems.find((li) => li.key === "auctionFees");
    const shipping = r.lineItems.find((li) => li.key === "shipping");
    expect(fees?.amountUSD).toBe(800);
    expect(shipping?.amountUSD).toBe(1_900);
  });
});

describe("calculatorSchema", () => {
  it("coerces form strings to numbers and applies defaults", () => {
    const parsed = calculatorSchema.parse({ purchasePrice: "15000" });
    expect(parsed.purchasePrice).toBe(15_000);
    expect(parsed.shipping).toBe(0);
    expect(parsed.fuelType).toBe("GASOLINE");
  });

  it("rejects negative and absurd prices", () => {
    expect(calculatorSchema.safeParse({ purchasePrice: "-1" }).success).toBe(false);
    expect(calculatorSchema.safeParse({ purchasePrice: "20000000" }).success).toBe(false);
  });
});
