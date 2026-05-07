"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, Search, Filter, FolderPlus, Grid, List, MoreVertical, 
  Download, Trash2, FileText, Info, Maximize2, ChevronRight, 
  Folder, ImageIcon, Upload, Copy, X, Clock, HardDrive, 
  ArrowUpDown, CheckCircle2, AlertCircle, Loader2, Edit3, 
  ExternalLink, Share2, FileCode, Presentation, FileVideo
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { useDropzone } from "react-dropzone";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Store & Components
import { useMediaStore, MediaItem, FolderItem } from "@/store/useMediaStore";

// File Type Helper
const getFileIcon = (type: string) => {
  switch (type) {
    case "image": return <ImageIcon size={18} />;
    case "video": return <FileVideo size={18} />;
    case "pdf": return <FileText size={18} />;
    case "blueprint": return <FileCode size={18} />;
    case "document": return <Presentation size={18} />;
    default: return <FileText size={18} />;
  }
};

export default function MediaLibraryPage() {
  const { 
    items, folders, loading, fetchMedia, fetchFolders, 
    uploadMedia, deleteMedia, createFolder 
  } = useMediaStore();
  
  // UI States
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("All");
  const [activeType, setActiveType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  
  // Modal & Drawer States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchMedia();
    fetchFolders();
  }, [fetchMedia, fetchFolders]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = activeFolder === "All" || item.folder === activeFolder;
      const matchesType = activeType === "All" || item.type === activeType.toLowerCase();
      return matchesSearch && matchesFolder && matchesType;
    });
  }, [items, searchQuery, activeFolder, activeType]);

  const handleAssetClick = (asset: MediaItem) => {
    setSelectedAsset(asset);
    setIsPreviewOpen(true);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Asset URL copied to clipboard");
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" richColors />
      
      <div className="space-y-12 pb-32">
        {/* Premium Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-gray-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-[#C25E4B] text-[#C25E4B] text-[10px] font-black uppercase tracking-[0.25em] bg-[#C25E4B]/5 px-4 py-1.5 rounded-lg">
                Media Management
              </Badge>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{items.length} Assets Registered</span>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-6xl md:text-7xl font-display font-black text-[#121212] uppercase tracking-tightest leading-[0.9]">
                Media <span className="text-gray-200">Library</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium max-w-3xl leading-relaxed italic">
                Centralized architectural asset storage for renders, blueprints, studio documents, and project photography. Secure, high-performance visual orchestration.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white border-gray-200 text-[10px] font-black uppercase tracking-widest px-8 h-14 rounded-2xl hover:bg-gray-50 hover:border-[#121212] transition-all"
            >
              <FolderPlus size={18} className="mr-3" /> New Folder
            </Button>
            <Button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-[#121212] hover:bg-black text-white text-[10px] font-black uppercase tracking-widest px-12 h-14 rounded-2xl shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all group"
            >
              <Upload size={18} className="mr-3 group-hover:rotate-6 transition-transform" /> Upload Media
            </Button>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="sticky top-4 z-40 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white/95 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C25E4B] transition-colors" size={20} />
              <Input 
                placeholder="Search files, tags, projects..." 
                className="pl-16 h-14 rounded-3xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-[#C25E4B] text-xs font-black uppercase tracking-widest transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="h-10 w-[1px] bg-gray-100 hidden xl:block" />
            
            <div className="flex items-center gap-2">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] hover:bg-gray-50">
                     <Filter size={18} className="mr-3" /> {activeType}
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56 p-3 rounded-2xl shadow-2xl border-gray-100">
                   {["All", "Images", "PDFs", "Videos", "Blueprints", "Documents"].map(type => (
                     <DropdownMenuItem key={type} onClick={() => setActiveType(type)} className="rounded-xl px-4 py-3 cursor-pointer">
                        <span className="text-[10px] font-black uppercase tracking-widest">{type}</span>
                     </DropdownMenuItem>
                   ))}
                 </DropdownMenuContent>
               </DropdownMenu>

               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#121212] hover:bg-gray-50">
                     <ArrowUpDown size={18} className="mr-3" /> {sortBy}
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-64 p-3 rounded-2xl shadow-2xl border-gray-100">
                   <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 p-3">Sort Criteria</DropdownMenuLabel>
                   <DropdownMenuSeparator className="bg-gray-50" />
                   {["Newest", "Oldest", "Name", "Size"].map(sort => (
                     <DropdownMenuItem key={sort} onClick={() => setSortBy(sort)} className="rounded-xl px-4 py-3 cursor-pointer">
                        <span className="text-[10px] font-black uppercase tracking-widest">{sort}</span>
                     </DropdownMenuItem>
                   ))}
                 </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-2xl">
            <Button 
              onClick={() => setViewMode("grid")} 
              variant="ghost" 
              size="icon" 
              className={cn("h-11 w-11 rounded-xl transition-all", viewMode === "grid" ? "bg-white text-[#121212] shadow-lg" : "text-gray-400")}
            >
              <Grid size={20} />
            </Button>
            <Button 
              onClick={() => setViewMode("list")} 
              variant="ghost" 
              size="icon" 
              className={cn("h-11 w-11 rounded-xl transition-all", viewMode === "list" ? "bg-white text-[#121212] shadow-lg" : "text-gray-400")}
            >
              <List size={20} />
            </Button>
          </div>
        </div>

        {/* Folders Section */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212]">Folders</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{folders.length} Collections</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-6">
              {folders.map((folder) => (
                <motion.div
                  key={folder._id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveFolder(folder.name)}
                  className={cn(
                    "group p-6 rounded-[2.5rem] border bg-white transition-all cursor-pointer",
                    activeFolder === folder.name ? "border-[#C25E4B] ring-4 ring-[#C25E4B]/5" : "border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-black/5"
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-500",
                      activeFolder === folder.name ? "bg-[#C25E4B] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-[#C25E4B]/10 group-hover:text-[#C25E4B]"
                    )}>
                      <Folder size={24} />
                    </div>
                    <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={16} /></Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent className="rounded-2xl shadow-2xl border-gray-100 p-2">
                          <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer">Rename</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer text-red-600">Purge Collection</DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-sm font-black text-[#121212] uppercase tracking-tight truncate">{folder.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                     <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{folder.itemCount} Items</p>
                     <div className="w-1 h-1 rounded-full bg-gray-200" />
                     <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{new Date(folder.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Media Grid Section */}
        <div className="space-y-8 pt-8">
           <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212]">
                {activeFolder === "All" ? "Recent Uploads" : activeFolder}
              </h2>
              <div className="flex items-center gap-4">
                 {activeFolder !== "All" && (
                   <Button onClick={() => setActiveFolder("All")} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B] hover:bg-[#C25E4B]/5">Clear Selection</Button>
                 )}
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{filteredItems.length} Visible Assets</p>
              </div>
           </div>

           {loading && items.length === 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="space-y-4">
                    <div className="aspect-square bg-gray-50 rounded-[3rem] animate-pulse border border-gray-100" />
                    <div className="h-4 bg-gray-50 rounded-full w-2/3 animate-pulse mx-auto" />
                 </div>
               ))}
             </div>
           ) : filteredItems.length > 0 ? (
             <motion.div 
               layout
               className={cn(
                 "grid gap-8",
                 viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" : "grid-cols-1"
               )}
             >
               {filteredItems.map((item) => (
                 <motion.div
                   key={item._id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   whileHover={{ y: -10 }}
                   onClick={() => handleAssetClick(item)}
                   className={cn(
                     "group relative bg-white border border-gray-100 rounded-[3rem] overflow-hidden transition-all cursor-pointer",
                     viewMode === "grid" ? "aspect-square" : "h-24 flex items-center px-8",
                     "hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:border-[#C25E4B]/30"
                   )}
                 >
                   <div className={cn(
                     "relative bg-gray-50 overflow-hidden",
                     viewMode === "grid" ? "h-2/3" : "h-16 w-16 rounded-2xl flex-shrink-0"
                   )}>
                      {item.type === "image" ? (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C25E4B]/20">
                           {getFileIcon(item.type)}
                        </div>
                      )}
                      {viewMode === "grid" && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                             <Maximize2 size={20} className="text-[#121212]" />
                           </div>
                        </div>
                      )}
                   </div>

                   <div className={cn(
                     "flex-1 p-6",
                     viewMode === "list" && "flex items-center justify-between"
                   )}>
                     <div className="min-w-0">
                       <p className="text-[11px] font-black text-[#121212] uppercase tracking-tighter truncate leading-tight group-hover:text-[#C25E4B] transition-colors">{item.name}</p>
                       <div className="flex items-center gap-3 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.type} • {item.size}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-200" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                       </div>
                     </div>
                     
                     {viewMode === "list" && (
                       <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-gray-200 px-4 py-1 rounded-lg">{item.folder}</Badge>
                          <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-white"><MoreVertical size={16} /></Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent className="rounded-2xl shadow-2xl border-gray-100 w-56 p-2">
                                <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer">Preview</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer">Copy URL</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer text-red-600">Delete</DropdownMenuItem>
                             </DropdownMenuContent>
                          </DropdownMenu>
                       </div>
                     )}
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="py-40 flex flex-col items-center justify-center text-center space-y-10 bg-white rounded-[4rem] border border-dashed border-gray-100"
             >
               <div className="w-40 h-40 rounded-[4rem] bg-gray-50 flex items-center justify-center text-gray-200">
                 <ImageIcon size={80} />
               </div>
               <div className="space-y-4 max-w-lg">
                 <h3 className="text-4xl font-display font-black uppercase tracking-tightest text-[#121212]">No media uploaded yet.</h3>
                 <p className="text-gray-400 text-sm font-medium uppercase tracking-widest leading-loose italic">
                   Upload architectural renders, blueprints, or project photography to begin organizing your studio assets.
                 </p>
               </div>
               <Button onClick={() => setIsUploadOpen(true)} className="bg-[#121212] text-white px-12 h-16 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-black/30 hover:-translate-y-2 transition-all">
                 <Upload size={20} className="mr-4" /> Start First Upload
               </Button>
             </motion.div>
           )}
        </div>

        {/* Upload Modal Component */}
        <UploadMediaModal 
          isOpen={isUploadOpen} 
          onClose={() => setIsUploadOpen(false)} 
          onSuccess={() => { fetchMedia(); fetchFolders(); }}
        />

        {/* Preview Drawer Component */}
        <AssetPreviewDrawer 
          isOpen={isPreviewOpen} 
          onClose={() => setIsPreviewOpen(false)} 
          asset={selectedAsset}
          onDelete={async (id) => {
            const success = await deleteMedia(id);
            if (success) setIsPreviewOpen(false);
          }}
        />
      </div>
    </AdminLayout>
  );
}

// Sub-components

function UploadMediaModal({ isOpen, onClose, onSuccess }: any) {
  const { uploadMedia } = useMediaStore();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);
    for (const file of acceptedFiles) {
      setCurrentFile(file.name);
      setProgress(20);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      
      const success = await uploadMedia(formData);
      if (success) {
        setProgress(100);
        setTimeout(() => setProgress(0), 1000);
      }
    }
    setIsUploading(false);
    setCurrentFile(null);
    onSuccess();
    onClose();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4']
    }
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#121212]/40 backdrop-blur-md">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100"
           >
              <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                 <div className="space-y-1">
                    <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212]">Upload Media</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Add assets to studio repository</p>
                 </div>
                 <Button onClick={onClose} variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-gray-50"><X size={24} /></Button>
              </div>

              <div className="p-10 space-y-8">
                 {!isUploading ? (
                   <div 
                     {...getRootProps()} 
                     className={cn(
                       "h-80 border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center gap-6 transition-all cursor-pointer",
                       isDragActive ? "border-[#C25E4B] bg-[#C25E4B]/5 scale-[0.98]" : "border-gray-100 hover:border-[#C25E4B]/40 hover:bg-gray-50"
                     )}
                   >
                     <input {...getInputProps()} />
                     <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-xl shadow-black/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-all">
                       <Upload size={32} />
                     </div>
                     <div className="text-center space-y-2">
                       <p className="text-sm font-black text-[#121212] uppercase tracking-widest">Drag & Drop files here</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Supported: JPG, PNG, WEBP, PDF, MP4 • Max: 25MB</p>
                     </div>
                     <Button className="bg-[#121212] text-white px-8 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Browse Files</Button>
                   </div>
                 ) : (
                   <div className="h-80 flex flex-col items-center justify-center space-y-8">
                      <div className="relative">
                         <div className="w-24 h-24 rounded-[2rem] border-4 border-gray-100 border-t-[#C25E4B] animate-spin" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-black text-[#121212]">{progress}%</span>
                         </div>
                      </div>
                      <div className="text-center space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deploying Asset...</p>
                         <p className="text-sm font-black text-[#121212] uppercase tracking-tighter truncate max-w-sm">{currentFile}</p>
                      </div>
                      <div className="w-full max-w-md h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                         <motion.div 
                           className="h-full bg-[#C25E4B] shadow-[0_0_12px_rgba(194,94,75,0.4)]" 
                           initial={{ width: 0 }} 
                           animate={{ width: `${progress}%` }} 
                         />
                      </div>
                   </div>
                 )}
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function AssetPreviewDrawer({ isOpen, onClose, asset, onDelete }: any) {
  if (!asset) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-[#121212]/30 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[120] w-full max-w-2xl bg-white shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.1)] flex flex-col border-l border-gray-50"
          >
            <div className="p-10 border-b border-gray-50 flex items-center justify-between shrink-0">
               <div className="space-y-1">
                  <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#121212]">Asset Details</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Operational metadata inspection</p>
               </div>
               <Button onClick={onClose} variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-gray-50"><X size={24} /></Button>
            </div>

            <ScrollArea className="flex-1">
               <div className="p-10 space-y-12 pb-32">
                  {/* Media Preview Container */}
                  <div className="aspect-video rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl border-4 border-white relative group">
                     {asset.type === "image" ? (
                       <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center text-[#C25E4B]/10 space-y-4">
                          {getFileIcon(asset.type)}
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">{asset.name}</p>
                       </div>
                     )}
                     <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="rounded-2xl w-14 h-14 shadow-2xl"><Maximize2 size={24} /></Button>
                     </div>
                  </div>

                  {/* Core Properties */}
                  <div className="grid grid-cols-2 gap-6">
                     {[
                       { label: "File Name", value: asset.name, icon: <FileText size={14} /> },
                       { label: "Asset Type", value: asset.type, icon: <Info size={14} /> },
                       { label: "Dimensions", value: asset.dimensions || "Vector / Doc", icon: <Maximize2 size={14} /> },
                       { label: "Payload", value: asset.size, icon: <HardDrive size={14} /> },
                       { label: "Registered", value: new Date(asset.createdAt).toLocaleDateString(), icon: <Clock size={14} /> },
                       { label: "Originator", value: asset.uploadedBy || "Studio Director", icon: <Info size={14} /> }
                     ].map((prop) => (
                       <div key={prop.label} className="p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">{prop.icon} {prop.label}</p>
                          <p className="text-sm font-black text-[#121212] uppercase tracking-tighter truncate">{prop.value}</p>
                       </div>
                     ))}
                  </div>

                  {/* Metadata Editor Preview */}
                  <div className="space-y-8 p-10 rounded-[3rem] bg-gray-50/30 border border-gray-50">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] flex items-center gap-2"><Edit3 size={14} /> Descriptive Alt Text</label>
                        <Input defaultValue={asset.altText || asset.name} className="h-14 rounded-2xl border-gray-100 bg-white focus:border-[#C25E4B] transition-all px-6 text-xs font-bold" />
                     </div>
                     
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] flex items-center gap-2"><Edit3 size={14} /> Asset Taxonomy (Tags)</label>
                        <div className="flex flex-wrap gap-2 p-6 bg-white rounded-2xl border border-gray-100 shadow-inner">
                           {asset.tags.length > 0 ? asset.tags.map((tag: string) => (
                             <Badge key={tag} className="bg-gray-100 text-gray-600 border-none px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase">{tag}</Badge>
                           )) : <p className="text-[10px] text-gray-400 font-bold uppercase italic">No tags assigned</p>}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] flex items-center gap-2"><Share2 size={14} /> Distributed URL</label>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                           <Input readOnly value={asset.url} className="h-10 border-none bg-transparent text-[10px] font-medium p-0 focus:ring-0 outline-none" />
                           <Button onClick={() => { navigator.clipboard.writeText(asset.url); toast.success("URL Copied"); }} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-50"><Copy size={16} /></Button>
                        </div>
                     </div>
                  </div>
               </div>
            </ScrollArea>

            {/* Sticky Actions */}
            <div className="p-10 bg-gray-50/90 border-t border-gray-100 flex gap-4 shrink-0 backdrop-blur-xl">
               <Button className="flex-1 bg-[#121212] text-white hover:bg-black h-16 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-black/20">
                  <ExternalLink size={20} className="mr-4" /> Download Original
               </Button>
               <Button 
                 onClick={() => onDelete(asset._id)}
                 variant="ghost" 
                 className="w-20 h-16 rounded-[2rem] text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-100/30"
               >
                  <Trash2 size={24} />
               </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
