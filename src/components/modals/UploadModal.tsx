"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, ImageIcon, Plus, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGalleryStore } from "@/store/useGalleryStore";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { addItem, fetchItems } = useGalleryStore();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    altText: "",
    tags: "",
    description: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        toast.error("File size exceeds 20MB limit");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      console.log("=> Asset Selected:", selectedFile.name);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    // Validation with explicit toasts
    if (!formData.title.trim()) {
      toast.error("Please enter a project title before uploading");
      return;
    }
    if (!file) {
      toast.error("Please select an image file to upload");
      return;
    }

    try {
      setIsUploading(true);
      console.log("=> Starting upload for:", formData.title);
      
      const data = new FormData();
      data.append("file", file);
      data.append("title", formData.title.trim());
      data.append("category", formData.category);
      data.append("altText", formData.altText.trim() || formData.title.trim());
      data.append("tags", formData.tags);
      data.append("description", formData.description.trim());

      const success = await addItem(data);
      
      if (success) {
        resetForm();
        onClose();
        await fetchItems();
      }
    } catch (error: any) {
      console.error("=> Upload Error:", error);
      toast.error(error.message || "Failed to upload asset");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setFormData({
      title: "",
      category: "Residential",
      altText: "",
      tags: "",
      description: ""
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // The button is now always "clickable" if not uploading, 
  // but it will show validation errors if fields are missing.
  // This avoids the "button not working" frustration.
  const isFormReady = formData.title.trim().length > 0 && file !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isUploading && onClose()}>
      <DialogContent 
        className="sm:max-w-3xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl flex flex-col max-h-[90vh] bg-white z-[9999]"
      >
        {/* Hidden titles for accessibility */}
        <div className="sr-only">
          <DialogTitle>Asset Deployment</DialogTitle>
          <DialogDescription>Upload and sync architectural visual production</DialogDescription>
        </div>

        {/* Custom Header */}
        <div className="p-10 pb-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 relative z-20">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212] leading-none">Asset Deployment</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Architectural Visual Production Sync</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            disabled={isUploading}
            className="rounded-2xl hover:bg-gray-100 w-12 h-12"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Body */}
        <ScrollArea className="flex-1 overflow-y-auto bg-white relative z-10">
          <div className="p-10 pt-8 space-y-10 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12">
              <div className="space-y-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] flex items-center gap-2">
                     Project Title <span className="text-[#C25E4B]">*</span>
                   </label>
                   <Input 
                     value={formData.title} 
                     onChange={e => setFormData({...formData, title: e.target.value})} 
                     placeholder="e.g. Skyline Villa Exterior" 
                     className="h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#C25E4B] transition-all font-bold text-base px-6 shadow-sm" 
                   />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Category</label>
                      <div className="relative">
                        <select 
                          value={formData.category} 
                          onChange={e => setFormData({...formData, category: e.target.value})} 
                          className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50/50 px-6 text-[10px] font-black uppercase tracking-widest text-[#121212] outline-none appearance-none hover:bg-white transition-all cursor-pointer shadow-sm"
                        >
                           <option>Residential</option>
                           <option>Commercial</option>
                           <option>Interior</option>
                           <option>Landscape</option>
                           <option>Hospitality</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                           <Plus size={14} className="rotate-45 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Tags</label>
                      <Input 
                        value={formData.tags} 
                        onChange={e => setFormData({...formData, tags: e.target.value})} 
                        placeholder="Modern, Luxury..." 
                        className="h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white text-xs font-bold px-6 shadow-sm" 
                      />
                    </div>
                 </div>

                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Accessibility Alt Text</label>
                   <Input 
                     value={formData.altText} 
                     onChange={e => setFormData({...formData, altText: e.target.value})} 
                     placeholder="Visual description for screen readers..." 
                     className="h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white text-xs font-bold px-6 shadow-sm" 
                   />
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] flex items-center gap-2">
                  Visual Source <span className="text-[#C25E4B]">*</span>
                </label>
                <div className="h-[340px] relative">
                  {!preview ? (
                    <label className="flex h-full p-8 border-2 border-dashed border-gray-200 rounded-[3rem] flex-col items-center justify-center gap-6 group hover:border-[#C25E4B]/40 hover:bg-[#C25E4B]/5 transition-all cursor-pointer bg-gray-50/30">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                      />
                      <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl shadow-black/5 flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:text-[#C25E4B] group-hover:rotate-6 transition-all duration-500">
                        <Upload size={32} />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-xs font-black text-[#121212] uppercase tracking-widest">Upload Master Visual</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">RAW / Render / Photo</p>
                      </div>
                    </label>
                  ) : (
                    <div className="h-full rounded-[3rem] overflow-hidden group shadow-2xl relative border-4 border-white">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-md gap-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={removeImage}
                          className="rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest"
                        >
                          <Trash2 size={16} className="mr-2" /> Remove Asset
                        </Button>
                        <label className="bg-white text-[#121212] hover:bg-gray-100 rounded-xl px-8 h-12 flex items-center justify-center text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all">
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                          <ImageIcon size={16} className="mr-2" /> Replace
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#121212]">Production Notes / Description</label>
              <Textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detail the atmospheric intent, materiality, and project scope..." 
                className="min-h-[160px] rounded-[2.5rem] border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#C25E4B] transition-all text-sm leading-relaxed p-8 resize-none shadow-inner"
              />
            </div>
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-10 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between gap-6 shrink-0 backdrop-blur-md relative z-30">
          <div className="hidden sm:flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <AlertCircle size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-[#121212] uppercase tracking-widest">Production Limits</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Max file payload: 20MB</p>
             </div>
          </div>
          <div className="flex gap-4 flex-1 sm:flex-none">
            <Button 
              disabled={isUploading}
              onClick={onClose} 
              variant="ghost" 
              className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] hover:bg-white px-10 h-14 rounded-2xl transition-all"
            >
              Cancel
            </Button>
            <Button 
              disabled={isUploading}
              onClick={handleSubmit} 
              className={cn(
                "flex-1 sm:flex-none text-[10px] font-black uppercase tracking-[0.2em] px-12 h-14 rounded-2xl shadow-2xl transition-all relative overflow-hidden group",
                isFormReady 
                  ? "bg-[#121212] text-white hover:bg-black hover:-translate-y-1 active:translate-y-0 shadow-black/20 opacity-100" 
                  : "bg-[#121212]/30 text-white/50 cursor-pointer shadow-none"
              )}
            >
              {isUploading ? (
                <div className="flex items-center gap-3">
                   <Loader2 size={18} className="animate-spin" />
                   <span>Deploying...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <CheckCircle2 size={18} />
                   <span>Upload Asset</span>
                </div>
              )}
              {isFormReady && !isUploading && (
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
