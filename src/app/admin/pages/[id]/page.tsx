"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Layout, 
  Settings, 
  Eye, 
  Plus, 
  GripVertical, 
  Trash2, 
  ImageIcon, 
  Type, 
  Square, 
  Users, 
  Maximize,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Star
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ContentBlock {
  id: string;
  type: "Hero" | "Text" | "Image" | "CTA" | "Testimonials" | "Gallery";
  content: any;
}

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: "1", type: "Hero", content: { title: "Architecture with Purpose", subtitle: "Designing spaces that inspire and endure." } },
    { id: "2", type: "Text", content: { body: "Our studio focuses on the intersection of sustainability and luxury..." } },
  ]);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Editor Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm sticky top-24 z-40 border border-gray-100">
          <div className="flex items-center gap-6">
            <Link href="/admin/pages">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div className="h-10 w-[1px] bg-gray-100" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-black text-[#121212] uppercase tracking-tighter">
                  {params.id === "new" ? "Untitled Page" : "Home Page"}
                </h2>
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-700 border-none">Published</Badge>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last saved at 12:45 PM Today</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#121212] rounded-xl px-6">
              <Eye size={16} className="mr-2" /> Preview
            </Button>
            <Button className="bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest px-8 h-12 rounded-2xl shadow-xl shadow-black/10 transition-all">
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-center">
            <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <TabsTrigger value="content" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <Layout size={14} className="mr-2" /> Content
              </TabsTrigger>
              <TabsTrigger value="seo" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <Globe size={14} className="mr-2" /> SEO & Meta
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl px-8 py-2 text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#121212] data-[state=active]:text-white">
                <Settings size={14} className="mr-2" /> Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="space-y-10">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              {/* Content Blocks Area */}
              <div className="xl:col-span-8 space-y-6">
                {blocks.map((block, index) => (
                  <Card key={block.id} className="bg-white border-none shadow-sm rounded-3xl group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#121212] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="p-6 pb-2 border-b border-gray-50 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical size={16} className="text-gray-300 cursor-grab active:cursor-grabbing" />
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B]">{block.type} Section</CardTitle>
                      </div>
                      <Button onClick={() => removeBlock(block.id)} variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-red-500 rounded-lg">
                        <Trash2 size={14} />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-8">
                      {block.type === "Hero" && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Headline</label>
                            <Input placeholder="Enter hero headline..." className="h-12 text-xl font-black uppercase tracking-tighter rounded-xl border-gray-100" defaultValue={block.content.title} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subtitle</label>
                            <Textarea placeholder="Enter subtitle..." className="min-h-[100px] rounded-xl border-gray-100 text-sm" defaultValue={block.content.subtitle} />
                          </div>
                        </div>
                      )}
                      {block.type === "Text" && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Body Content</label>
                          <Textarea placeholder="Write editorial content..." className="min-h-[200px] rounded-xl border-gray-100 text-sm leading-relaxed" defaultValue={block.content.body} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Add Block Toolbar */}
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group hover:border-[#C25E4B]/30 hover:bg-[#C25E4B]/5 transition-all">
                  <div className="text-center">
                    <p className="text-sm font-black text-[#121212] uppercase tracking-tighter">Add Page Section</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Enhance your page with modular editorial blocks.</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button onClick={() => addBlock("Hero")} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-gray-200 bg-white">
                      <Maximize size={12} className="mr-2" /> Hero
                    </Button>
                    <Button onClick={() => addBlock("Text")} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-gray-200 bg-white">
                      <Type size={12} className="mr-2" /> Text
                    </Button>
                    <Button onClick={() => addBlock("Image")} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-gray-200 bg-white">
                      <ImageIcon size={12} className="mr-2" /> Image
                    </Button>
                    <Button onClick={() => addBlock("CTA")} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-gray-200 bg-white">
                      <Square size={12} className="mr-2" /> Call to Action
                    </Button>
                    <Button onClick={() => addBlock("Testimonials")} variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-gray-200 bg-white">
                      <Users size={12} className="mr-2" /> Testimonials
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="xl:col-span-4 space-y-8">
                <Card className="bg-[#121212] text-white border-none shadow-xl rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Info size={80} />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg font-display font-black uppercase tracking-tight">Status & Visibility</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">Manage how the world sees this page.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Publication Status</label>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-xs font-bold text-green-400 flex items-center gap-2">
                          <Globe size={14} /> Published
                        </span>
                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Change</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Scheduling</label>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-400">
                        <Clock size={14} /> Immediately
                      </div>
                    </div>
                    <Separator className="bg-white/5" />
                    <Button className="w-full bg-[#C25E4B] hover:bg-[#A34A39] text-white h-12 rounded-xl text-xs font-black uppercase tracking-widest">
                      Update Live Page
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-sm rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">Quick Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Page Slug</label>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="text-xs text-gray-400 font-medium">maven.com/</span>
                        <input className="bg-transparent border-none focus:ring-0 text-xs font-bold text-[#121212] p-0 w-full" defaultValue="about" />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100 hover:text-[#C25E4B]">
                      <ExternalLink size={14} className="mr-2" /> View Live Version
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3 mb-2">
                  <Globe size={18} className="text-[#C25E4B]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B]">Optimization Hub</span>
                </div>
                <CardTitle className="text-2xl font-display font-black uppercase tracking-tight text-[#121212]">Search Engine Optimization</CardTitle>
                <CardDescription className="text-gray-400 text-sm mt-1">Configure meta tags, open graph metadata, and indexing settings.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Meta Title</label>
                      <Input placeholder="Enter SEO title..." className="h-12 rounded-xl border-gray-100" defaultValue="About Our Architectural Studio | Maven Projects" />
                      <div className="flex justify-between items-center px-1">
                        <p className="text-[10px] text-gray-400 font-medium italic">Recommended: 50-60 characters</p>
                        <p className="text-[10px] font-bold text-green-500">42 chars</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Meta Description</label>
                      <Textarea placeholder="Enter SEO description..." className="min-h-[120px] rounded-xl border-gray-100 text-sm leading-relaxed" defaultValue="Learn more about Maven Projects, a luxury architectural firm specializing in sustainable residential design and contemporary interior spaces." />
                      <div className="flex justify-between items-center px-1">
                        <p className="text-[10px] text-gray-400 font-medium italic">Recommended: 120-160 characters</p>
                        <p className="text-[10px] font-bold text-amber-500">145 chars</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Canonical URL</label>
                      <Input placeholder="https://..." className="h-12 rounded-xl border-gray-100" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Google Search Preview</label>
                      <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
                        <p className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer">About Our Architectural Studio | Maven Projects</p>
                        <p className="text-[#006621] text-sm italic">https://maven.com/about</p>
                        <p className="text-[#4d5156] text-sm leading-relaxed">Learn more about Maven Projects, a luxury architectural firm specializing in sustainable residential design and contemporary interior spaces.</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#C25E4B]/5 border border-[#C25E4B]/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-[#C25E4B]" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#C25E4B]">SEO Insights</p>
                      </div>
                      <p className="text-xs text-[#C25E4B] font-bold leading-relaxed italic">
                        Your meta description is well-balanced. To reach a 100% score, consider adding your primary keyword "sustainable architecture" earlier in the text.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
             <Card className="bg-white border-none shadow-sm rounded-[2.5rem] p-10">
               <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                 <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <Settings size={32} />
                 </div>
                 <h2 className="text-xl font-display font-black uppercase tracking-tight text-[#121212]">Advanced Configuration</h2>
                 <p className="text-gray-400 text-sm max-w-md">Manage advanced page settings including template selection, header transparency, and custom JavaScript injection.</p>
                 <Button variant="outline" className="rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest border-gray-100 mt-6">Configure Modules</Button>
               </div>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
