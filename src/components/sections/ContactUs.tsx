"use client";
import React from "react";
import { MapPin, Mail, Globe } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      className="relative bg-white py-20"
      // style={{ backgroundBlendMode: "multiply" }}
    >
      <div className="absolute inset-0 bg-[#fff]/80"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-12">
          We’d love to hear from you. Whether you're interested in our work, need support, or just want to connect — reach out below.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Column */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#69a242]" />
              <div>
                <h4 className="font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">123 Rural Road, Thar Desert Region, Rajasthan, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#69a242]" />
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">info@gravisindia.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-[#69a242]" />
              <div>
                <h4 className="font-semibold text-gray-900">Website</h4>
                <p className="text-gray-600">www.gravisindia.org</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <form className="space-y-6 bg-white rounded-xl p-8 shadow-lg">
            <div>
              <label className="block text-gray-800 mb-2 font-medium">Your Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#69a242] focus:outline-none"
                placeholder="Enter your name"
                 style={{borderRadius:"6px"}}
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-2 font-medium">Your Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#69a242] focus:outline-none"
                placeholder="Enter your email"
                 style={{borderRadius:"6px"}}
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-2 font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#69a242] focus:outline-none"
                placeholder="Write your message…"
                 style={{borderRadius:"6px"}}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#69a242] hover:bg-[#5e8a36] text-white font-semibold py-3  transition-colors duration-300"
              style={{borderRadius:"6px"}}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
