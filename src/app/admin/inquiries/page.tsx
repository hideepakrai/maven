"use client";

import React from "react";
import { 
  MoreHorizontal, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  Archive,
  Search,
  Filter
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const inquiries = [
  {
    id: "INQ-9421",
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    subject: "Residential Interior Design",
    status: "New",
    date: "2024-04-03",
    urgent: true,
  },
  {
    id: "INQ-9418",
    name: "Michael Chen",
    email: "m.chen@techhub.com",
    subject: "Commercial Office Refit",
    status: "In Progress",
    date: "2024-04-02",
    urgent: false,
  },
  {
    id: "INQ-9415",
    name: "David Miller",
    email: "dmiller@hotels.co",
    subject: "Boutique Hotel Concept",
    status: "Completed",
    date: "2024-03-30",
    urgent: false,
  },
  {
    id: "INQ-9412",
    name: "Elena Rodriguez",
    email: "elena.r@lifestyle.com",
    subject: "Sustainable Villa Design",
    status: "New",
    date: "2024-04-01",
    urgent: true,
  },
];

export default function InquiriesPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
              Inquiries & Leads
            </h1>
            <p className="text-gray-500 mt-1">Track and manage responses to potential architectural projects.</p>
          </div>
          <div className="flex items-center gap-2">
             <Badge className="bg-[#C25E4B] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
               2 New Urgent
             </Badge>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-10 h-10 bg-gray-50 border-gray-200 text-sm" placeholder="Search by name or subject..." />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none h-10 font-bold uppercase text-[10px] tracking-widest border-gray-200">
              <Filter size={14} className="mr-2" /> Filter By Status
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none h-10 font-bold uppercase text-[10px] tracking-widest border-gray-200">
              Export
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500 py-5 pl-6">ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Contact</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Subject / Intent</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Date Received</TableHead>
                <TableHead className="text-right pr-6">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inq) => (
                <TableRow key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-mono text-xs text-gray-400 pl-6">{inq.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-[#121212]">{inq.name}</p>
                      <p className="text-xs text-gray-500">{inq.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-medium text-gray-700">{inq.subject}</p>
                       {inq.urgent && (
                         <span className="w-1.5 h-1.5 rounded-full bg-[#C25E4B] animate-pulse" />
                       )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-none",
                        inq.status === "New" ? "bg-[#C25E4B]/10 text-[#C25E4B]" : 
                        inq.status === "In Progress" ? "bg-blue-50 text-blue-600" : 
                        "bg-green-50 text-green-600"
                      )}
                    >
                      {inq.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Calendar size={12} /> {inq.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye size={14} /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <CheckCircle2 size={14} /> Mark as Completed
                        </DropdownMenuItem>
                         <DropdownMenuItem className="flex items-center gap-2">
                          <Clock size={14} /> Set In-Progress
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-gray-400">
                          <Archive size={14} /> Archive Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
