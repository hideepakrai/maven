"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const AboutUsPage = () => {
  return (
    <div className="bg-[#0F0F0F] text-[#E9E9E9]">

      {/* ---------------- HERO ---------------- */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/Image/about-us-img.jpeg')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 h-full flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-300">
            Crafting timeless architecture with purpose
          </p>
        </motion.div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className=" px-6 md:px-10 py-20 bg-[#272727]">
        <div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            <motion.img
                src="/assets/Image/about-img.jpg"
                className="rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
            />

            <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-semibold mb-6">Who We Are</h2>
                <p className="text-lg mb-4 leading-relaxed">
                We are an award-winning architectural practice committed to
                modern, functional and sustainable designs.
                </p>
                <p className="text-lg leading-relaxed">
                Our studio combines innovation, technology and craft to create
                spaces that respond to people and place.
                </p>
            </motion.div>

            </div>
        </div>
      </section>

      {/* ---------------- PHILOSOPHY ---------------- */}
      <section className="bg-[#272727] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-semibold mb-16"
          >
            Our Philosophy
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Simplicity & Purpose",
              "Human-Centric Design",
              "Sustainable Development"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-500 rounded-xl hover:border-[#C7A869] transition"
              >
                <h3 className="text-xl font-medium mb-3">{item}</h3>
                <p className="text-gray-400 text-sm">
                  We craft thoughtful designs that stay relevant for decades.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="py-20 bg-[#151515]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10 text-center">

          {[
            { num: "12+", label: "Years Experience" },
            { num: "150+", label: "Projects Completed" },
            { num: "30+", label: "Awards Won" },
            { num: "40+", label: "Cities Worked" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold text-[#C7A869]">{stat.num}</h3>
              <p className="mt-3 text-gray-400">{stat.label}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ---------------- TEAM SECTION ---------------- */}
      <section className=" px-6 md:px-10 py-20 bg-[#272727]">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl mb-14 font-semibold text-center">Our Team</h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={`/assets/Image/team-img.jpg`}
                  className="w-full grayscale group-hover:grayscale-0 transition duration-500"
                />
              </div>
              <h3 className="text-xl mt-4 font-medium">
                Architect {num}
              </h3>
              <p className="text-gray-400 text-sm">Senior Architect</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-[#151515] py-20 text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          className="text-4xl font-semibold"
        >
          Let’s Build Something Extraordinary
        </motion.h2>
      </section>
    </div>
  );
};

export default AboutUsPage;
