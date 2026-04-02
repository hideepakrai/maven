import type { Metadata } from "next";

import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Maven Projects",
  description:
    "Contact Maven Projects for architecture, renovation, interior design, and project consultation inquiries.",
};

export default function Page() {
  return <ContactPage />;
}
