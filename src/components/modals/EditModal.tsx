"use client";

import React, { useState, useEffect } from "react";
import { Edit3, Loader2, Save } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGalleryStore } from "@/store/useGalleryStore";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export default function EditModal({ isOpen, onClose, item }: EditModalProps) {
  const { updateItem } = useGalleryStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    altText: "",
    tags: "",
    description: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        category: item.category || "Residential",
        altText: item.altText || "",
        tags: item.tags ? item.tags.join(", ") : "",
        description: item.description || ""
      });
    }
  }, [item]);

  const handleSubmit = async () => {
    setIsUpdating(true);
    const success = await updateItem(item._id, {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== "")
    });
    setIsUpdating(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isUpdating && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
        <div className="p-10 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Refine Metadata</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm font-medium">Update the production details and SEO tags for this visual asset.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Project Title</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  placeholder="Asset title..." 
                  className="h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  className="w-full h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 text-xs font-bold text-[#121212] outline-none"
                >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Interior</option>
                    <option>Landscape</option>
                    <option>Hospitality</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Accessibility Alt Text</label>
              <Input 
                value={formData.altText} 
                onChange={e => setFormData({...formData, altText: e.target.value})} 
                placeholder="Describe for screen readers..." 
                className="h-12 rounded-xl border-gray-100 bg-gray-50" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Production Tags</label>
              <Input 
                value={formData.tags} 
                onChange={e => setFormData({...formData, tags: e.target.value})} 
                placeholder="Modern, Luxury, Glass..." 
                className="h-12 rounded-xl border-gray-100 bg-gray-50" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Concept Description</label>
              <Textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Refine the concept description..." 
                className="min-h-[120px] rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 flex justify-end gap-3">
          <Button 
            disabled={isUpdating}
            onClick={onClose} 
            variant="ghost" 
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212]"
          >
            Cancel
          </Button>
          <Button 
            disabled={isUpdating}
            onClick={handleSubmit} 
            className="bg-[#121212] text-white text-[10px] font-black uppercase tracking-widest px-10 h-12 rounded-xl shadow-xl shadow-black/10 transition-all"
          >
            {isUpdating ? (
              <><Loader2 size={16} className="mr-2 animate-spin" /> Synchronizing...</>
            ) : (
              <><Save size={16} className="mr-2" /> Update Record</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
