"use client";

import React from "react";
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
  ArrowRight 
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import SummaryCards from "@/components/admin/SummaryCards";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for analytics
const revenueData = [
  { name: "Jan", total: 45000 },
  { name: "Feb", total: 52000 },
  { name: "Mar", total: 48000 },
  { name: "Apr", total: 61000 },
  { name: "May", total: 55000 },
  { name: "Jun", total: 67000 },
  { name: "Jul", total: 72000 },
];

const projectStatusData = [
  { name: "Planning", count: 8 },
  { name: "Design", count: 12 },
  { name: "Building", count: 6 },
  { name: "Closing", count: 4 },
];

const recentActivity = [
  {
    id: 1,
    type: "inquiry",
    title: "New inquiry from Sarah Jenkins",
    description: "Interested in residential interior design for Manhattan loft.",
    time: "2 hours ago",
    status: "New",
  },
  {
    id: 2,
    type: "project",
    title: "Project 'Skyline Villa' updated",
    description: "Added 4 new high-resolution renders to the gallery.",
    time: "5 hours ago",
    status: "Updated",
  },
  {
    id: 3,
    type: "client",
    title: "Signed contract with Nexus Group",
    description: "Commercial office redesign project officially started.",
    time: "1 day ago",
    status: "Completed",
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, here is what is happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-gray-200">
              Download Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Main Chart Area */}
          <Card className="lg:col-span-4 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                Revenue Performance
              </CardTitle>
              <CardDescription>Monthly service revenue tracking across all projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C25E4B" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#C25E4B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#121212", border: "none", borderRadius: "8px", color: "#fff" }}
                      itemStyle={{ color: "#C25E4B" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#C25E4B" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Status Chart */}
          <Card className="lg:col-span-3 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                Project Pipeline
              </CardTitle>
              <CardDescription>Current distribution of projects across phases.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectStatusData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#4B5563" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ backgroundColor: "#121212", border: "none", borderRadius: "8px", color: "#fff" }}
                    />
                    <Bar dataKey="count" fill="#121212" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates from projects and client interactions.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#C25E4B]">
                View All <ArrowRight size={14} className="ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      {item.type === "inquiry" ? <MessageSquare size={18} className="text-blue-500" /> : <Briefcase size={18} className="text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-[#121212] truncate">{item.title}</p>
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold">{item.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-1">{item.description}</p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                        <Clock size={10} />
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Performance */}
          <Card className="bg-[#121212] text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C25E4B]/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-white">
                Studio Insights
              </CardTitle>
              <CardDescription className="text-gray-400">Analysis of your architectural studio's health.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-300">Project Delivery Rate</span>
                  <span className="text-sm font-bold text-[#C25E4B]">92%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C25E4B] rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-display font-bold text-white">12</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Pending Reviews</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-display font-bold text-white">4</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Site Visits Today</p>
                </div>
              </div>

              <Button className="w-full bg-[#C25E4B] hover:bg-[#A34A39] text-white py-6 rounded-lg font-bold text-sm uppercase tracking-widest">
                Go to Team Management
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
