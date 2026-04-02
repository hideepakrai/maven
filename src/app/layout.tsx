import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Manrope,
  Montserrat,
  Poppins,
} from "next/font/google";

import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-editorial" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Maven Projects",
    template: "%s | Maven Projects",
  },
  description:
    "Maven Projects is a contemporary architecture and interiors studio creating calm, refined residential and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${manrope.variable} ${cormorant.variable} font-inter text-brand-text`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
