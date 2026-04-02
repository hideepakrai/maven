"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { fadeInUp, stagger } from "@/components/sections/anim";
import type { ProcessStep } from "@/lib/homepage-data";

type HomeProcessProps = {
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  steps: ProcessStep[];
};

function ProcessWireframe() {
  return (
    <svg
      viewBox="0 0 520 420"
      className="h-full w-full text-[#1a1a1a]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M83 281L261 173L446 250L263 357L83 281Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M83 281V174L263 67V357" stroke="currentColor" strokeWidth="1.1" />
      <path d="M263 67L446 144V250" stroke="currentColor" strokeWidth="1.1" />
      <path d="M144 247V163L323 86L401 119V207" stroke="currentColor" strokeWidth="1.1" strokeDasharray="5 5" />
      <path d="M144 247L323 343L401 301V207" stroke="currentColor" strokeWidth="1.1" strokeDasharray="5 5" />
      <path d="M214 203V296" stroke="currentColor" strokeWidth="1.1" />
      <path d="M214 203L350 124" stroke="currentColor" strokeWidth="1.1" />
      <path d="M214 296L350 214" stroke="currentColor" strokeWidth="1.1" />
      <path d="M350 124V214" stroke="currentColor" strokeWidth="1.1" />
      <path d="M111 145L291 251" stroke="currentColor" strokeWidth="1.1" strokeDasharray="5 5" />
      <path d="M191 110L371 216" stroke="currentColor" strokeWidth="1.1" strokeDasharray="5 5" />
      <ellipse cx="150" cy="372" rx="33" ry="10" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="261" cy="392" rx="43" ry="12" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="381" cy="367" rx="33" ry="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function HomeProcess({ intro, steps }: HomeProcessProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="process"
      className="home-section-line scroll-mt-24 bg-[#f4f4f2] py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="mb-10 border-t border-[#d7d7d7] pt-6">
          <motion.p
            variants={fadeInUp}
            className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs"
          >
            {intro.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-4 max-w-5xl text-[clamp(2rem,4.7vw,3.45rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#141414]"
          >
            {intro.title}
          </motion.h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.85fr)] lg:items-center">
          <div>
            <motion.p
              variants={fadeInUp}
              className="font-editorial mb-8 max-w-2xl text-sm leading-7 text-[#555555] md:text-base"
            >
              {intro.description}
            </motion.p>

            <div className="space-y-0 border-y border-[#d7d7d7]">
              {steps.map((step, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div key={step.step} variants={fadeInUp} className="border-b border-[#d7d7d7] last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <div>
                        <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#7d7d7d] md:text-xs">
                          {step.step}
                        </p>
                        <h3 className="font-display mt-2 text-[1.3rem] font-medium text-[#141414] md:text-[1.5rem]">
                          {step.title}
                        </h3>
                      </div>
                      <Plus
                        className={`h-4 w-4 text-[#141414] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        strokeWidth={1.5}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-editorial max-w-xl text-sm leading-7 text-[#555555] md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div variants={fadeInUp} className="mx-auto w-full max-w-[520px]">
            <ProcessWireframe />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
