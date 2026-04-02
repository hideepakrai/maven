import type { Metadata } from "next";

import PageHero from "@/components/pages/PageHero";
import HomeClosingCta from "@/components/sections/home/HomeClosingCta";
import HomeJournal from "@/components/sections/home/HomeJournal";
import { homeFooterCta, journalEntries } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "Media | Maven Projects",
  description:
    "Read studio updates, press features, project stories, and design notes from Maven Projects.",
};

export default function Page() {
  return (
    <main className="bg-white text-[#111111]">
      <PageHero
        eyebrow="Media"
        title="Press, project stories, and studio notes around our architecture and interior design work."
        description="A curated set of articles and releases that extend the ideas behind the spaces we create."
        image="/assets/minnaro/p1.png"
      />
      <HomeJournal items={journalEntries} />
      <HomeClosingCta content={homeFooterCta} />
    </main>
  );
}
