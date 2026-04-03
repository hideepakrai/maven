"use client";

import React from "react";
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  ExternalLink,
  Plus,
  PlusCircle,
  Search
} from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";

const clients = [
  {
    id: "CLT-001",
    name: "John & Sarah Jenkins",
    email: "john.jenkins@email.com",
    project: "Skyline Villa",
    type: "Private Residential",
    joined: "2023-11-05",
  },
  {
    id: "CLT-002",
    name: "Nexus Group Intl.",
    email: "admin@nexusgroup.com",
    project: "Nexus Office Hub",
    type: "Commercial",
    joined: "2024-01-20",
  },
  {
    id: "CLT-003",
    name: "Robert Miller",
    email: "rmiller@techcorp.io",
    project: "Lakeside Retreat",
    type: "Private Residential",
    joined: "2024-02-15",
  },
  {
    id: "CLT-004",
    name: "Emily Thompson",
    email: "emily.t@designspace.com",
    project: "Urban Loft",
    type: "Interior Only",
    joined: "2024-03-01",
  },
];

export default function ClientsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
              Clients Portfolio
            </h1>
            <p className="text-gray-500 mt-1">Directory of distinguished clients and corporate partners.</p>
          </div>
          <Button className="bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-widest px-8">
            <PlusCircle size={16} className="mr-2" /> Add Client
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-10 bg-gray-50 text-sm border-gray-200" placeholder="Search clients..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs font-bold uppercase">All</Button>
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase text-gray-500">Corporate</Button>
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase text-gray-500">Private</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500 py-4">Client ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Full Name</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Contact</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Associated Project</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Type</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Member Since</TableHead>
                <TableHead className="text-right pr-6">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium text-gray-500">{client.id}</TableCell>
                  <TableCell className="font-bold text-[#121212]">{client.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#121212] flex items-center gap-1.5 font-medium">
                        <Mail size={12} className="text-[#C25E4B]" /> {client.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#C25E4B]/5 text-[#C25E4B] inline-flex items-center gap-1">
                      {client.project} <ExternalLink size={10} />
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="ghost" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 p-0">
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs font-medium">{client.joined}</TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Delete Client Record</DropdownMenuItem>
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
