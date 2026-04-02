import type { Metadata } from "next";

import HomePage from "@/pages/HomePage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore Maven Projects, a modern architecture and interiors studio with selected work, process, media, and contact information.",
};

export default function Page() {
  return <HomePage />;
}
