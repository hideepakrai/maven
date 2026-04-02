"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInUp } from "@/components/sections/anim";
import type { FeatureBanner } from "@/lib/homepage-data";

type HomeClosingCtaProps = {
  content: FeatureBanner;
};

export default function HomeClosingCta({ content }: HomeClosingCtaProps) {
  return (
    <section className="bg-white pt-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[1500px]"
      >
        <motion.div variants={fadeInUp} className="relative min-h-[300px] overflow-hidden md:min-h-[420px]">
          <Image
            src={content.image}
            alt={content.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.05)_0%,rgba(11,11,11,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-white/60 bg-black/10 px-5 py-6 backdrop-blur-[2px] md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/88 md:text-xs">
                  {content.eyebrow}
                </p>
                <h2 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                  {content.title}
                </h2>
              </div>
              <Link
                href={content.cta.href}
                className="inline-flex w-full items-center justify-center border border-white/75 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
              >
                {content.cta.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
