"use client";
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainMenu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];

  const socialLinks = {
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#272727] shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <a href="/">
          <img src="/assets/Image/mp_logo.svg" className="w-56 h-16" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-white text-[15px] font-medium">
          {mainMenu.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-[#DEBB70] transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center gap-3 text-[#DEBB70]">
          <a href={socialLinks.facebook} target="_blank"><Facebook size={20} /></a>
          <a href={socialLinks.twitter} target="_blank"><Twitter size={20} /></a>
          <a href={socialLinks.instagram} target="_blank"><Instagram size={20} /></a>
          <a href={socialLinks.youtube} target="_blank"><Youtube size={20} /></a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-white p-2 border rounded-md border-gray-400"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* ===== MOBILE OFFCANVAS ===== */}
      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 shadow-lg transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md bg-gray-200"
        >
          <X size={20} />
        </button>

        {/* Links */}
        <div className="mt-10 space-y-4 text-gray-800 text-[16px] font-medium">
          {mainMenu.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="block hover:text-[#6BA642] transition"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-6 text-[#6BA642]">
          <a href={socialLinks.facebook} target="_blank"><Facebook size={22} /></a>
          <a href={socialLinks.twitter} target="_blank"><Twitter size={22} /></a>
          <a href={socialLinks.instagram} target="_blank"><Instagram size={22} /></a>
          <a href={socialLinks.youtube} target="_blank"><Youtube size={22} /></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
