"use client";

import React, { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGalleryStore } from "@/store/useGalleryStore";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
}

export default function DeleteModal({ isOpen, onClose, itemId, itemTitle }: DeleteModalProps) {
  const { deleteItem } = useGalleryStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await deleteItem(itemId);
    setIsDeleting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
        <div className="p-10 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
            <Trash2 size={28} />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">De-commission Asset?</DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              Are you sure you want to delete <span className="font-bold text-[#121212]">"{itemTitle}"</span>? This will permanently remove the binary from Cloudinary and the record from our database.
            </DialogDescription>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-2xl flex items-center gap-4 text-left border border-amber-100">
            <AlertTriangle className="text-amber-500 flex-shrink-0" size={20} />
            <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest leading-relaxed">
              This action cannot be undone. All related metadata and production logs will be purged.
            </p>
          </div>
        </div>
        <div className="p-8 bg-gray-50 flex justify-center gap-3">
          <Button 
            disabled={isDeleting}
            onClick={onClose} 
            variant="ghost" 
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] px-8"
          >
            Cancel
          </Button>
          <Button 
            disabled={isDeleting}
            onClick={handleDelete} 
            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-10 h-12 rounded-xl shadow-xl shadow-red-600/20 transition-all"
          >
            {isDeleting ? (
              <><Loader2 size={16} className="mr-2 animate-spin" /> Purging...</>
            ) : (
              "Confirm Deletion"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
