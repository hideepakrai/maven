"use client";

import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { LogoItem } from "@/lib/homepage-data";

type HomeLogoStripProps = {
  items: LogoItem[];
};

export default function HomeLogoStrip({ items }: HomeLogoStripProps) {
  return (
    <section className="bg-[#171513] py-14 text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-7xl px-6 md:px-10"
      >
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-editorial text-xs uppercase tracking-[0.34em] text-[#c9b094]">Collaborations</p>
            <p className="font-display mt-3 text-3xl text-white md:text-4xl">
              Trusted by makers, consultants, and specialist partners.
            </p>
          </div>
          <p className="font-editorial max-w-lg text-sm leading-7 text-white/62 md:text-base">
            The studio works closely with fabrication, lighting, landscape, and material teams to carry intent all the way into the finished space.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8">
          {items.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              className="flex min-h-24 items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.03] p-5"
            >
              <img
                src={item.src}
                alt={item.name}
                className="max-h-8 w-auto opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
