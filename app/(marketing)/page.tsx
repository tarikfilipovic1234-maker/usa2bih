import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PopularBrands } from "@/components/sections/PopularBrands";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedCars />
      </Suspense>
      <HowItWorks />
      <PopularBrands />
      <Testimonials />
      <CTA />
    </>
  );
}
