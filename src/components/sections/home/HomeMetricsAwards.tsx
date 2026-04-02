"use client";

import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { AwardItem, StatItem } from "@/lib/homepage-data";

type HomeMetricsAwardsProps = {
  stats: StatItem[];
  awards: AwardItem[];
};

export default function HomeMetricsAwards({ stats, awards }: HomeMetricsAwardsProps) {
  return (
    <section className="home-section-line bg-white py-14 md:py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="grid grid-cols-2 gap-6 border-t border-[#d7d7d7] pt-6 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <p className="font-display text-[2rem] font-medium tracking-[-0.04em] text-[#111111] md:text-[2.3rem]">
                {stat.value}
              </p>
              <p className="font-editorial mt-2 text-[10px] uppercase tracking-[0.24em] text-[#7a7a7a] md:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[160px_minmax(0,1fr)]">
          <motion.div variants={fadeInUp}>
            <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
              Awards
            </p>
          </motion.div>

          <div className="border-y border-[#d7d7d7]">
            {awards.map((award) => (
              <motion.div
                key={`${award.year}-${award.title}`}
                variants={fadeInUp}
                className="grid gap-3 border-b border-[#d7d7d7] py-4 text-sm last:border-b-0 md:grid-cols-[110px_minmax(0,1fr)_220px]"
              >
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                  {award.year}
                </p>
                <p className="font-editorial text-sm text-[#141414]">{award.title}</p>
                <p className="font-editorial text-sm text-[#555555] md:text-right">{award.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
