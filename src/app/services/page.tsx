import type { Metadata } from "next";

import PageHero from "@/components/pages/PageHero";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeServices from "@/components/sections/home/HomeServices";
import { homeFooterCta, processIntro, processSteps, services } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "Services | Maven Projects",
  description:
    "Explore Maven Projects services including architecture, renovation, interior design, and project execution support.",
};

export default function Page() {
  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Services"
        title="Architecture, renovation, and interiors designed as one continuous language."
        description="Our services are structured to keep concept, detailing, and delivery aligned so the project feels coherent from the first sketch through completion."
        image="/assets/Image/about-image.jpg"
      />
      <HomeServices items={services} />
      <HomeProcess intro={processIntro} steps={processSteps} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
