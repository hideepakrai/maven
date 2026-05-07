"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Copy, 
  Trash2, 
  FileEdit,
  Globe,
  Lock,
  Clock,
  ArrowUpRight,
  ChevronRight,
  FileText
} from "lucide-react";
import Link from "next/link";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "Published" | "Draft" | "Scheduled" | "Archived";
  author: string;
  lastModified: string;
  seoScore: number;
}

const mockPages: Page[] = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    status: "Published",
    author: "Studio Admin",
    lastModified: "2024-05-01",
    seoScore: 92,
  },
  {
    id: "2",
    title: "About Our Studio",
    slug: "/about",
    status: "Published",
    author: "Studio Admin",
    lastModified: "2024-04-15",
    seoScore: 85,
  },
  {
    id: "3",
    title: "Sustainable Design Philosophy",
    slug: "/philosophy",
    status: "Draft",
    author: "Content Editor",
    lastModified: "2024-05-05",
    seoScore: 0,
  },
  {
    id: "4",
    title: "Luxury Residential Services",
    slug: "/services/residential",
    status: "Scheduled",
    author: "SEO Manager",
    lastModified: "2024-05-03",
    seoScore: 78,
  },
];

export default function PagesManagementPage() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em] bg-[#C25E4B]/5 px-3 py-1">
                Content Management
              </Badge>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-display font-black text-[#121212] uppercase tracking-tighter leading-none">
                Website <span className="text-gray-300">Pages</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium max-w-2xl leading-relaxed">
                Create and manage high-performance architectural landing pages with full SEO and editorial control.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/pages/new">
              <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-10 h-12 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
                <Plus size={16} className="mr-2" /> Create New Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Pages", value: pages.length, icon: FileText, color: "text-blue-500" },
            { label: "Published", value: pages.filter(p => p.status === "Published").length, icon: Globe, color: "text-green-500" },
            { label: "Drafts", value: pages.filter(p => p.status === "Draft").length, icon: Lock, color: "text-amber-500" },
            { label: "Scheduled", value: pages.filter(p => p.status === "Scheduled").length, icon: Clock, color: "text-[#C25E4B]" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white border-none shadow-sm rounded-3xl group hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform", stat.color.replace('text-', 'bg-').replace('500', '50'))}>
                    <stat.icon size={18} className={stat.color} />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                <p className="text-3xl font-display font-black text-[#121212] mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters & Search */}
        <Card className="bg-white border-none shadow-sm rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C25E4B] transition-colors" size={18} />
              <Input 
                placeholder="Search pages by title or slug..." 
                className="pl-12 h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#C25E4B]/10 text-xs font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-2xl h-12 px-6 border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#121212] transition-all">
                <Filter size={14} className="mr-2" /> Filter
              </Button>
              <Button variant="ghost" className="rounded-2xl h-12 px-6 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#121212]">
                Reset
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-none">
                <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Page Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">SEO Score</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Last Modified</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Author</TableHead>
                <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <TableCell className="py-7 pl-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#C25E4B]/10 group-hover:text-[#C25E4B] transition-all">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#121212]">{page.title}</p>
                        <p className="text-[11px] text-gray-400 font-medium mt-1">{page.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-none",
                      page.status === "Published" ? "bg-green-100 text-green-700" :
                      page.status === "Draft" ? "bg-gray-100 text-gray-500" :
                      page.status === "Scheduled" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            page.seoScore >= 90 ? "bg-green-500" : 
                            page.seoScore >= 70 ? "bg-amber-500" : 
                            "bg-red-500"
                          )} 
                          style={{ width: `${page.seoScore}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-black text-[#121212]">{page.seoScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-400 font-bold uppercase">{page.lastModified}</TableCell>
                  <TableCell className="text-xs text-gray-500 font-semibold">{page.author}</TableCell>
                  <TableCell className="text-right pr-10">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-[#C25E4B]/10 hover:text-[#C25E4B]">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                        <Copy size={16} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-gray-400 px-3 py-2">Editor Options</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                            <FileEdit size={16} className="mr-3 text-gray-400" />
                            <span className="text-xs font-bold">Edit Content</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                            <Globe size={16} className="mr-3 text-gray-400" />
                            <span className="text-xs font-bold">SEO Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-700 cursor-pointer">
                            <Trash2 size={16} className="mr-3" />
                            <span className="text-xs font-bold">Delete Page</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="p-8 bg-gray-50/50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing {filteredPages.length} of {pages.length} Pages</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100">Previous</Button>
              <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100">Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
