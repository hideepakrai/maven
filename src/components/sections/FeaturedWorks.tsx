"use client";
import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 🌟 Example projects - Yahaan apna data daalein
const projects = [
  {
    id: 1,
    title: "MAKRA TOWER",
    location: "JALGAON",
    categories: ["HOUSES", "DESIGN", "SKYSCRAPPER"],
    image: "/assets/Image/jalgoan.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/makra-tower",
  },
  {
    id: 2,
    title: "ZOPE'S RESIDENCE",
    location: "LOWER PAREL, MUMBAI",
    categories: ["INTERIOR", "MINIMALISM", "ELEGANCE"],
    image: "/assets/Image/home-slider.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/zope-residence",
  },
  {
    id: 3,
    title: "THE CANVAS",
    location: "PUNE",
    categories: ["COMMERCIAL", "FACADE", "DESIGN"],
    image: "/assets/Image/jalgoan.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/the-canvas",
  },
];

// --- Animation Variants ---
// Yeh "text scroll" effect ke liye hain
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const textVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};
// ----------------------------

export default function FeaturedWorks() {
  return (
    <section className="bg-[#282828] text-gray-300 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Heading */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
            OUR FEATURED <span className="text-[#DEBB70]">WORKS</span>
          </h2>
          <div className="w-16 h-1 bg-[#DEBB70]"></div> {/* Gold Line */}
        </div>

        {/* Projects List */}
        <div className="mt-20 space-y-24">
          {projects.map((project, index) => {
            const isOdd = index % 2 === 0; // Check for alternating layout

            return (
              <motion.div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // 30% dikhne par animate hoga
              >
                
                {/* 🔹 Text Column */}
                <motion.div
                  // 'order-2' se mobile par image upar aati hai
                  className={`flex flex-col ${
                    isOdd ? "md:order-1" : "md:order-2" 
                  }`}
                  // 🌟 Yahaan text slide-in animation set kiya hai
                  variants={isOdd ? textVariants : textVariantsRight}
                >
                  <div className="flex space-x-4 mb-4">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-semibold text-gray-400 tracking-widest uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                    {project.title}
                  </h3>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-400">
                    {project.location}
                  </h4>
                  <a
                    href={project.slug}
                    className="inline-flex items-center text-white border border-white 
                             px-6 py-3 mt-8 max-w-max 
                             hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    View Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </motion.div>

                {/* 🔹 Image Column */}
                <motion.div
                  // 'order-1' se mobile par image upar aati hai
                  className={`w-full ${
                    isOdd ? "md:order-2" : "md:order-1" 
                  }`}
                  // 🌟 Yahaan image scale-up animation set kiya hai
                  variants={imageVariants}
                >
                  <a href={project.slug} className="block group">
                    <img
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}