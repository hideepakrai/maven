"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { TestimonialContent } from "@/lib/homepage-data";

type HomeTestimonialProps = {
  content: TestimonialContent;
};

export default function HomeTestimonial({ content }: HomeTestimonialProps) {
  return (
    <section className="home-section-line bg-[#efe6db] py-24 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center"
      >
        <div className="space-y-6">
          <motion.p
            variants={fadeInUp}
            className="font-editorial text-xs uppercase tracking-[0.34em] text-[#9a7d63]"
          >
            Testimonial
          </motion.p>
          <motion.blockquote
            variants={fadeInUp}
            className="font-display max-w-4xl text-4xl leading-[1.02] tracking-[-0.03em] text-[#241e19] md:text-6xl"
          >
            "{content.quote}"
          </motion.blockquote>
          <motion.div variants={fadeInUp}>
            <p className="font-editorial text-sm uppercase tracking-[0.24em] text-[#7a6b5d]">{content.name}</p>
            <p className="font-editorial mt-2 text-base text-[#544941]">{content.role}</p>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-[18rem] overflow-hidden rounded-[32px] border border-[#d2c0ad] bg-white">
          <div className="relative aspect-[0.82]">
            <Image
              src={content.image}
              alt={`${content.name} portrait`}
              fill
              sizes="(max-width: 1024px) 70vw, 22vw"
              className="object-cover object-center grayscale"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
