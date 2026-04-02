"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroMinnaro() {
  return (
    <section className="relative w-full h-[90vh] md:h-screen flex items-center bg-earth-concrete overflow-hidden">
      {/* Background Image with slow zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{ backgroundImage: "url('/assets/minnaro/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-obsidian/60 to-transparent" />
      </motion.div>

      {/* Extreme Typography Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-20 md:pb-32">
        <motion.h1
          className="text-earth-concrete font-[Montserrat] font-black text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter uppercase uppercase mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          Defining
          <br /> Spaces
        </motion.h1>

        {/* Asymmetrical Box */}
        <motion.div
          className="self-end bg-earth-concrete text-earth-obsidian p-6 md:p-10 max-w-md border-l-4 border-earth-terracotta translate-y-12 md:translate-y-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-semibold text-lg md:text-2xl mb-2 font-[Montserrat] uppercase tracking-widest text-earth-terracotta">
            Refining Life
          </p>
          <p className="text-sm md:text-base font-[Inter] leading-relaxed opacity-90">
            A bespoke architectural firm curating minimalist, robust geometries that harmonize with the raw earth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
