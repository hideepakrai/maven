"use client";
import React from "react";
import { Building2, LayoutGrid, Home } from "lucide-react";

// Naya data, bilkul image ke jaisa
const services = [
  {
    id: 1,
    icon: <Building2 className="w-12 h-12 text-[#DEBB70]" />,
    title: "URBAN DESIGN",
    description:
      "We are a team of urban designers who are passionate about making cities more livable and sustainable. We believe that good design can make a difference in people's lives, and we strive to create spaces that inspire and enrich the lives of those who use them.",
    number: "01",
  },
  {
    id: 2,
    icon: <LayoutGrid className="w-12 h-12 text-[#DEBB70]" />,
    title: "ARCHITECTURE",
    description:
      "We are a passionate team who believe in the power of architecture. We believe that architecture has the ability to change lives and communities for the better. We are committed to creating spaces that inspire, heal, and connect people.",
    number: "02",
  },
  {
    id: 3,
    icon: <Home className="w-12 h-12 text-[#DEBB70]" />,
    title: "INTERIOR",
    description:
      "Our team of professional interior designers are passionate about creating beautiful and functional spaces. We. We believe that good design should be accessible to everyone, and we strive to create spaces that reflect our clients' unique styles and personalities.",
    number: "03",
  },
];

export default function OurWork() {
  return (
    // 🌟 **FIX: Yahaan naya pattern add kiya hai**
    <section
      className="text-gray-300 py-20 md:py-28"
      style={{
        // 1. Pehle original dark background color
        backgroundColor: "#282828",
        // 2. Uske upar CSS se bana blueprint grid pattern
        // (Yeh halki horizontal aur vertical lines banayega)
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        // 3. Grid ke squares ka size
        backgroundSize: "30px 30px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading (Image jaisa "gold" color) */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-[#DEBB70] mb-16 tracking-widest">
          OUR SERVICES
        </h2>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative p-8 rounded-lg transition-all duration-300 overflow-hidden
                ${
                  index === 0
                    ? "bg-[#3a3a3a] shadow-lg" // Pehla item
                    : "bg-transparent hover:bg-[#3a3a3a]" // Baaki items
                }
              `}
            >
              {/* Faded Number (Image ka main design element) */}
              <h1 className="absolute bottom-4 right-8 text-8xl font-bold text-gray-500 opacity-10 select-none z-0">
                {service.number}
              </h1>

              {/* Icon */}
              <div className="mb-6 relative z-10 text-[#DEBB70]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white tracking-wider uppercase relative z-10">
                {service.title}
              </h3>

              {/* Divider Line */}
              <hr className="border-t border-gray-700 w-24 my-5 relative z-10" />

              {/* Description */}
              <p className="text-gray-400 leading-relaxed relative z-10">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}