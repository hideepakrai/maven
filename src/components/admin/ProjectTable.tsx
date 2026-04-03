"use client";

import React from "react";
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Search,
  Plus
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

const projects = [
  {
    id: "PROJ-001",
    name: "Skyline Villa",
    category: "Residential",
    location: "Malibu, CA",
    status: "In Progress",
    lastUpdated: "2024-03-25",
  },
  {
    id: "PROJ-002",
    name: "Nexus Office Hub",
    category: "Commercial",
    location: "Austin, TX",
    status: "Completed",
    lastUpdated: "2024-02-12",
  },
  {
    id: "PROJ-003",
    name: "Lakeside Retreat",
    category: "Residential",
    location: "Lake Tahoe, NV",
    status: "Planning",
    lastUpdated: "2024-04-01",
  },
  {
    id: "PROJ-004",
    name: "Urban Loft",
    category: "Interior",
    location: "New York, NY",
    status: "In Progress",
    lastUpdated: "2024-03-28",
  },
  {
    id: "PROJ-005",
    name: "Golden Gate Hotel",
    category: "Hospitality",
    location: "San Francisco, CA",
    status: "Planning",
    lastUpdated: "2024-03-15",
  },
];

export default function ProjectTable() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Search projects by name, id or location..." 
            className="pl-10 bg-gray-50 border-gray-200 rounded-lg text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">Filter</Button>
          <Button className="flex-1 sm:flex-none bg-[#C25E4B] hover:bg-[#A34A39] text-white">
            <Plus size={16} className="mr-2" /> New Project
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500 py-4">Project ID</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Name</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Category</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Location</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-gray-500">Last Updated</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">{project.id}</TableCell>
                <TableCell className="font-bold text-[#121212]">{project.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium text-xs bg-gray-100 border-none capitalize">
                    {project.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">{project.location}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "text-[10px] uppercase font-black tracking-tighter px-2 py-0.5",
                      project.status === "Completed" ? "bg-green-100 text-green-700 hover:bg-green-100" : 
                      project.status === "In Progress" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : 
                      "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    )}
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400 text-xs">{project.lastUpdated}</TableCell>
                <TableCell className="text-right pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil size={14} /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <ExternalLink size={14} /> View Live Page
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-700">
                        <Trash2 size={14} /> Delete Project
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
  );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
