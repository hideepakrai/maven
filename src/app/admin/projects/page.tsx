"use client";

import React, { useState } from "react";
import { Plus, Download, Filter, Search } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import ProjectTable from "@/components/admin/ProjectTable";
import ProjectForm from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProjectsPage() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
              Projects Management
            </h1>
            <p className="text-gray-500 mt-1">Manage, edit, and showcase your architectural portfolio.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-gray-200 text-xs font-bold uppercase tracking-widest px-6 h-11">
              <Download size={14} className="mr-2" /> Export CSV
            </Button>
            
            <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-widest px-8 h-11">
                  <Plus size={16} className="mr-2" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-[#121212] p-6 text-white">
                  <DialogHeader className="space-y-1">
                    <DialogTitle className="text-xl font-display font-black uppercase tracking-tight text-[#C25E4B]">
                      Create New Project
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Fill in the details below to add a new project to your architectural portfolio.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <div className="p-8">
                  <ProjectForm 
                    onSuccess={() => setIsNewProjectModalOpen(false)} 
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Summary for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B] mb-2">Portfolio Total</p>
            <p className="text-3xl font-display font-black text-[#121212]">124</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">Projects across 12 countries</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Currently Active</p>
            <p className="text-3xl font-display font-black text-[#121212]">18</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">Building and design phases</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking_widest text-green-600 mb-2">Recently Completed</p>
            <p className="text-3xl font-display font-black text-[#121212]">4</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">Delivered in the last 30 days</p>
          </div>
        </div>

        {/* Projects List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Project List</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Page 1 of 12</span>
          </div>
          <ProjectTable />
        </div>
      </div>
    </AdminLayout>
  );
}
