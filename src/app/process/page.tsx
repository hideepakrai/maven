import type { Metadata } from "next";

import PageHero from "@/components/pages/PageHero";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeMetricsAwards from "@/components/sections/home/HomeMetricsAwards";
import HomeProcess from "@/components/sections/home/HomeProcess";
import { awards, homeFooterCta, processIntro, processSteps, projectMetrics } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "Process | Maven Projects",
  description:
    "See how Maven Projects guides clients from the first conversation to design development, site coordination, and completion.",
};

export default function Page() {
  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Process"
        title="A clear studio workflow that turns early ambition into a buildable, well-resolved project."
        description="Our process is collaborative and structured, helping clients move from briefing to decision-making with confidence."
        image="/assets/Image/project-image1.png"
      />
      <HomeProcess intro={processIntro} steps={processSteps} />
      <HomeMetricsAwards stats={projectMetrics} awards={awards} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
