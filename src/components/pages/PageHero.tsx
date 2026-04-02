"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryCta,
}: PageHeroProps) {
  return (
    <section className="border-b border-[#d7d7d7] bg-white pt-24 md:pt-28">
      <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-6 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.75fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
              {eyebrow}
            </p>
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#111111]">
              {title}
            </h1>
            <p className="font-editorial mt-6 max-w-2xl text-sm leading-7 text-[#555555] md:text-base">
              {description}
            </p>
            {primaryCta ? (
              <div className="mt-8">
                <Link
                  href={primaryCta.href}
                  className="inline-flex w-full items-center justify-center bg-[#6c63ff] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#584cf6] sm:w-fit"
                >
                  {primaryCta.label}
                </Link>
              </div>
            ) : null}
          </motion.div>

          {image ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="relative overflow-hidden border border-[#d7d7d7] bg-[#ece8e2]"
            >
              <div className="relative aspect-[1.18]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
