"use client";

import React from "react";
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  DollarSign 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    description: "Active high-end builds",
    icon: Briefcase,
    trend: "+12%",
    trendType: "up",
  },
  {
    title: "Active Clients",
    value: "18",
    description: "Current design contracts",
    icon: Users,
    trend: "+5%",
    trendType: "up",
  },
  {
    title: "New Inquiries",
    value: "42",
    description: "Pending responses",
    icon: MessageSquare,
    trend: "-2%",
    trendType: "down",
  },
  {
    title: "Monthly Revenue",
    value: "$142.5k",
    description: "Architectural services",
    icon: DollarSign,
    trend: "+24%",
    trendType: "up",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-[#C25E4B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-black text-[#121212]">{stat.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-xs font-semibold px-1.5 py-0.5 rounded",
                stat.trendType === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {stat.trend}
              </span>
              <span className="text-xs text-gray-400 font-medium">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
