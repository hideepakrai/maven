
import Hero from "@/components/sections/Hero";
import FeatureTiles from "@/components/sections/FeatureTiles";
import AboutStrip from "@/components/sections/AboutStrip";
import ProductTabsGrid, { Product } from "@/components/sections/ProductTabsGrid";
import AboutKarloBan from "@/components/sections/AboutKarloBan";
import Testimonials from "@/components/sections/Testimonials";
import OurWork from "@/components/sections/OurWork";
import ContactUs from "@/components/sections/ContactUs";
import NewsSection from "@/components/sections/NewsSection";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutSection from "@/components/sections/AboutStrip";
import AboutUs from "@/components/sections/AboutKarloBan";
import HeroSection from "@/components/sections/HeroSection";

const pettyProducts: Product[] = [
  { id: "p1", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p2", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p3", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p4", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p5", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p6", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p7", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
  { id: "p8", name: "Petty 173mm", priceEUR: 220, image: "/assets/products/product-img.png", size: "173mm" },
];
const categories = [
  { id: "petty", label: "Petty", products: pettyProducts },
  { id: "gyuto", label: "Gyuto", products: pettyProducts.slice(0, 6) },
  { id: "santoku", label: "Santoku", products: pettyProducts.slice(0, 6) },
  { id: "nakiri", label: "Nakiri", products: pettyProducts.slice(0, 6) },
];
export default function HomePage() {
  return (
    <main>
      {/* <HeroSection/> */}
      <Hero />
      <AboutUs />
      <AboutSection />       
      <OurWork/>
      <FeaturedWorks/>
      <FeaturedProjects/>
      <NewsSection />
        {/* <ContactUs/> */}
    </main>
  );
}
