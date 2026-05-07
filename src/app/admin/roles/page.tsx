"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Users, 
  Settings, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  Info
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Role {
  id: string;
  name: string;
  userCount: number;
  status: "Active" | "Inactive";
  permissions: string[];
  description: string;
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    userCount: 2,
    status: "Active",
    permissions: ["Full System Access", "Manage Billing", "Manage Team"],
    description: "Full administrative control over all studio operations and settings."
  },
  {
    id: "2",
    name: "Editor",
    userCount: 4,
    status: "Active",
    permissions: ["Manage Pages", "Manage Blog", "Media Library"],
    description: "Responsible for content management and website editorial updates."
  },
  {
    id: "3",
    name: "Architect",
    userCount: 12,
    status: "Active",
    permissions: ["Project Management", "Upload Blueprints", "Client Inquiries"],
    description: "Production focused access for project delivery and client communication."
  },
  {
    id: "4",
    name: "SEO Manager",
    userCount: 1,
    status: "Active",
    permissions: ["SEO Settings", "Page Metadata", "Analytics"],
    description: "Optimization focused role with access to search and performance metrics."
  }
];

export default function RolesManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.2em] bg-[#C25E4B]/5 px-3 py-1">
                System Governance
              </Badge>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-display font-black text-[#121212] uppercase tracking-tighter leading-none">
                Roles <span className="text-gray-300">& Access</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium max-w-2xl leading-relaxed">
                Configure role-based access control (RBAC) for your studio production team. Define precise permission sets for architects, editors, and admins.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-10 h-12 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all">
              <Plus size={16} className="mr-2" /> Define New Role
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Roles Table */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <div className="relative w-64 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C25E4B] transition-colors" size={16} />
                    <Input placeholder="Search roles..." className="pl-12 h-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white text-xs font-semibold" />
                  </div>
               </div>
               <Table>
                 <TableHeader className="bg-gray-50/50">
                   <TableRow className="border-none">
                     <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Role Name</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">User Count</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Status</TableHead>
                     <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Actions</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {mockRoles.map((role) => (
                     <TableRow key={role.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                       <TableCell className="py-7 pl-10">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center text-white">
                              <ShieldCheck size={18} />
                            </div>
                            <div>
                               <p className="text-sm font-black text-[#121212] uppercase tracking-tighter">{role.name}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Level {role.id}</p>
                            </div>
                         </div>
                       </TableCell>
                       <TableCell className="text-xs text-gray-500 font-bold">
                         <div className="flex items-center gap-2">
                           <Users size={14} className="text-gray-300" />
                           {role.userCount} Members
                         </div>
                       </TableCell>
                       <TableCell>
                         <Badge className="bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest border-none px-3 py-1">
                           {role.status}
                         </Badge>
                       </TableCell>
                       <TableCell className="text-right pr-10">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                               <Settings size={16} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                                   <MoreHorizontal size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                                  <Users size={16} className="mr-3 text-gray-400" />
                                  <span className="text-xs font-bold text-[#121212]">Assign Members</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                                  <CheckCircle2 size={16} className="mr-3 text-gray-400" />
                                  <span className="text-xs font-bold text-[#121212]">Duplicate Role</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-50" />
                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-700 cursor-pointer">
                                  <XCircle size={16} className="mr-3" />
                                  <span className="text-xs font-bold">Deactivate</span>
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

            <div className="p-8 rounded-[2.5rem] bg-[#121212] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <ShieldCheck size={120} />
               </div>
               <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-display font-black uppercase tracking-tight">Security Protocol</h3>
                  <p className="text-gray-400 text-xs font-medium max-w-md">Your studio is currently using Level 4 RBAC protocols. All administrative changes are logged in the system audit trail.</p>
               </div>
               <Button className="relative z-10 bg-[#C25E4B] hover:bg-[#A34A39] text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 h-12 rounded-2xl transition-all">
                 View Audit Logs
               </Button>
            </div>
          </div>

          {/* Quick Permission Preview */}
          <div className="space-y-8">
            <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
               <CardHeader className="p-8 border-b border-gray-50">
                  <CardTitle className="text-xl font-display font-black uppercase tracking-tight text-[#121212]">Permission Set</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Review active role capabilities</CardDescription>
               </CardHeader>
               <CardContent className="p-8 space-y-8">
                 {mockRoles.slice(0, 3).map(role => (
                   <div key={role.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-black uppercase tracking-widest text-[#121212]">{role.name}</span>
                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Selected</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map(perm => (
                          <Badge key={perm} variant="secondary" className="bg-gray-50 text-[8px] uppercase tracking-widest text-gray-500 font-bold border-none px-2">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                      <Separator className="bg-gray-50" />
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#C25E4B] hover:text-[#A34A39] h-10">
                   View Full Matrix <ChevronRight size={14} className="ml-1" />
                 </Button>
               </CardContent>
            </Card>

            <div className="p-8 rounded-[2.5rem] bg-white border border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
               <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <Info size={24} />
               </div>
               <h4 className="text-sm font-black text-[#121212] uppercase tracking-tighter">Need Assistance?</h4>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Refer to the governance documentation for detailed role configuration guidelines.</p>
               <Button variant="outline" className="rounded-xl h-10 px-6 border-gray-100 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] transition-all">
                 Documentation
               </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
