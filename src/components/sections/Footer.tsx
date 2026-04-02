"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import {
  footerContactActions,
  footerQuickLinks,
  siteContact,
  socialLinks,
} from "@/lib/homepage-data";

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#d7d7d7] bg-white text-[#111111]">
      <div className="mx-auto grid max-w-[1500px] gap-0 md:grid-cols-4">
        <div className="border-b border-[#d7d7d7] px-5 py-8 md:min-h-[220px] md:border-r md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            Maven Projects
          </p>
          <div className="mt-6 space-y-3">
            <a href={siteContact.emailHref} className="font-editorial block text-sm text-[#111111]">
              {siteContact.emailLabel}
            </a>
            <a href={siteContact.phoneHref} className="font-editorial block text-sm text-[#111111]">
              {siteContact.phoneLabel}
            </a>
            <p className="font-editorial max-w-[220px] text-sm leading-7 text-[#555555]">
              {siteContact.address}
            </p>
          </div>
        </div>

        <div className="border-b border-[#d7d7d7] px-5 py-8 md:min-h-[220px] md:border-r md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            Pages
          </p>
          <div className="mt-6 space-y-3">
            {footerQuickLinks.map((item) => (
              <Link key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-b border-[#d7d7d7] px-5 py-8 md:flex md:min-h-[220px] md:border-r md:flex-col md:items-center md:justify-center md:px-8">
          <img
            src="/assets/Image/mp-dark-logo.svg"
            alt="Maven Projects"
            className="h-10 w-auto"
          />
          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.label as keyof typeof socialIcons];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="text-[#111111] transition duration-300 hover:text-[#6c63ff]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-b border-[#d7d7d7] px-5 py-8 md:min-h-[220px] md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            Contact
          </p>
          <div className="mt-6 space-y-3">
            {footerContactActions.map((item) =>
              item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? (
                <a key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111]">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111]">
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-5 text-[10px] uppercase tracking-[0.22em] text-[#777777] md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-editorial">Copyright 2026 Maven Projects</p>
        <Link href="#hero" className="font-editorial text-[#111111]">
          Back to top
        </Link>
      </div>
    </footer>
  );
}
