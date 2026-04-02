"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  { 
    id: "01", 
    title: "RESIDENCE A", 
    category: "Interior Architecture", 
    slug: "/portfolio", 
    img: "/assets/minnaro/p1.png", 
    span: "md:col-span-2 md:row-span-2", 
    height: "h-[60vh] md:h-[90vh]" 
  },
  { 
    id: "02", 
    title: "THE PAVILION", 
    category: "Facade Design", 
    slug: "/portfolio", 
    img: "/assets/minnaro/p2.png", 
    span: "md:col-span-1 md:row-span-1", 
    height: "h-[50vh] md:h-[45vh]" 
  },
  { 
    id: "03", 
    title: "STONE RETREAT", 
    category: "Material Curation", 
    slug: "/portfolio", 
    img: "/assets/minnaro/p3.png", 
    span: "md:col-span-1 md:row-span-1", 
    height: "h-[50vh] md:h-[45vh]" 
  },
];

export default function ProjectGalleryAsymmetric() {
  return (
    <section className="w-full py-24 bg-earth-concrete">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-between items-end"
        >
          <h3 className="font-[Montserrat] font-bold text-3xl md:text-5xl uppercase text-earth-obsidian tracking-tighter">
            Selected <br className="hidden md:block" />Works
          </h3>
          <Link href="/portfolio" className="hidden md:inline-flex items-center text-earth-terracotta font-bold uppercase tracking-widest text-sm hover:text-earth-obsidian transition-colors">
            View All Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className={`group relative overflow-hidden block ${proj.span} ${proj.height}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Link href={proj.slug} className="block w-full h-full">
                {/* Image Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-[800ms] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${proj.img})` }}
                />
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-obsidian/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content Reveal on Hover */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end">
                  <span className="text-earth-terracotta font-bold text-xs uppercase tracking-[0.2em] mb-2">
                    {proj.id} / {proj.category}
                  </span>
                  <h4 className="text-white font-[Montserrat] font-bold text-2xl md:text-4xl uppercase tracking-tight">
                    {proj.title}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-12 md:hidden">
          <Link href="/portfolio" className="inline-flex items-center text-earth-terracotta font-bold uppercase tracking-widest text-sm border-b border-earth-terracotta pb-1">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
