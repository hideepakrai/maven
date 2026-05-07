"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarBrandProps {
  isCollapsed: boolean;
}

export function SidebarBrand({ isCollapsed }: SidebarBrandProps) {
  return (
    <Link 
      href="/admin" 
      className={cn(
        "flex h-20 items-center transition-all duration-500 px-6",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      <div className="flex items-center gap-3 group cursor-pointer">
        {/* Professional Square Icon */}
        <div className="w-9 h-9 bg-[#C25E4B] rounded-xl flex items-center justify-center font-display font-black text-white shadow-2xl shadow-[#C25E4B]/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          M
        </div>

        {/* Elegant Identity Text */}
        {!isCollapsed && (
          <div className="flex flex-col transition-all duration-500 animate-in fade-in slide-in-from-left-2">
            <h1 className="text-[15px] font-display font-black tracking-[0.15em] uppercase text-white leading-none">
              Maven
            </h1>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#d97757] mt-1.5 opacity-80">
              Studio
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
