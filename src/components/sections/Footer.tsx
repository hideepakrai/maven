"use client";
import React from "react";
// Menu aur X ki zaroorat nahi hai footer mein, isliye hata diye
import footerLogo from "../../../public/assets/Image/logo-footer.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaHeadset,
} from "react-icons/fa";

/* ---------------- FOOTER ---------------- */
const Footer = () => {
  return (
    // 🎨 CHANGES: Background color aur naye classes 'animated-bg-container' aur 'pattern-overlay'
    <footer className="relative bg-[#1a1a1a] text-gray-300 overflow-hidden">
      {/* 🆕 Animated Background Layer 1: Dots */}
      <div className="absolute inset-0 z-0 opacity-10 animated-dots-pattern"></div>
      {/* 🆕 Animated Background Layer 2: Lines */}
      <div className="absolute inset-0 z-0 opacity-5 animated-lines-pattern"></div>
      {/* 🆕 Animated Background Layer 3: Fading Grid (for subtle depth) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] animated-grid-pattern"></div>


      {/* Content ab z-index: 10 ke saath upar aayega */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div>
          {/* Logo ko image se replace kar diya jo aapne image mein dikhaya hai */}
          {/* Yahan aapka 'UB Architects' logo aayega */}
          <img
            src="/assets/Image/mp_logo.svg"  // Agar Next.js Image component use nahi kar rahe to .src lagana padega
            alt="UB Architects Logo"
            className="w-56 mb-4" // Logo size adjust kiya
          />
          <p className="mt-4 text-gray-400 leading-relaxed text-base">
            Enriching Lives, One Design at a Time
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-700 text-gray-300 hover:bg-[#DEBB70] hover:text-gray-900 p-2 rounded-full transition-all duration-300"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links (Content updated for Architects) */}
        <div>
          <h4 className="text-xl font-semibold text-[#DEBB70] mb-5 border-l-4 border-[#DEBB70] pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-400">
            {[
              "Our Philosophy",
              "Projects",
              "Services",
              "Careers",
              "Contact",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[#DEBB70] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services / Expertise */}
        <div>
          <h4 className="text-xl font-semibold mb-5 text-[#DEBB70] border-l-4 border-[#DEBB70] pl-3">
            Expertise
          </h4>
          <ul className="space-y-3 text-gray-400">
            {[
              "Residential Design",
              "Commercial Spaces",
              "Urban Planning",
              "Interior Design",
              "Sustainable Architecture",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[#DEBB70] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact (Content updated as per image) */}
        <div>
          <h4 className="text-xl font-semibold mb-5 text-[#DEBB70] border-l-4 border-[#DEBB70] pl-3">
            Contact
          </h4>

          {/* Call */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">CALL</p>
            <a href="tel:+912226477036" className="text-gray-300 block hover:text-[#DEBB70] transition-colors">
              +91 22 1122 8056
            </a>
          </div>

          {/* Write */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">WRITE</p>
            <a href="mailto:info@ubarch.com" className="text-gray-300 block hover:text-[#DEBB70] transition-colors">
              maven@gmail.com
            </a>
          
          </div>

          {/* Visit */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">VISIT</p>
            <address className="text-gray-300 not-italic">
             #105 Mohan Nagar, Jaipur
             </address>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 w-11/12 mx-auto relative z-10" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center relative z-10 text-sm text-gray-500">
        <p className="mb-2 md:mb-0">
          © ALL RIGHTS RESERVED TO MAVEN PROJECTS | DESIGNED BY <span className="text-gray-400"><a href="https://codifiedweb.com/"> CODIFIED</a></span>
        </p>
        {/* TO TOP button jaise image mein hai */}
        <a href="#top" className="flex items-center gap-1 text-[#DEBB70] hover:text-white transition-colors">
          <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          TO TOP
        </a>
      </div>
    </footer>
  );
};

/* ---------------- LAYOUT WRAPPER ---------------- */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white text-gray-900">
      {children} {/* Children ko render karna zaroori hai */}
      <Footer />
    </div>
  );
}