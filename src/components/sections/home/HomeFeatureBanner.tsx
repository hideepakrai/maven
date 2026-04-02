"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInUp } from "@/components/sections/anim";
import type { FeatureBanner } from "@/lib/homepage-data";

type HomeFeatureBannerProps = {
  content: FeatureBanner;
};

export default function HomeFeatureBanner({ content }: HomeFeatureBannerProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden border border-[#d7d7d7] bg-[#ece8e2]"
        >
          <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src={content.image}
                alt={content.title}
                fill
                sizes="(max-width: 768px) 100vw, 82vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.05)_0%,rgba(12,12,12,0.18)_100%)]" />
            </div>
            <div className="relative hidden border-l border-white/30 md:block">
              {content.secondaryImage ? (
                <Image
                  src={content.secondaryImage}
                  alt={`${content.title} detail`}
                  fill
                  sizes="220px"
                  className="object-cover object-center"
                />
              ) : null}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-white/50 bg-black/10 px-5 py-5 backdrop-blur-[2px] md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/85 md:text-xs">
                  {content.eyebrow}
                </p>
                <h2 className="font-display mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                  {content.title}
                </h2>
              </div>
              <Link
                href={content.cta.href}
                className="inline-flex w-full items-center justify-center border border-white/70 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
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
