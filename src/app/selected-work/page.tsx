import type { Metadata } from "next";

import PageHero from "@/components/pages/PageHero";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import HomeProjects from "@/components/sections/home/HomeProjects";
import { featureBanner, featuredProjects, homeFooterCta } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "Selected Work | Maven Projects",
  description:
    "Browse selected architecture and interior design projects by Maven Projects across residential and cultural spaces.",
};

export default function Page() {
  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Selected Work"
        title="Projects shaped through restraint, natural materials, and exacting contemporary detail."
        description="A curated look at recent work across homes, interior architecture, and spatial interventions."
        image="/assets/Image/project-image2.png"
      />
      <HomeProjects items={featuredProjects} />
      <HomeFeatureBanner content={featureBanner} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
