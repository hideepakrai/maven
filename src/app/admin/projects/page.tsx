"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  Download,
  Calendar,
  Users,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Briefcase,
  FileText,
  DollarSign
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

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  location?: string;
  status: "Planning" | "Design" | "Construction" | "Completed" | "In Progress";
  progress: number;
  budget: string;
  deadline: string;
  image: string;
  lastUpdated?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Golden Gate Hotel",
    client: "West Coast Hospitality",
    category: "Hospitality",
    status: "Construction",
    progress: 65,
    budget: "$2.4M",
    deadline: "Dec 2024",
    image: "https://images.unsplash.com/photo-1541976590-7139414bc5c6?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "2",
    name: "Nexus Office Hub",
    client: "Nexus Group",
    category: "Commercial",
    status: "Completed",
    progress: 100,
    budget: "$1.8M",
    deadline: "Mar 2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "3",
    name: "Lakeside Retreat",
    client: "Private Owner",
    category: "Residential",
    status: "Planning",
    progress: 15,
    budget: "$950k",
    deadline: "Aug 2025",
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=400&h=300"
  }
];

export default function ProjectsManagementPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em] bg-[#C25E4B]/5 px-3 py-1">
                Portfolio Operations
              </Badge>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-display font-black text-[#121212] uppercase tracking-tighter leading-none">
                Studio <span className="text-gray-300">Portfolio</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium max-w-2xl leading-relaxed">
                Management of active high-end architectural builds. Track production status, client budgets, and production timelines.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-gray-100 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] transition-all">
              <Download size={14} className="mr-2" /> Export Portfolio
            </Button>
            <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-10 h-12 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              <Plus size={16} className="mr-2" /> Initialize Project
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Planning", "Design", "Construction", "Completed"].map(filter => (
                <Button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant="ghost" 
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest h-9 px-5 rounded-xl transition-all",
                    activeFilter === filter ? "bg-[#121212] text-white" : "text-gray-400 hover:text-[#121212] hover:bg-gray-100"
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C25E4B] transition-colors" size={16} />
              <Input placeholder="Search projects..." className="pl-12 h-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white text-xs font-semibold" />
            </div>
          </div>
          
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-none">
                <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Detail</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Phase</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Budget</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Deadline</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 w-[200px]">Production</TableHead>
                <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow key={project.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <TableCell className="py-7 pl-10">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-[#C25E4B]/20 transition-all shadow-sm">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#121212] group-hover:text-[#C25E4B] transition-colors">{project.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{project.client}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-none",
                      project.status === "Completed" ? "bg-green-100 text-green-700" : 
                      project.status === "Planning" ? "bg-amber-100 text-amber-700" : 
                      project.status === "Design" ? "bg-[#C25E4B]/10 text-[#C25E4B]" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-black text-[#121212]">{project.budget}</TableCell>
                  <TableCell className="text-xs text-gray-400 font-bold uppercase">{project.deadline}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-[#121212]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden p-[1px]">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            project.progress === 100 ? "bg-green-500" : "bg-[#121212] group-hover:bg-[#C25E4B]"
                          )} 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-[#C25E4B]/10 hover:text-[#C25E4B]">
                          <ArrowUpRight size={18} />
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                            <FileText size={16} className="mr-3 text-gray-400" />
                            <span className="text-xs font-bold text-[#121212]">Project Documents</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                            <DollarSign size={16} className="mr-3 text-gray-400" />
                            <span className="text-xs font-bold text-[#121212]">Invoices & Billing</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-700 cursor-pointer">
                            <Trash2 size={16} className="mr-3" />
                            <span className="text-xs font-bold">Archive Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
}
