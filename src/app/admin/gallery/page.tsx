"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  MoreVertical, 
  Maximize2, 
  FolderPlus,
  Grid,
  List
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const galleryImages = [
  {
    id: 1,
    src: "/assets/Image/about-img.jpg",
    title: "Minimalist Hallway",
    category: "Interior",
    size: "1.2 MB",
    dimensions: "1920x1080",
  },
  {
    id: 2,
    src: "/assets/Image/about-image.jpg",
    title: "Urban Facade",
    category: "Exterior",
    size: "2.4 MB",
    dimensions: "2400x1600",
  },
  {
    id: 3,
    src: "/assets/Image/project-image2.png",
    title: "Commercial Lobby",
    category: "Commercial",
    size: "800 KB",
    dimensions: "1280x720",
  },
  {
    id: 4,
    src: "/assets/Image/project-image1.png",
    title: "Modern Kitchen",
    category: "Kitchen",
    size: "1.8 MB",
    dimensions: "2000x2000",
  },
  {
    id: 5,
    src: "/assets/Image/team-img.jpg",
    title: "Team Studio",
    category: "Office",
    size: "1.5 MB",
    dimensions: "1500x1000",
  },
  {
    id: 6,
    src: "/assets/Image/about-us-img.jpeg",
    title: "Architecture Concept",
    category: "Concept",
    size: "3.1 MB",
    dimensions: "3000x2000",
  },
];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
              Gallery Manager
            </h1>
            <p className="text-gray-500 mt-1">Organize and upload high-resolution media for your portfolio.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="bg-white border-gray-200">
               <FolderPlus size={16} className="mr-2" /> New Category
             </Button>
             <Button className="bg-[#121212] hover:bg-black text-white px-6">
               <Plus size={16} className="mr-2" /> Upload Media
             </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-10 h-10 bg-gray-50 border-gray-200 text-sm" placeholder="Find images..." />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
              <Button 
                variant={viewMode === "grid" ? "white" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className="w-8 h-8 rounded-md"
              >
                <Grid size={16} className={viewMode === "grid" ? "text-[#C25E4B]" : "text-gray-400"} />
              </Button>
              <Button 
                variant={viewMode === "list" ? "white" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode("list")}
                className="w-8 h-8 rounded-md"
              >
                <List size={16} className={viewMode === "list" ? "text-[#C25E4B]" : "text-gray-400"} />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-10 text-xs font-bold uppercase tracking-widest">
              <Filter size={14} className="mr-2" /> All Categories
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <Button variant="white" size="icon" className="w-9 h-9 rounded-full">
                     <Maximize2 size={16} className="text-[#121212]" />
                   </Button>
                   <Button variant="white" size="icon" className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 border-red-500">
                     <Trash2 size={16} className="text-white" />
                   </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#121212] truncate">{image.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical size={14} className="text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Edit Tags</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                  <Badge variant="secondary" className="text-[9px] uppercase font-black tracking-widest bg-gray-50 text-gray-500">
                    {image.category}
                  </Badge>
                  <span className="text-[10px] text-gray-300 font-medium ml-auto">
                    {image.size}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Upload Placeholder */}
          <button className="aspect-video sm:aspect-auto border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-100 transition-all group">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 group-hover:scale-110 transition-transform">
                <Plus size={24} className="text-[#C25E4B]" />
             </div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Add Image</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
