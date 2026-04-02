"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSnippet() {
  return (
    <section className="w-full py-24 md:py-40 bg-earth-concrete text-earth-obsidian selection:bg-earth-terracotta selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
        
        {/* Left Side: Bold Statement (40%) */}
        <motion.div 
          className="md:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-[Montserrat] font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight">
            We <span className="text-earth-terracotta">Build</span><br/> The Future.
          </h2>
        </motion.div>

        {/* Right Side: Philosophy (60%) */}
        <motion.div 
          className="md:col-span-7 flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-2xl font-[Inter] font-light leading-relaxed">
            Architecture is not just about erecting walls; it is about capturing space, manipulating light, and grounding humans to their environment. Our practice embraces the silence of minimalism and the strength of structural brutalism.
          </p>
          
          <Link href="/about" className="inline-flex w-fit items-center font-[Montserrat] font-bold uppercase tracking-widest text-sm border-b-2 border-earth-obsidian pb-1 hover:text-earth-terracotta hover:border-earth-terracotta transition-colors duration-300">
            Discover Our Ethos
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
