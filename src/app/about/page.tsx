import type { Metadata } from "next";

import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeFounderFeature from "@/components/sections/home/HomeFounderFeature";
import HomeMetricsAwards from "@/components/sections/home/HomeMetricsAwards";
import PageHero from "@/components/pages/PageHero";
import { awards, founderFeature, homeFooterCta, projectMetrics } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "About | Minnaro Architects",
  description:
    "Learn about Minnaro Architects, our studio approach, design philosophy, and the way we shape architecture and interiors.",
};

export default function Page() {
  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow="About"
        title="A modern architecture and interiors studio built around clarity, proportion, and calm execution."
        description="Minnaro Architects works across residences, renovations, and contemporary interior environments with a strong emphasis on detail, material warmth, and design continuity."
        image="/assets/Image/about-us-img.jpeg"
      />
      <HomeFounderFeature content={founderFeature} />
      <HomeMetricsAwards stats={projectMetrics} awards={awards} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
