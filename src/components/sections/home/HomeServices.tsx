"use client";

import { House, Ruler, Sofa } from "lucide-react";
import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { ServiceItem } from "@/lib/homepage-data";

type HomeServicesProps = {
  items: ServiceItem[];
};

const icons = {
  house: House,
  ruler: Ruler,
  sofa: Sofa,
};

export default function HomeServices({ items }: HomeServicesProps) {
  return (
    <section
      id="services"
      className="home-section-line scroll-mt-24 bg-white py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
            Our services
          </p>
        </motion.div>

        <div className="grid gap-8 border-t border-[#d7d7d7] pt-6 md:grid-cols-3 md:gap-6">
          {items.map((item) => {
            const Icon = icons[item.icon];

            return (
              <motion.article
                key={item.index}
                variants={fadeInUp}
                className="min-h-[260px] border border-[#dfdfdf] p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-7 w-7 text-[#141414]" strokeWidth={1.25} />
                  <span className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#8a8a8a]">
                    {item.index}
                  </span>
                </div>
                <p className="font-editorial mt-10 text-[10px] uppercase tracking-[0.24em] text-[#7c7c7c]">
                  {item.linkLabel}
                </p>
                <h3 className="font-display mt-4 text-[1.6rem] font-medium leading-tight text-[#141414]">
                  {item.title}
                </h3>
                <p className="font-editorial mt-4 max-w-sm text-sm leading-7 text-[#555555]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
