"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  MessageSquare, 
  Briefcase, 
  Clock, 
  ArrowRight,
  Download,
  Plus,
  Calendar,
  Users,
  ImageIcon,
  BookOpen,
  MoreHorizontal,
  ChevronRight,
  MapPin,
  Star,
  Activity,
  Zap,
  Filter,
  Search,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import SummaryCards from "@/components/admin/SummaryCards";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Input } from "@/components/ui/input";

// Mock data for analytics
const revenueData = [
  { name: "Jan", total: 45000 },
  { name: "Feb", total: 52000 },
  { name: "Mar", total: 48000 },
  { name: "Apr", total: 61000 },
  { name: "May", total: 55000 },
  { name: "Jun", total: 67000 },
  { name: "Jul", total: 72000 },
  { name: "Aug", total: 85000 },
];

const projectPipeline = [
  { phase: "Planning", count: 8, color: "bg-amber-500", textColor: "text-amber-500", progress: 40 },
  { phase: "Design", count: 12, color: "bg-[#C25E4B]", textColor: "text-[#C25E4B]", progress: 65 },
  { phase: "Construction", count: 6, color: "bg-blue-500", textColor: "text-blue-500", progress: 30 },
  { phase: "Completion", count: 4, color: "bg-green-500", textColor: "text-green-500", progress: 20 },
];

const recentActivity = [
  {
    id: 1,
    type: "inquiry",
    title: "New inquiry from Sarah Jenkins",
    description: "Interested in residential interior design for Manhattan loft.",
    time: "2 hours ago",
    status: "New",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    type: "project",
    title: "Project 'Skyline Villa' updated",
    description: "Added 4 new high-resolution renders to the gallery.",
    time: "5 hours ago",
    status: "Updated",
    icon: ImageIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    id: 3,
    type: "appointment",
    title: "Client meeting scheduled",
    description: "Consultation with Nexus Group at 3:00 PM tomorrow.",
    time: "8 hours ago",
    status: "Scheduled",
    icon: Calendar,
    color: "text-[#C25E4B]",
    bgColor: "bg-[#C25E4B]/10"
  },
  {
    id: 4,
    type: "blog",
    title: "Gallery uploaded",
    description: "New collection 'Modern Minimalist' is now live.",
    time: "1 day ago",
    status: "Published",
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
];

const upcomingAppointments = [
  {
    id: 1,
    client: "Robert Chen",
    type: "Client Consultation",
    time: "Today, 4:30 PM",
    location: "Studio A",
    status: "Confirmed"
  },
  {
    id: 2,
    client: "Aria Estates",
    type: "Site Visit",
    time: "Tomorrow, 10:00 AM",
    location: "Malibu Site",
    status: "Pending"
  },
  {
    id: 3,
    client: "The Design Collective",
    type: "Design Meeting",
    time: "May 10, 2:00 PM",
    location: "Remote/Zoom",
    status: "Confirmed"
  }
];

const latestProjects = [
  {
    id: 1,
    name: "Golden Gate Hotel",
    client: "West Coast Hospitality",
    status: "In Progress",
    budget: "$2.4M",
    deadline: "Dec 2024",
    progress: 65,
    image: "https://images.unsplash.com/photo-1541976590-7139414bc5c6?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 2,
    name: "Nexus Office Hub",
    client: "Nexus Group",
    status: "Completed",
    budget: "$1.8M",
    deadline: "Mar 2024",
    progress: 100,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 3,
    name: "Lakeside Retreat",
    client: "Private Owner",
    status: "Planning",
    budget: "$950k",
    deadline: "Aug 2025",
    progress: 15,
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 4,
    name: "Urban Loft",
    client: "Sarah Jenkins",
    status: "In Progress",
    budget: "$420k",
    deadline: "Oct 2024",
    progress: 40,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export default function AdminDashboardPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20 relative">
        {/* Enterprise Hero Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-gray-100 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em] bg-[#C25E4B]/5 px-3 py-1">
                Operational Intelligence
              </Badge>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{currentDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-display font-black text-[#121212] uppercase tracking-tighter leading-none">
                Studio <span className="text-gray-300">Operations</span> Hub
              </h1>
              <p className="text-gray-500 text-sm font-medium max-w-2xl leading-relaxed">
                Monitor projects, studio performance, consultations, and operational workflow across all global workspaces.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4 text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-[#121212]">Live Synchronization</span>
              </div>
            </div>
            <Button variant="outline" className="bg-white border-gray-200 text-xs font-black uppercase tracking-widest px-8 h-12 rounded-2xl hover:bg-gray-50 hover:shadow-xl transition-all">
              <Download size={14} className="mr-2" /> Export Dataset
            </Button>
            <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-10 h-12 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              <Plus size={16} className="mr-2" /> Initialize Project
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <SummaryCards />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Revenue Analytics - Enhanced Charts */}
          <Card className="xl:col-span-8 bg-white border-none shadow-2xl shadow-gray-200/40 rounded-3xl overflow-hidden group">
            <CardHeader className="p-8 border-b border-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">
                    Revenue Growth
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-xs mt-1 font-semibold uppercase tracking-widest">Financial Performance Analysis</CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl">
                  {["7D", "1M", "1Y"].map(range => (
                    <Button key={range} size="sm" variant="ghost" className={cn(
                      "text-[10px] font-black uppercase h-8 px-4 rounded-xl transition-all",
                      range === "1M" ? "bg-white shadow-md text-[#121212]" : "text-gray-400"
                    )}>
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex items-end gap-10 mb-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Revenue</p>
                  <p className="text-4xl font-display font-black text-[#121212]">$842,500</p>
                </div>
                <div className="flex items-center gap-2 mb-2 text-green-600">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-black">
                    <ArrowUpRight size={12} />
                    24.5%
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">vs Last Month</span>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenuePremium" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C25E4B" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#C25E4B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F9FAFB" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      dy={15}
                      fontFamily="Inter"
                      fontWeight={600}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value/1000}k`}
                      fontFamily="Inter"
                      fontWeight={600}
                    />
                    <Tooltip 
                      cursor={{ stroke: '#C25E4B', strokeWidth: 1.5, strokeDasharray: '6 6' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#121212] p-4 rounded-2xl shadow-2xl border border-white/10">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{payload[0].payload?.name}</p>
                              <p className="text-xl font-display font-black text-white">${payload[0].value?.toLocaleString() ?? "0"}</p>
                              <div className="flex items-center gap-1 mt-2 text-[#C25E4B] text-[10px] font-bold">
                                <TrendingUp size={10} />
                                +12% Growth
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#C25E4B" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorRevenuePremium)" 
                      animationDuration={2500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Pipeline - Status Colors & Interactive */}
          <Card className="xl:col-span-4 bg-[#121212] text-white border-none shadow-2xl shadow-black/20 rounded-3xl flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C25E4B]/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
            
            <CardHeader className="p-8 pb-4 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <Activity size={18} className="text-[#C25E4B]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C25E4B]">Live Metrics</span>
              </div>
              <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-white">
                Project Pipeline
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-2 font-medium">Production workflow distribution.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center gap-10 p-8 relative z-10">
              {projectPipeline.map((item) => (
                <div key={item.phase} className="space-y-4 group/item cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-300 group-hover/item:text-white transition-colors">{item.phase}</span>
                    </div>
                    <span className="text-sm font-black text-white">{item.count} Projects</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000 ease-out group-hover/item:brightness-125", item.color)} 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
              
              <Link href="/admin/reports" className="mt-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/card cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B]">Operational Efficiency</p>
                  <ArrowUpRight size={14} className="text-gray-400 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" />
                </div>
                <p className="text-3xl font-display font-black text-white leading-none">84.2%</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                  <div className="w-[84.2%] h-full bg-[#C25E4B]" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Activity - Better Visuals */}
          <Card className="lg:col-span-1 bg-white border-none shadow-2xl shadow-gray-200/40 rounded-3xl flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-gray-50">
              <div>
                <CardTitle className="text-xl font-display font-black uppercase tracking-tight text-[#121212]">
                  Activity
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">Live studio events</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#C25E4B] hover:bg-[#C25E4B]/5 rounded-xl">
                <ChevronRight size={20} />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-8 pt-6 overflow-hidden">
              <ScrollArea className="h-[450px] pr-4 custom-scrollbar-thin">
                <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="relative flex gap-6 group cursor-pointer">
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center z-10 shadow-sm border border-transparent group-hover:scale-110 transition-all",
                        item.bgColor, item.color
                      )}>
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[11px] font-black text-[#121212] uppercase tracking-tight group-hover:text-[#C25E4B] transition-colors">{item.title}</p>
                          <span className="text-[9px] text-gray-400 font-bold uppercase">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-3">{item.description}</p>
                        <Badge variant="secondary" className={cn(
                          "text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 border-none",
                          item.bgColor, item.color
                        )}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Upcoming Appointments - Calendar Feel */}
          <Card className="lg:col-span-1 bg-white border-none shadow-2xl shadow-gray-200/40 rounded-3xl flex flex-col">
            <CardHeader className="p-8 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-display font-black uppercase tracking-tight text-[#121212]">
                    Calendar
                  </CardTitle>
                  <CardDescription className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">Upcoming consultations</CardDescription>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#121212]">
                  <Calendar size={18} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 pt-6">
              <div className="space-y-6">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-5 rounded-3xl border border-gray-100 hover:border-[#C25E4B]/40 hover:bg-gray-50/50 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#C25E4B]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B]">{apt.type}</span>
                      <Badge className={apt.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                        {apt.status}
                      </Badge>
                    </div>
                    <p className="text-base font-black text-[#121212] group-hover:text-[#C25E4B] transition-colors">{apt.client}</p>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold">
                        <Clock size={14} className="text-gray-400" />
                        {apt.time}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold">
                        <MapPin size={14} className="text-gray-400" />
                        {apt.location}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-6 border-2 border-dashed border-gray-100 text-gray-400 hover:border-[#C25E4B] hover:text-[#C25E4B] hover:bg-[#C25E4B]/5 h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all">
                  <Plus size={16} className="mr-2" /> Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Workspace Insights */}
          <div className="space-y-10">
            <Card className="bg-[#C25E4B] text-white border-none shadow-2xl shadow-[#C25E4B]/30 rounded-3xl relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Star size={200} />
              </div>
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-display font-black uppercase tracking-tight">Studio Metrics</CardTitle>
                <CardDescription className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Q2 Performance Review</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/90">Client Satisfaction</span>
                    <span className="text-xl font-display font-black">4.9/5</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-white rounded-full shadow-[0_0_10px_white]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/90">Project Delivery</span>
                    <span className="text-xl font-display font-black">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-white rounded-full shadow-[0_0_10px_white]" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10 text-center">
                  <div>
                    <p className="text-2xl font-display font-black leading-none">12</p>
                    <p className="text-[9px] uppercase font-black tracking-[0.2em] text-white/60 mt-2">Awards</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-black leading-none">850+</p>
                    <p className="text-[9px] uppercase font-black tracking-[0.2em] text-white/60 mt-2">Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-black leading-none">14</p>
                    <p className="text-[9px] uppercase font-black tracking-[0.2em] text-white/60 mt-2">Locs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: "Add Client", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: ImageIcon, label: "Gallery", color: "text-purple-500", bg: "bg-purple-50" },
                { icon: BookOpen, label: "Blog", color: "text-green-500", bg: "bg-green-50" },
                { icon: Zap, label: "Fast Add", color: "text-[#C25E4B]", bg: "bg-[#C25E4B]/10" },
              ].map((action, i) => (
                <Button key={i} variant="outline" className="flex flex-col items-center justify-center gap-3 h-32 bg-white border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group rounded-3xl">
                  <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", action.bg, action.color)}>
                    <action.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#121212]">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Projects Table - SaaS Level Up */}
        <Card className="bg-white border-none shadow-2xl shadow-gray-200/40 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">
                Portfolio Pipeline
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-2 font-semibold uppercase tracking-[0.15em]">Manage Active Architectural Projects</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl">
                {["All", "Active", "Completed"].map(filter => (
                  <Button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    size="sm" 
                    variant="ghost" 
                    className={cn(
                      "text-[10px] font-black uppercase h-9 px-5 rounded-xl transition-all",
                      activeFilter === filter ? "bg-white shadow-md text-[#121212]" : "text-gray-400 hover:text-[#121212]"
                    )}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder="Filter..." className="pl-10 h-11 w-48 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white text-xs font-semibold transition-all" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] py-6 pl-10">Project Identity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em]">Client</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em]">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-right">Budget</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em]">Deadline</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] w-[250px]">Progress</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-right pr-10">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestProjects.map((project) => (
                  <TableRow key={project.id} className="border-b border-gray-50 hover:bg-[#C25E4B]/[0.02] transition-colors group cursor-pointer">
                    <TableCell className="py-7 pl-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-[#C25E4B]/20 transition-all shadow-sm">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#121212] group-hover:text-[#C25E4B] transition-colors">{project.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">ID: PRJ-00{project.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500 font-bold uppercase tracking-tight">{project.client}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-none",
                        project.status === "Completed" ? "bg-green-100 text-green-700" : 
                        project.status === "Planning" ? "bg-amber-100 text-amber-700" : 
                        "bg-[#C25E4B]/10 text-[#C25E4B]"
                      )}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-black text-right text-[#121212]">{project.budget}</TableCell>
                    <TableCell className="text-xs text-gray-400 font-bold">{project.deadline}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#121212]">{project.progress}%</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Completion</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-[1px]">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000 ease-in-out shadow-sm",
                              project.progress === 100 ? "bg-green-500" : "bg-[#121212] group-hover:bg-[#C25E4B]"
                            )} 
                            style={{ width: `${project.progress}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-[#121212] hover:bg-gray-100 rounded-xl transition-all">
                            <MoreHorizontal size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-2xl">
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-gray-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-xs font-bold cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              <Star size={14} className="text-amber-500" />
                              Highlight Project
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-xs font-bold cursor-pointer transition-colors">
                            <div className="flex items-center gap-3 text-gray-700">
                              <Plus size={14} />
                              Update Progress
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-xs font-bold text-red-600 focus:text-red-700 cursor-pointer transition-colors">
                            Archive Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing 4 of 38 Active Projects</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-200">Previous</Button>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-200">Next Page</Button>
            </div>
          </div>
        </Card>

        {/* Floating Create Button for Mobile */}
        <Button className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#121212] text-white shadow-2xl flex items-center justify-center z-[100] active:scale-95 transition-transform">
          <Plus size={24} />
        </Button>
      </div>

      <style jsx global>{`
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(194, 94, 75, 0.2);
        }
      `}</style>
    </AdminLayout>
  );
}
