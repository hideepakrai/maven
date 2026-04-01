"use client";

// import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Ek ke baad ek items animate honge
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="w-full bg-[#282828] text-gray-300 py-20 md:py-28" // Dark background color
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          
          {/* 🔹 Left Column (Text) */}
          <motion.div className="lg:col-span-2" variants={textVariants}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
              ABOUT <span className="text-[#DEBB70]"> MAVEN</span> 
              {/* 'MQA' ke liye text-amber-400 use kiya hai, aap change kar sakte hain */}
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                Every structure however large or small is an entity with its own
                characteristics and interactions generating emotions and
                experiences like a living being.
              </p>
              <p>
                We work on: Playing with form, space, function and colours to
                create magnificent possibilities.
              </p>
              <p>
                Our Studio is centered on aesthetics combined with site specific
                design, innovation and proven building techniques executed by
                experienced professionals.
              </p>
            </div>
          </motion.div>

          {/* 🔹 Right Column (Image with Overlay) */}
          <motion.div
            className="lg:col-span-3 relative"
            variants={imageVariants}
          >
            {/* Yeh div 'frame' banata hai jiske andar image aur box hain.
              Padding (p-12) se image aur box ke beech space banta hai.
            */}
            <div className="relative p-12 sm:p-16">
              {/* ⚠️ Zaroori: Yahaan apni team ki B&W image ka path daalein */}
              <div >
              <img
                src="/assets/Image/about-img.jpg" 
                alt="MQA Team"
              
                className="w-full h-1/2 object-cover grayscale" // Grayscale filter
              />
              </div>
              
              {/* White Overlay Box */}
              <div className="absolute bottom-0 right-0 bg-white p-6 md:p-8 shadow-xl">
                <h3 className="text-gray-900 text-lg sm:text-xl font-semibold uppercase tracking-wider leading-tight">
                  Over 30 Years of
                  <br />
                  Experience in
                  <br />
                  Architecture
                </h3>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
}