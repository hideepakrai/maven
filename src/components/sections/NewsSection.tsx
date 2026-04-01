"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function NewsSection() {
  // 🎨 YAHAA BADLA HAI: Architect website ke liye naya content
  const news = [
    {
      id: 1,
      title: "Design for 'The Vertex' Tower Unveiled in Mumbai",
      description:
        "Our ambitious new 50-story mixed-use tower aims to redefine the city skyline with its innovative sustainable facade and public sky-gardens.",
      date: "November 12, 2025",
      image: "/assets/Image/project-image1.png", // ⚠️ Apni image ka path yahaan daalein
    },
    {
      id: 2,
      title: "Honored with the 'Green Design Award' for Zen Meadows",
      description:
        "We are proud to announce our 'Zen Meadows' residential project won the 2025 Green Design Award for its use of passive cooling and recycled materials.",
      date: "October 28, 2025",
      image: "/assets/Image/project-image2.png", // ⚠️ Apni image ka path yahaan daalein
    },
    {
      id: 3,
      title: "Our Principal Architect Discusses 'Future-Forward' Urbanism",
      description:
        "In a recent article for ArchDaily, our founder discusses the principles of biophilic design and how we're integrating nature into dense urban spaces.",
      date: "October 10, 2025",
      image: "/assets/Image/project-image1.png", // ⚠️ Apni image ka path yahaan daalein
    },
  ];

  return (
    // Section BG ko dark gray kiya
    <section className="relative bg-[#282828] py-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          {/* 🎨 Title text ko white kiya */}
          What’s New
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              // Card BG ko thoda lighter gray, shadow ki jagah border diya
              className="bg-[#3a3a3a] rounded-none overflow-hidden flex flex-col 
                         border border-[#3a3a3a] hover:border-[#debb70]
                         transition-colors duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-100 mb-2 leading-snug">
                  {/* Card title ko light gray kiya */}
                  {item.title}
                </h3>
                <p className="text-white/90 flex-grow">
                  {/* Description text ko light gray kiya */}
                  {item.description}
                </p>
                <div className="mt-4 text-sm text-white/90">{item.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 ">
          <button
            className="inline-flex items-center gap-2 bg-[#debb70] hover:bg-[#debb70] text-white px-6 py-3 font-semibold transition-colors duration-300"
            style={{ borderRadius: "6px" }}
          >
            See All News
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}