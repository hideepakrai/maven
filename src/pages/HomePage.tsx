import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeFeatureBanner from "@/components/sections/home/HomeFeatureBanner";
import HomeFounderFeature from "@/components/sections/home/HomeFounderFeature";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeJournal from "@/components/sections/home/HomeJournal";
import HomeMetricsAwards from "@/components/sections/home/HomeMetricsAwards";
import HomeProcess from "@/components/sections/home/HomeProcess";
import HomeProjects from "@/components/sections/home/HomeProjects";
import HomeServices from "@/components/sections/home/HomeServices";
import HomeStudioIntro from "@/components/sections/home/HomeStudioIntro";
import {
  awards,
  featureBanner,
  featuredProjects,
  founderFeature,
  heroContent,
  homeFooterCta,
  journalEntries,
  processIntro,
  processSteps,
  projectMetrics,
  services,
  studioIntro,
} from "@/lib/homepage-data";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#141414]">
      <HomeHero content={heroContent} />
      <HomeStudioIntro content={studioIntro} />
      <HomeServices items={services} />
      <HomeProjects items={featuredProjects} />
      <HomeProcess intro={processIntro} steps={processSteps} />
      <HomeFeatureBanner content={featureBanner} />
      <HomeMetricsAwards stats={projectMetrics} awards={awards} />
      <HomeFounderFeature content={founderFeature} />
      <HomeJournal items={journalEntries} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
