"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { JournalItem } from "@/lib/homepage-data";

type HomeJournalProps = {
  items: JournalItem[];
};

export default function HomeJournal({ items }: HomeJournalProps) {
  return (
    <section
      id="journal"
      className="home-section-line scroll-mt-24 bg-white py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="mb-10 flex flex-col gap-5 border-t border-[#d7d7d7] pt-6 md:flex-row md:items-end md:justify-between">
          <motion.div variants={fadeInUp}>
            <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
              Media
            </p>
            <h2 className="font-display mt-3 text-[2rem] font-medium tracking-[-0.04em] text-[#141414] md:text-[2.4rem]">
              Media and press releases
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border-b border-[#111111] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111]"
            >
              More
              <span aria-hidden="true">/</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <motion.article key={item.title} variants={fadeInUp} className="group">
              <Link href={item.href} className="block">
                <div className="relative aspect-[0.95] overflow-hidden bg-[#ece8e2]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border-b border-[#d7d7d7] py-4">
                  <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
                    {item.meta}
                  </p>
                  <h3 className="font-display mt-3 text-[1.25rem] font-medium leading-snug text-[#141414]">
                    {item.title}
                  </h3>
                  <p className="font-editorial mt-3 text-sm leading-7 text-[#555555]">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
