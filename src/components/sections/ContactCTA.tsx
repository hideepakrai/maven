"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="w-full py-32 md:py-48 bg-earth-obsidian text-earth-concrete relative overflow-hidden">
      
      {/* Background Graphic - Brutalist Line */}
      <div className="absolute top-0 right-10 w-px h-full bg-earth-concrete/10 hidden md:block" />
      <div className="absolute bottom-10 left-0 w-full h-px bg-earth-concrete/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-earth-terracotta font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6 block"
        >
          Let's Build The Unseen
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-[Montserrat] font-black text-5xl md:text-8xl lg:text-[8rem] uppercase tracking-tighter leading-[0.9] mb-12"
        >
          Have A <br className="md:hidden" />Project?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link 
            href="/contact" 
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-earth-concrete text-earth-obsidian font-[Montserrat] font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 hover:bg-earth-terracotta hover:text-white"
          >
            <span className="relative z-10">Start The Dialogue</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
