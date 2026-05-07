"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, Search, Filter, Grid, List, MoreVertical, Eye, 
  Maximize2, X, ImageIcon, Calendar, Briefcase, ExternalLink,
  ChevronLeft, ChevronRight, Upload, Edit3, Trash2, Copy, 
  CheckSquare, Square, FolderInput, ArrowUpDown, Loader2,
  FileText, Tag, Hash, Clock, HardDrive, User, Layout, 
  CheckCircle2, Share2, Globe, Settings, GripVertical,
  PlusCircle, BookOpen, Layers, ArrowRight, Sparkles,
  Home, Building2, Palette, Landmark, MousePointer2,
  Check, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";

// DnD Kit
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Store
import { useCollectionStore, CollectionItem } from "@/store/useCollectionStore";
import { useMediaStore } from "@/store/useMediaStore";

export default function GalleryManagerPage() {
  const { collections, loading, fetchCollections, createCollection, updateCollection, deleteCollection, reorderMedia } = useCollectionStore();
  const { items: mediaLibrary, fetchMedia } = useMediaStore();
  
  // UI States
  const [activeView, setActiveView] = useState<"grid" | "detail">("grid");
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal States
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State for new collection
  const [newCollData, setNewCollData] = useState({
    name: "",
    type: "homepage" as any,
    description: "",
    status: "draft" as any
  });

  useEffect(() => {
    fetchCollections();
    fetchMedia();
  }, [fetchCollections, fetchMedia]);

  const filteredCollections = useMemo(() => {
    return collections.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || c.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [collections, searchQuery, statusFilter]);

  const handleOpenCollection = (c: CollectionItem) => {
    setSelectedCollection(c);
    setActiveView("detail");
  };

  const handleBackToGrid = () => {
    setActiveView("grid");
    setSelectedCollection(null);
  };

  const handleCreateSubmit = async () => {
    if (!newCollData.name) {
      toast.error("Please enter a collection name");
      return;
    }
    setIsCreating(true);
    const success = await createCollection({
      name: newCollData.name,
      description: newCollData.description,
      status: newCollData.status,
      showOn: [newCollData.type]
    });
    setIsCreating(false);
    if (success) {
      setIsCreateModalOpen(false);
      setNewCollData({ name: "", type: "homepage", description: "", status: "draft" });
    }
  };

  const templates = [
    { 
      id: "homepage", 
      title: "Homepage Hero", 
      desc: "Perfect for landing page sliders", 
      icon: Home, 
      color: "from-amber-50 to-orange-50",
      type: "homepage"
    },
    { 
      id: "residential", 
      title: "Residential Portfolio", 
      desc: "Villa and residential storytelling", 
      icon: Building2, 
      color: "from-blue-50 to-indigo-50",
      type: "portfolio"
    },
    { 
      id: "interior", 
      title: "Interior Concepts", 
      desc: "Interior moodboards and showcases", 
      icon: Palette, 
      color: "from-rose-50 to-pink-50",
      type: "services"
    },
    { 
      id: "commercial", 
      title: "Commercial Projects", 
      desc: "Office and retail architecture", 
      icon: Landmark, 
      color: "from-emerald-50 to-teal-50",
      type: "portfolio"
    }
  ];

  return (
    <AdminLayout>
      <Toaster position="top-right" richColors />
      
      <div className="space-y-20 pb-40">
        <AnimatePresence mode="wait">
          {activeView === "grid" ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* Premium Hero Header */}
              <section className="relative overflow-hidden pt-12">
                <div className="flex flex-col 2xl:flex-row 2xl:items-end justify-between gap-12 border-b border-gray-100 pb-16">
                  <div className="space-y-8 max-w-4xl">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.3em] bg-[#C25E4B]/5 px-5 py-2 rounded-xl">
                        Visual Curation
                      </Badge>
                      <div className="h-1 w-8 bg-gray-100 rounded-full" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Editorial Publishing System</p>
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-7xl md:text-8xl font-display font-black text-[#121212] uppercase tracking-tightest leading-[0.85]">
                        Gallery <span className="text-gray-200">Collections</span>
                      </h1>
                      <p className="text-gray-500 text-lg font-medium max-w-2xl leading-relaxed italic border-l-4 border-[#C25E4B]/20 pl-8">
                        Create curated architectural showcases for your homepage, portfolio, and studio storytelling. Connect Media Library assets to public website sections.
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="group relative bg-[#121212] hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-14 h-16 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Plus size={20} className="mr-4 group-hover:rotate-90 transition-transform duration-500" /> Create Collection
                  </Button>
                </div>
              </section>

              {/* Template Onboarding Section */}
              <section className="space-y-12">
                <div className="flex items-center gap-4">
                   <Sparkles className="text-[#C25E4B]" size={20} />
                   <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">Start with a template</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {templates.map((tpl) => (
                    <motion.div
                      key={tpl.id}
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setNewCollData({ ...newCollData, name: tpl.title, type: tpl.type });
                        setIsCreateModalOpen(true);
                      }}
                      className={cn(
                        "group p-10 rounded-[3rem] border border-gray-100 bg-white cursor-pointer transition-all duration-500",
                        "hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-[#C25E4B]/20"
                      )}
                    >
                      <div className={cn(
                        "w-20 h-20 rounded-[2.5rem] flex items-center justify-center mb-8 bg-gradient-to-br transition-all duration-500 group-hover:rotate-6 shadow-sm",
                        tpl.color
                      )}>
                        <tpl.icon size={32} className="text-[#121212]" />
                      </div>
                      <h3 className="text-xl font-display font-black text-[#121212] uppercase tracking-tight mb-2">{tpl.title}</h3>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed italic">{tpl.desc}</p>
                      <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[#C25E4B]">
                         <span className="text-[10px] font-black uppercase tracking-widest">Select Template</span>
                         <ArrowRight size={14} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Workflow Visualization */}
              <section className="py-16 bg-gray-50/50 rounded-[4rem] border border-gray-100 px-10">
                 <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 text-center">
                    {[
                      { step: "01", label: "Upload Media", desc: "Add assets to library", icon: Upload },
                      { step: "02", label: "Curate Collection", desc: "Sequence visual story", icon: Layers },
                      { step: "03", label: "Publish To Website", desc: "Sync to public pages", icon: Globe }
                    ].map((wf, idx) => (
                      <React.Fragment key={wf.step}>
                        <div className="flex flex-col items-center space-y-6 flex-1">
                           <div className="relative">
                              <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-[#C25E4B]">
                                 <wf.icon size={28} />
                              </div>
                              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#121212] text-white text-[10px] font-black flex items-center justify-center border-4 border-white">
                                 {wf.step}
                              </span>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm font-black text-[#121212] uppercase tracking-tight">{wf.label}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{wf.desc}</p>
                           </div>
                        </div>
                        {idx < 2 && (
                          <div className="hidden md:block flex-shrink-0 text-gray-200">
                             <ArrowRight size={24} />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                 </div>
              </section>

              {/* Collections Management Section */}
              <section className="space-y-12">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-display font-black uppercase tracking-tight text-[#121212]">Recent Collections</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Manage your published sequences and drafts</p>
                  </div>
                  
                  {collections.length > 0 && (
                    <div className="flex flex-wrap items-center gap-4 bg-white/50 backdrop-blur-xl p-3 rounded-3xl border border-gray-100">
                      <div className="relative w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input 
                          placeholder="Search..." 
                          className="pl-12 h-10 rounded-xl border-gray-100 bg-gray-50/50 text-[10px] font-black uppercase tracking-widest"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212]">
                             <Filter size={14} className="mr-2" /> {statusFilter}
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                            {["All", "Published", "Draft"].map(s => (
                              <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)} className="rounded-xl px-4 py-2.5 cursor-pointer">
                                 <span className="text-[9px] font-black uppercase tracking-widest">{s}</span>
                              </DropdownMenuItem>
                            ))}
                         </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                  {loading ? (
                    [1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-[16/10] bg-gray-50 rounded-[3rem] animate-pulse" />
                    ))
                  ) : filteredCollections.length > 0 ? (
                    filteredCollections.map((c) => (
                      <CollectionCard key={c._id} collection={c} onClick={() => handleOpenCollection(c)} onDelete={() => deleteCollection(c._id)} />
                    ))
                  ) : (
                    // Elegant Placeholders when empty
                    [1, 2, 3, 4].map(i => (
                      <div key={i} className="group relative bg-white rounded-[3rem] border border-gray-100 overflow-hidden opacity-40 hover:opacity-100 transition-all duration-700">
                         <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center text-gray-200">
                            <ImageIcon size={48} />
                         </div>
                         <div className="p-10 space-y-4">
                            <div className="h-6 bg-gray-50 rounded-full w-2/3" />
                            <div className="h-3 bg-gray-50 rounded-full w-1/3" />
                            <div className="pt-6 flex gap-2">
                               <div className="h-6 w-16 bg-gray-50 rounded-lg" />
                               <div className="h-6 w-16 bg-gray-50 rounded-lg" />
                            </div>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Detail Header */}
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-gray-100 pb-12">
                <div className="space-y-6">
                  <Button 
                    onClick={handleBackToGrid} 
                    variant="ghost" 
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#121212] px-0 h-auto"
                  >
                    <ChevronLeft size={16} className="mr-2" /> Back to Collections
                  </Button>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#C25E4B] text-white border-none text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl shadow-lg shadow-[#C25E4B]/20">
                      Collection: {selectedCollection?.name}
                    </Badge>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-display font-black text-[#121212] uppercase tracking-tightest leading-[0.9]">
                    Visual <span className="text-gray-200">Sequence</span>
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                   <Button 
                     onClick={() => setIsSettingsOpen(true)}
                     variant="outline" 
                     className="bg-white border-gray-200 text-[10px] font-black uppercase tracking-widest px-8 h-14 rounded-2xl hover:bg-gray-50 hover:border-[#121212] transition-all"
                   >
                     <Settings size={18} className="mr-3" /> Settings
                   </Button>
                   <Button 
                     onClick={() => setIsMediaPickerOpen(true)}
                     className="bg-[#121212] hover:bg-black text-white text-[10px] font-black uppercase tracking-widest px-12 h-14 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all group"
                   >
                     <PlusCircle size={18} className="mr-3 group-hover:rotate-90 transition-transform duration-500" /> Add From Library
                   </Button>
                </div>
              </div>

              {/* Masonry / Sortable Grid */}
              <CollectionDetailView 
                collection={selectedCollection!} 
                onReorder={(newIds) => reorderMedia(selectedCollection!._id, newIds)}
                onRemove={(id) => {
                  const newIds = selectedCollection!.mediaItems.filter(mid => mid !== id);
                  updateCollection(selectedCollection!._id, { mediaItems: newIds });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Collection Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
            <div className="bg-[#121212] p-10 text-white relative">
               <div className="absolute top-0 right-0 p-4">
                 <Button variant="ghost" size="icon" onClick={() => setIsCreateModalOpen(false)} className="text-white/40 hover:text-white hover:bg-white/10 rounded-xl">
                   <X size={24} />
                 </Button>
               </div>
               <div className="space-y-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-[#C25E4B] flex items-center justify-center text-white shadow-xl shadow-[#C25E4B]/20">
                     <Layers size={32} />
                  </div>
                  <DialogHeader className="text-left space-y-1">
                    <DialogTitle className="text-3xl font-display font-black uppercase tracking-tight">Create Collection</DialogTitle>
                    <DialogDescription className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Architectural visual publishing control</DialogDescription>
                  </DialogHeader>
               </div>
            </div>
            <div className="p-10 space-y-8 bg-white">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Collection Name</label>
                  <Input 
                    placeholder="e.g. Skyline Villa Showcase" 
                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-base px-6 shadow-sm"
                    value={newCollData.name}
                    onChange={(e) => setNewCollData({...newCollData, name: e.target.value})}
                  />
               </div>
               
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Collection Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["homepage", "portfolio", "services"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setNewCollData({...newCollData, type: t as any})}
                        className={cn(
                          "h-12 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                          newCollData.type === t 
                            ? "bg-[#C25E4B] text-white border-transparent shadow-lg shadow-[#C25E4B]/20" 
                            : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Description</label>
                  <Textarea 
                    placeholder="Studio narrative and vision..."
                    className="min-h-[100px] rounded-2xl border-gray-100 bg-gray-50 p-6 text-xs font-bold resize-none"
                    value={newCollData.description}
                    onChange={(e) => setNewCollData({...newCollData, description: e.target.value})}
                  />
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Visibility:</label>
                     <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                        {["draft", "published"].map(s => (
                          <button
                            key={s}
                            onClick={() => setNewCollData({...newCollData, status: s as any})}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all",
                              newCollData.status === s ? "bg-white text-[#121212] shadow-sm" : "text-gray-400 hover:text-gray-600"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                     </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">Cancel</Button>
                    <Button 
                      onClick={handleCreateSubmit} 
                      disabled={isCreating}
                      className="bg-[#121212] text-white px-10 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20"
                    >
                      {isCreating ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus size={16} className="mr-2" />}
                      Create Collection
                    </Button>
                  </div>
               </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Other Modals */}
        <MediaSelectionModal 
          isOpen={isMediaPickerOpen} 
          onClose={() => setIsMediaPickerOpen(false)} 
          onSelect={(ids) => {
            const newIds = [...new Set([...(selectedCollection?.mediaItems || []), ...ids])];
            updateCollection(selectedCollection!._id, { mediaItems: newIds });
            setIsMediaPickerOpen(false);
          }}
          existingIds={selectedCollection?.mediaItems || []}
        />
        
        <CollectionSettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          collection={selectedCollection}
          onUpdate={(data) => updateCollection(selectedCollection!._id, data)}
        />
      </div>
    </AdminLayout>
  );
}

// Sub-components

function CollectionCard({ collection, onClick, onDelete }: { collection: CollectionItem, onClick: () => void, onDelete: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
        {collection.coverImage ? (
          <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-100"><ImageIcon size={80} /></div>
        )}
        <div className="absolute inset-0 bg-[#121212]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <Button variant="secondary" className="rounded-2xl px-8 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl">Manage Collection</Button>
        </div>
        <Badge className={cn(
          "absolute top-8 right-8 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border-none shadow-xl",
          collection.status === "published" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
        )}>
          {collection.status}
        </Badge>
      </div>
      <div className="p-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
             <h3 className="text-xl font-display font-black text-[#121212] uppercase tracking-tight group-hover:text-[#C25E4B] transition-colors leading-tight">{collection.name}</h3>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{collection.mediaItems.length} Visual Assets</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon" className="rounded-2xl h-10 w-10 hover:bg-gray-50 transition-all"><MoreVertical size={18} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end" className="w-64 p-3 rounded-[2rem] shadow-2xl border-gray-100">
               <DropdownMenuItem onClick={onClick} className="rounded-xl px-4 py-3 cursor-pointer"><Eye size={16} className="mr-4 text-[#C25E4B]" /><span className="text-[10px] font-black uppercase tracking-widest">Open Collection</span></DropdownMenuItem>
               <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer"><Edit3 size={16} className="mr-4 text-gray-400" /><span className="text-[10px] font-black uppercase tracking-widest">Settings</span></DropdownMenuItem>
               <DropdownMenuSeparator className="bg-gray-50" />
               <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(); }} className="rounded-xl px-4 py-3 text-red-600 cursor-pointer"><Trash2 size={16} className="mr-4" /><span className="text-[10px] font-black uppercase tracking-widest">Purge Showcase</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
           {(collection.showOn || []).map(page => (
             <Badge key={page} variant="outline" className="text-[8px] font-black uppercase tracking-widest border-gray-100 text-gray-400 px-2 py-0.5 rounded-lg">{page}</Badge>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function CollectionDetailView({ collection, onReorder, onRemove }: { collection: CollectionItem, onReorder: (ids: string[]) => void, onRemove: (id: string) => void }) {
  const { items: mediaLibrary } = useMediaStore();
  
  const orderedMedia = useMemo(() => {
    return collection.mediaItems.map(id => mediaLibrary.find(m => m._id === id)).filter(Boolean);
  }, [collection.mediaItems, mediaLibrary]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = collection.mediaItems.indexOf(active.id);
      const newIndex = collection.mediaItems.indexOf(over.id);
      const newIds = arrayMove(collection.mediaItems, oldIndex, newIndex);
      onReorder(newIds);
    }
  };

  return (
    <div className="space-y-10">
      {orderedMedia.length > 0 ? (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <SortableContext 
            items={collection.mediaItems}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {orderedMedia.map((m: any) => (
                <SortableImageCard key={m._id} asset={m} onRemove={() => onRemove(m._id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-gray-50/50 rounded-[4rem] border border-dashed border-gray-100">
           <div className="w-32 h-32 rounded-[3rem] bg-white flex items-center justify-center text-gray-100 shadow-sm shadow-black/5"><ImageIcon size={64} /></div>
           <p className="text-gray-400 text-sm font-medium uppercase tracking-widest italic leading-loose max-w-md mx-auto">This visual sequence is currently empty. Initialize storytelling by adding high-fidelity assets from the Media Library.</p>
           <Button variant="outline" className="h-12 px-10 rounded-2xl text-[9px] font-black uppercase tracking-widest border-gray-100 text-gray-400">View Media Library</Button>
        </div>
      )}
    </div>
  );
}

function SortableImageCard({ asset, onRemove }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: asset._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.3 : 1
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="group relative bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-black/5 hover:border-[#C25E4B]/30 transition-all duration-500"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#121212]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
           <div {...listeners} {...attributes} className="w-12 h-12 rounded-2xl bg-white text-[#121212] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
              <GripVertical size={20} />
           </div>
           <Button onClick={onRemove} variant="destructive" size="icon" className="w-12 h-12 rounded-2xl shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500 delay-75">
              <Trash2 size={20} />
           </Button>
        </div>
      </div>
      <div className="p-6">
         <p className="text-[10px] font-black text-[#121212] uppercase tracking-tight truncate leading-tight">{asset.name}</p>
         <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">{asset.type} • {asset.size}</p>
      </div>
    </div>
  );
}

function MediaSelectionModal({ isOpen, onClose, onSelect, existingIds }: any) {
  const { items: mediaLibrary } = useMediaStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredMedia = useMemo(() => {
    return mediaLibrary.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) && 
      !existingIds.includes(m._id)
    );
  }, [mediaLibrary, search, existingIds]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-7xl h-[90vh] p-0 rounded-[4rem] border-none overflow-hidden shadow-2xl">
         <div className="flex flex-col h-full bg-white">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
               <div className="space-y-1">
                  <h2 className="text-4xl font-display font-black uppercase tracking-tight text-[#121212]">Asset Selection</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select visuals to add to the storytelling sequence</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="relative w-72 group">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#C25E4B] transition-colors" size={20} />
                     <Input 
                       placeholder="Search library..." 
                       className="pl-14 h-12 rounded-2xl bg-white border-gray-100 text-xs font-bold transition-all focus:border-[#C25E4B]" 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <Button onClick={onClose} variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-white"><X size={24} /></Button>
               </div>
            </div>

            <ScrollArea className="flex-1 p-10">
               {filteredMedia.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
                    {filteredMedia.map((m) => (
                      <div 
                        key={m._id} 
                        onClick={() => toggleSelect(m._id)}
                        className={cn(
                          "group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer transition-all border-4",
                          selectedIds.includes(m._id) ? "border-[#C25E4B] ring-4 ring-[#C25E4B]/5" : "border-white hover:border-gray-100 shadow-sm"
                        )}
                      >
                         <img src={m.url} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className={cn(
                           "absolute inset-0 bg-[#C25E4B]/20 flex items-center justify-center transition-all duration-500",
                           selectedIds.includes(m._id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                         )}>
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                              selectedIds.includes(m._id) ? "bg-[#C25E4B] text-white scale-110 shadow-xl" : "bg-white text-gray-400 scale-90"
                            )}>
                               <CheckCircle2 size={24} />
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full py-40 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-[2rem] bg-gray-50 flex items-center justify-center text-gray-200"><Info size={48} /></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">All available library assets are already in this sequence.</p>
                 </div>
               )}
            </ScrollArea>

            <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white">
               <div className="flex items-center gap-4">
                  <Badge className="bg-[#121212] text-white px-4 py-1.5 rounded-xl text-[10px] font-black">{selectedIds.length}</Badge>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assets Staged For Curation</p>
               </div>
               <div className="flex gap-4">
                  <Button onClick={onClose} variant="ghost" className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancel</Button>
                  <Button 
                    disabled={selectedIds.length === 0}
                    onClick={() => onSelect(selectedIds)} 
                    className="bg-[#121212] text-white px-12 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all active:scale-95"
                  >
                    Add To Showcase
                  </Button>
               </div>
            </div>
         </div>
      </DialogContent>
    </Dialog>
  );
}

function CollectionSettingsModal({ isOpen, onClose, collection, onUpdate }: any) {
  const [formData, setFormData] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (collection) {
      setFormData({
        name: collection.name,
        description: collection.description || "",
        status: collection.status,
        showOn: collection.showOn || [],
        tags: (collection.tags || []).join(", "),
        seoTitle: collection.seo?.title || "",
        seoDescription: collection.seo?.description || ""
      });
    }
  }, [collection]);

  if (!formData) return null;

  const handleSubmit = async () => {
    setIsUpdating(true);
    await onUpdate({
      name: formData.name,
      description: formData.description,
      status: formData.status,
      showOn: formData.showOn,
      tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      seo: {
        title: formData.seoTitle,
        description: formData.seoDescription
      }
    });
    setIsUpdating(false);
    onClose();
  };

  const togglePage = (page: string) => {
    setFormData((prev: any) => ({
      ...prev,
      showOn: prev.showOn.includes(page) 
        ? prev.showOn.filter((p: string) => p !== page) 
        : [...prev.showOn, page]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl rounded-[3rem] p-0 border-none overflow-hidden shadow-2xl">
         <div className="flex flex-col h-full bg-white">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
               <div className="space-y-1">
                  <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212]">Showcase Settings</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Editorial Publishing & SEO Control</p>
               </div>
               <Button onClick={onClose} variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-white"><X size={24} /></Button>
            </div>

            <ScrollArea className="flex-1 max-h-[70vh]">
               <div className="p-10 space-y-12">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><Edit3 size={14} /> Showcase Identity</label>
                     <Input 
                       value={formData.name} 
                       onChange={e => setFormData({...formData, name: e.target.value})} 
                       className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-base px-6 shadow-sm" 
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                     <div className="space-y-5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><Globe size={14} /> Publication Status</label>
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                           {["draft", "published"].map(s => (
                             <button
                               key={s}
                               onClick={() => setFormData({...formData, status: s})}
                               className={cn(
                                 "px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                 formData.status === s ? "bg-white text-[#121212] shadow-md" : "text-gray-400 hover:text-gray-600"
                               )}
                             >
                                {s}
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><Layout size={14} /> Site Visibility</label>
                        <div className="flex flex-wrap gap-2">
                           {["homepage", "portfolio", "services", "about"].map(p => (
                             <Badge 
                               key={p}
                               onClick={() => togglePage(p)}
                               variant="outline"
                               className={cn(
                                 "text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg cursor-pointer transition-all border-none",
                                 formData.showOn.includes(p) ? "bg-[#C25E4B] text-white shadow-lg shadow-[#C25E4B]/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                               )}
                             >
                                {p}
                             </Badge>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><FileText size={14} /> Studio Narrative</label>
                     <Textarea 
                       value={formData.description} 
                       onChange={e => setFormData({...formData, description: e.target.value})} 
                       className="min-h-[120px] rounded-[2rem] border-gray-100 bg-gray-50 p-8 text-xs font-bold resize-none leading-loose italic"
                     />
                  </div>

                  <div className="space-y-8 pt-10 border-t border-gray-50">
                     <div className="flex items-center gap-3">
                        <Sparkles size={16} className="text-[#C25E4B]" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#121212]">Meta Discovery (SEO)</h4>
                     </div>
                     <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">SERP Title Override</label>
                           <Input 
                             value={formData.seoTitle} 
                             onChange={e => setFormData({...formData, seoTitle: e.target.value})} 
                             className="h-12 rounded-xl border-gray-100 bg-gray-50/50 text-xs font-bold" 
                           />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Meta Description</label>
                           <Textarea 
                             value={formData.seoDescription} 
                             onChange={e => setFormData({...formData, seoDescription: e.target.value})} 
                             className="min-h-[100px] rounded-2xl border-gray-100 bg-gray-50/50 text-xs font-bold p-6 resize-none" 
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </ScrollArea>

            <div className="p-10 border-t border-gray-50 flex justify-end gap-4 bg-white">
               <Button onClick={onClose} variant="ghost" className="h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">Cancel</Button>
               <Button 
                onClick={handleSubmit} 
                disabled={isUpdating}
                className="bg-[#121212] text-white px-12 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20"
               >
                  {isUpdating ? <Loader2 className="animate-spin mr-2" size={16} /> : <CheckCircle2 size={16} className="mr-2" />}
                  Synchronize Settings
               </Button>
            </div>
         </div>
      </DialogContent>
    </Dialog>
  );
}
