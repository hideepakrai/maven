"use client";

import React from "react";
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  DollarSign,
  CheckCircle2,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Projects",
    value: "38",
    description: "Active high-end builds",
    icon: Briefcase,
    trend: "+12%",
    trendType: "up",
    context: "Across 4 states",
    color: "bg-[#C25E4B]"
  },
  {
    title: "Active Clients",
    value: "24",
    description: "Current design contracts",
    icon: Users,
    trend: "+5%",
    trendType: "up",
    context: "3 new this month",
    color: "bg-blue-600"
  },
  {
    title: "New Inquiries",
    value: "16",
    description: "Pending responses",
    icon: MessageSquare,
    trend: "-2%",
    trendType: "down",
    context: "Avg response 2h",
    color: "bg-amber-500"
  },
  {
    title: "Monthly Revenue",
    value: "$182.4k",
    description: "Service earnings",
    icon: DollarSign,
    trend: "+18%",
    trendType: "up",
    context: "Projected $210k",
    color: "bg-green-600"
  },
  {
    title: "Completed Projects",
    value: "112",
    description: "Successfully delivered",
    icon: CheckCircle2,
    trend: "+8%",
    trendType: "up",
    context: "Last year: 94",
    color: "bg-purple-600"
  },
  {
    title: "Pending Site Visits",
    value: "09",
    description: "Scheduled this week",
    icon: MapPin,
    trend: "+15%",
    trendType: "up",
    context: "Next: Manhattan",
    color: "bg-[#121212]"
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="bg-white border-transparent shadow-sm hover:shadow-2xl hover:shadow-[#121212]/5 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden rounded-3xl"
        >
          {/* Subtle background glow on hover */}
          <div className={cn(
            "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full",
            stat.color
          )} />
          
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={cn(
                "p-2.5 rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                stat.color
              )}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-full transition-colors duration-300",
                stat.trendType === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {stat.trendType === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 group-hover:text-gray-500 transition-colors">
                {stat.title}
              </p>
              <div className="text-3xl font-display font-black text-[#121212] group-hover:text-[#C25E4B] transition-colors duration-300">
                {stat.value}
              </div>
              <p className="text-[11px] font-semibold text-gray-500 leading-tight">
                {stat.description}
              </p>
              
              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {stat.context}
                </p>
                <div className="w-1 h-1 bg-[#C25E4B] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
