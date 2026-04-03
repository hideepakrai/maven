"use client";

import React from "react";
import { 
  User, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Save, 
  Camera,
  Mail,
  Smartphone,
  MapPin
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-black text-[#121212] uppercase tracking-tighter">
            System Settings
          </h1>
          <p className="text-gray-500 mt-1">Configure your profile, website behavior, and security preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-gray-100/80 p-1 rounded-xl mb-8 border border-gray-200 h-12">
            <TabsTrigger value="profile" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#C25E4B] font-bold uppercase text-[10px] tracking-widest h-full">
               <User size={14} className="mr-2" /> My Profile
            </TabsTrigger>
            <TabsTrigger value="site" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#C25E4B] font-bold uppercase text-[10px] tracking-widest h-full">
               <Globe size={14} className="mr-2" /> Website Config
            </TabsTrigger>
            <TabsTrigger value="notifications" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#C25E4B] font-bold uppercase text-[10px] tracking-widest h-full">
               <Bell size={14} className="mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#C25E4B] font-bold uppercase text-[10px] tracking-widest h-full">
               <ShieldCheck size={14} className="mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 bg-white border-gray-100 shadow-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center relative border border-gray-200 overflow-hidden">
                    <User size={64} className="text-gray-300" />
                    <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                      <Camera size={20} />
                      <span className="text-[10px] font-bold uppercase mt-1">Change</span>
                    </button>
                  </div>
                  <CardTitle className="mt-4 text-xl font-display font-black text-[#121212]">Admin User</CardTitle>
                  <CardDescription>Senior Architect / Admin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6 border-t border-gray-50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">Username</span>
                    <span className="font-bold text-[#121212]">@minnaro_admin</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">Access Level</span>
                    <Badge className="bg-[#C25E4B] text-white text-[9px] uppercase font-bold">Owner</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">First Name</Label>
                       <Input className="bg-gray-50 border-gray-200" defaultValue="Minnaro" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Last Name</Label>
                       <Input className="bg-gray-50 border-gray-200" defaultValue="Architects" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</Label>
                     <Input className="bg-gray-50 border-gray-200" defaultValue="hello@minnaro.com" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Bio / Professional Summary</Label>
                     <Textarea className="bg-gray-50 border-gray-200 resize-none" rows={4} defaultValue="Founder and lead architect at Minnaro Studio. Focused on minimalist, robust designs." />
                  </div>
                  <div className="flex justify-end pt-4">
                     <Button className="bg-[#121212] hover:bg-black text-white px-8 uppercase font-bold text-xs tracking-widest">
                       <Save size={16} className="mr-2" /> Save Changes
                     </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Website Config */}
          <TabsContent value="site" className="space-y-6 outline-none">
             <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                    Site Branding & Global Content
                  </CardTitle>
                  <CardDescription>Manage how your studio appears to the world.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C25E4B]">Public Contact Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                              <Smartphone size={18} className="text-gray-400" />
                           </div>
                           <div className="flex-1">
                              <Input className="h-10 bg-gray-50 border-gray-200" defaultValue="+1 212 555 0199" />
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                              <MapPin size={18} className="text-gray-400" />
                           </div>
                           <div className="flex-1">
                              <Input className="h-10 bg-gray-50 border-gray-200" defaultValue="105 Central Park West, New York, NY" />
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C25E4B]">Studio Motto</h4>
                       <Textarea className="bg-gray-50 border-gray-200 min-h-[140px]" defaultValue="Designing with discipline, warmth, and long-term clarity. Beyond architecture, creating places for learning, culture, and everyday calm." />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                     <p className="text-xs text-gray-400 max-w-md">These changes will reflect immediately on the main portfolio website home and contact pages.</p>
                     <Button className="bg-[#121212] hover:bg-black text-white px-8 uppercase font-bold text-xs tracking-widest">
                       Apply Globally
                     </Button>
                  </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Notifications config */}
          <TabsContent value="notifications" className="space-y-6 outline-none">
             <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-display font-black uppercase tracking-tight text-[#121212]">
                    Alert Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified of system events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                     {[
                       { id: "notify-inq", label: "New Project Inquiries", desc: "Receive immediate alerts when a potential client reaches out." },
                       { id: "notify-proj", label: "Project Status Changes", desc: "Get notified when a project is moved to a new phase." },
                       { id: "notify-auth", label: "Security & Login Alerts", desc: "Stay informed about login attempts from new devices." },
                       { id: "notify-mkt", label: "Weekly Growth Insights", desc: "A summary of site traffic and portfolio performance." }
                     ].map((item) => (
                       <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                          <Checkbox id={item.id} className="mt-1 border-gray-300 data-[state=checked]:bg-[#C25E4B] data-[state=checked]:border-[#C25E4B]" />
                          <div className="space-y-0.5">
                             <Label htmlFor={item.id} className="text-sm font-bold text-[#121212] cursor-pointer">{item.label}</Label>
                             <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-end">
                     <Button className="bg-[#121212] hover:bg-black text-white px-8 uppercase font-bold text-xs tracking-widest">
                        Save Preferences
                     </Button>
                  </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
