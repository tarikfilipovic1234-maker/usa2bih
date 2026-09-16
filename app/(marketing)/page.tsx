import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { CostBasis } from "@/components/sections/CostBasis";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PopularBrands } from "@/components/sections/PopularBrands";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CostBasis />
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedCars />
      </Suspense>
      <HowItWorks />
      <PopularBrands />
      <CTA />
    </>
  );
}
