"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Settings, 
  Plus, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2, 
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  ArrowUpRight,
  TrendingUp,
  Paperclip,
  Activity,
  UserPlus,
  ImageIcon,
  Search
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ProjectDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AdminLayout>
      <div className="space-y-8 pb-20">
        {/* Project Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-gray-100 pb-10">
          <div className="space-y-6">
            <Link href="/admin/projects">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#C25E4B] -ml-2">
                <ArrowLeft size={14} className="mr-2" /> Back to Portfolio
              </Button>
            </Link>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em] bg-[#C25E4B]/5 px-3">
                  Project ID: PRJ-001
                </Badge>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Modified 2h ago</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black text-[#121212] uppercase tracking-tighter leading-none">
                Golden <span className="text-gray-300">Gate</span> Hotel
              </h1>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <MapPin size={16} className="text-[#C25E4B]" /> San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Calendar size={16} className="text-[#C25E4B]" /> Deadline: Dec 2024
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 font-black uppercase text-[9px] tracking-widest px-3">Construction Phase</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
             <Button variant="outline" className="bg-white border-gray-200 text-xs font-black uppercase tracking-widest px-8 h-12 rounded-2xl hover:bg-gray-50 transition-all">
              <Share2 size={14} className="mr-2" /> Share Details
            </Button>
            <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-10 h-12 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              <Settings size={16} className="mr-2" /> Configure Project
            </Button>
          </div>
        </div>

        {/* Project Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Project Budget", value: "$2.4M", sub: "82% Allocated", icon: DollarSign, color: "text-green-500" },
            { label: "Production Team", value: "08", sub: "4 Leads, 4 Staff", icon: Users, color: "text-blue-500" },
            { label: "Total Tasks", value: "142", sub: "94 Completed", icon: CheckCircle2, color: "text-[#C25E4B]" },
            { label: "Time Elapsed", value: "14", sub: "Months in system", icon: Clock, color: "text-purple-500" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white border-none shadow-sm rounded-3xl group hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform", stat.color.replace('text-', 'bg-').replace('500', '50'))}>
                    <stat.icon size={18} className={stat.color} />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                <div className="flex items-end gap-2 mt-1">
                  <p className="text-3xl font-display font-black text-[#121212] leading-none">{stat.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 mb-1">{stat.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-center">
            <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <TabsTrigger value="overview" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <Activity size={14} className="mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="gallery" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <ImageIcon size={14} className="mr-2" /> Gallery
              </TabsTrigger>
              <TabsTrigger value="team" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <Users size={14} className="mr-2" /> Team
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <FileText size={14} className="mr-2" /> Docs & Notes
              </TabsTrigger>
              <TabsTrigger value="billing" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <DollarSign size={14} className="mr-2" /> Billing
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-10">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              {/* Production Progress */}
              <div className="xl:col-span-8 space-y-10">
                <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                   <CardHeader className="p-10 pb-4">
                     <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Production Progress</CardTitle>
                     <CardDescription className="text-gray-400 text-xs font-bold uppercase tracking-widest">Real-time build status tracking</CardDescription>
                   </CardHeader>
                   <CardContent className="p-10 space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <p className="text-sm font-black text-[#121212] uppercase tracking-tighter">Overall Completion</p>
                           <p className="text-2xl font-display font-black text-[#C25E4B]">65%</p>
                        </div>
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
                           <div className="h-full bg-[#121212] rounded-full shadow-[0_0_15px_rgba(18,18,18,0.2)] transition-all duration-1000" style={{ width: "65%" }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                          { name: "Structural Integrity", progress: 95 },
                          { name: "Interior Infrastructure", progress: 42 },
                          { name: "Façade Restoration", progress: 78 },
                          { name: "Utility Installation", progress: 30 }
                        ].map(sub => (
                          <div key={sub.name} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{sub.name}</span>
                              <span className="text-xs font-bold text-[#121212]">{sub.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                              <div className="h-full bg-[#C25E4B] rounded-full" style={{ width: `${sub.progress}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                   </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                   <CardHeader className="p-10 pb-4">
                     <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Project Notes</CardTitle>
                   </CardHeader>
                   <CardContent className="p-10 pt-4 space-y-6">
                      <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 relative group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                        <p className="text-xs font-bold text-[#121212] leading-relaxed mb-4">Structural review completed for the North wing. All heritage preservation standards are being maintained as per the San Francisco Heritage guidelines.</p>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-200" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Architect David L.</span>
                           </div>
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Yesterday, 4:20 PM</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-gray-200 text-gray-400 hover:text-[#C25E4B] hover:border-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em]">
                        <Plus size={16} className="mr-2" /> Add Project Note
                      </Button>
                   </CardContent>
                </Card>
              </div>

              {/* Activity Timeline */}
              <div className="xl:col-span-4 space-y-8">
                <Card className="bg-white border-none shadow-sm rounded-[2.5rem] h-full flex flex-col">
                  <CardHeader className="p-8 border-b border-gray-50">
                    <CardTitle className="text-xl font-display font-black uppercase tracking-tight text-[#121212]">Activity Timeline</CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Audit trail & project history</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-8 pt-10">
                    <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
                      {[
                        { title: "Status Changed to Construction", user: "Admin", time: "2 hours ago", icon: Activity },
                        { title: "Invoice #INV-2402 Issued", user: "Billing", time: "1 day ago", icon: DollarSign },
                        { title: "Blueprint Uploaded", user: "Architect", time: "3 days ago", icon: Paperclip },
                        { title: "Contract Signed", user: "Client", time: "2 weeks ago", icon: CheckCircle2 }
                      ].map((item, i) => (
                        <div key={i} className="relative flex gap-6 group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center z-10 shadow-sm group-hover:border-[#C25E4B] group-hover:text-[#C25E4B] transition-all">
                            <item.icon size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-black text-[#121212] uppercase tracking-tight leading-snug">{item.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.user}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-200" />
                               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-10">
            <Card className="bg-white border-none shadow-sm rounded-[2.5rem] p-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Project Production Team</h2>
                  <p className="text-gray-400 text-sm font-medium">Assigned architects, designers, and operational leads.</p>
                </div>
                <Button className="bg-[#121212] hover:bg-black text-white text-[10px] font-black uppercase tracking-widest px-8 h-12 rounded-2xl shadow-xl shadow-black/10 transition-all">
                  <UserPlus size={16} className="mr-2" /> Invite Member
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: "David Laurent", role: "Principal Architect", status: "Lead" },
                  { name: "Sophia Miller", role: "Interior Designer", status: "Lead" },
                  { name: "Marcus Chen", role: "Structural Engineer", status: "External" }
                ].map(member => (
                  <div key={member.name} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-gray-200 group-hover:scale-105 transition-transform" />
                    <div>
                      <p className="text-sm font-black text-[#121212] uppercase tracking-tight">{member.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{member.role}</p>
                      <Badge className="mt-3 bg-white border-gray-100 text-[8px] uppercase tracking-[0.2em]">{member.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-10">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               <Card className="lg:col-span-2 bg-white border-none shadow-sm rounded-[2.5rem] p-10">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Invoice History</h2>
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                      <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 bg-white shadow-sm">Recent</Button>
                      <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 text-gray-400">All Time</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: "INV-2402", amount: "$142,500", date: "May 1, 2024", status: "Paid" },
                      { id: "INV-2398", amount: "$85,000", date: "Apr 15, 2024", status: "Paid" },
                      { id: "INV-2385", amount: "$120,000", date: "Mar 30, 2024", status: "Pending" }
                    ].map(inv => (
                      <div key={inv.id} className="p-6 rounded-3xl border border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#C25E4B] transition-colors">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#121212] uppercase tracking-widest">{inv.id}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Service Fee • {inv.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <p className="text-sm font-black text-[#121212]">{inv.amount}</p>
                           <Badge className={inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>{inv.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
               </Card>
               <Card className="bg-[#121212] text-white border-none shadow-2xl rounded-[2.5rem] p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C25E4B]">Project Financials</p>
                    <div className="space-y-2">
                       <h3 className="text-4xl font-display font-black uppercase tracking-tighter">$2.4M</h3>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed">Total project valuation with 18.5% studio margin target.</p>
                    </div>
                  </div>
                  <div className="space-y-6 mt-12">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                      <span>Amount Billed</span>
                      <span className="text-white">$1.24M</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="w-[52%] h-full bg-[#C25E4B]" />
                    </div>
                    <Button className="w-full bg-[#C25E4B] hover:bg-[#A34A39] text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">Generate New Invoice</Button>
                  </div>
               </Card>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
