"use client";

import React, { useState } from "react";
import { FolderPlus, Loader2, Plus, LayoutGrid } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    color: "#121212",
    description: ""
  });

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Category name is required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await axios.post("/api/categories", formData);
      if (res.data.success) {
        toast.success("Category created successfully");
        setFormData({ name: "", color: "#121212", description: "" });
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create category");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
        <div className="p-10 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Define Taxonomy</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm font-medium">Create a new organizational category for your architectural portfolio.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category Name</label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. Sustainable Residential" 
                className="h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Accent Color</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                  className="w-12 h-12 rounded-xl border-none p-0 cursor-pointer overflow-hidden"
                />
                <Input 
                  value={formData.color} 
                  onChange={e => setFormData({...formData, color: e.target.value})} 
                  placeholder="#121212" 
                  className="h-12 rounded-xl border-gray-100 bg-gray-50 flex-1 uppercase font-mono text-xs" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Organizational Scope</label>
              <Input 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="Describe the scope of this category..." 
                className="h-12 rounded-xl border-gray-100 bg-gray-50" 
              />
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 flex justify-end gap-3">
          <Button 
            disabled={isSaving}
            onClick={onClose} 
            variant="ghost" 
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212]"
          >
            Cancel
          </Button>
          <Button 
            disabled={isSaving}
            onClick={handleSubmit} 
            className="bg-[#121212] text-white text-[10px] font-black uppercase tracking-widest px-10 h-12 rounded-xl shadow-xl shadow-black/10 transition-all"
          >
            {isSaving ? (
              <><Loader2 size={16} className="mr-2 animate-spin" /> Persisting...</>
            ) : (
              <><LayoutGrid size={16} className="mr-2" /> Initialize Category</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
