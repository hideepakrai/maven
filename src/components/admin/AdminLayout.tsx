"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  User,
  BookOpen,
  UserCircle,
  Calendar,
  BarChart3,
  Command,
  FileText,
  Layers,
  FolderOpen,
  ShieldCheck,
  Globe,
  Database
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SidebarBrand } from "./SidebarBrand";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    label: "Operations",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Projects", href: "/admin/projects", icon: Briefcase, badge: "8" },
      { name: "Clients", href: "/admin/clients", icon: Users },
      { name: "Appointments", href: "/admin/appointments", icon: Calendar },
      { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, badge: "New" },
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Content Management",
    items: [
      { name: "Pages", href: "/admin/pages", icon: FileText },
      { name: "Media Library", href: "/admin/media", icon: FolderOpen },
      { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
      { name: "Blog", href: "/admin/blog", icon: BookOpen },
    ],
  },
  {
    label: "System Settings",
    items: [
      { name: "Team", href: "/admin/team", icon: UserCircle },
      { name: "Roles & Access", href: "/admin/roles", icon: ShieldCheck },
      { name: "Site Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItems = (items: NavItem[]) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-300",
              isActive
                ? "text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            )}
          >
            {isActive && (
              <div className="absolute left-0 w-1 h-5 bg-[#C25E4B] rounded-r-full shadow-[0_0_12px_rgba(194,94,75,0.8)]" />
            )}
            
            <item.icon size={18} className={cn(
              "transition-transform duration-300 group-hover:scale-110",
              isActive ? "text-[#C25E4B]" : "text-gray-500 group-hover:text-gray-300"
            )} />
            
            {!isSidebarCollapsed && (
              <span className="truncate flex-1">{item.name}</span>
            )}

            {!isSidebarCollapsed && item.badge && (
              <span className={cn(
                "px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                item.badge === "New" ? "bg-[#C25E4B] text-white" : "bg-white/10 text-gray-400"
              )}>
                {item.badge}
              </span>
            )}

            {isSidebarCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#121212] text-white text-[10px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                {item.name}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[#f5f3ef] font-inter selection:bg-[#C25E4B]/20 selection:text-[#C25E4B]">
      {/* Sidebar for Desktop */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen hidden md:flex flex-col bg-[#121212] text-white transition-all duration-500 ease-in-out border-r border-white/5 z-[60]",
          isSidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/5 pr-4">
          <SidebarBrand isCollapsed={isSidebarCollapsed} />
          {!isSidebarCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed(true)}
              className="text-gray-500 hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft size={18} />
            </Button>
          )}
        </div>

        {isSidebarCollapsed && (
          <div className="flex justify-center py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed(false)}
              className="text-gray-500 hover:bg-white/5 hover:text-white"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1 px-4 py-6 custom-scrollbar">
          <div className="space-y-8">
            {navigation.map((section) => (
              <div key={section.label} className="space-y-2">
                {!isSidebarCollapsed && (
                  <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                    {section.label}
                  </h3>
                )}
                {renderNavItems(section.items)}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 mt-auto border-t border-white/5">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-3 text-gray-500 hover:bg-white/5 hover:text-red-400 justify-start rounded-xl px-3 py-6 transition-colors",
              isSidebarCollapsed && "px-0 justify-center"
            )}
          >
            <LogOut size={20} />
            {!isSidebarCollapsed && <span className="font-semibold text-sm text-gray-400">Terminate</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-72"
      )}>
        {/* Top Navbar */}
        <header className={cn(
          "h-20 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-lg shadow-gray-200/20" 
            : "bg-transparent border-transparent"
        )}>
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#121212] text-white border-0 w-80">
                <div className="flex h-20 items-center px-8 border-b border-white/5">
                   <SidebarBrand isCollapsed={false} />
                </div>
                <ScrollArea className="h-[calc(100vh-80px)] p-6">
                  <div className="space-y-8">
                    {navigation.map((section) => (
                      <div key={section.label} className="space-y-2">
                        <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                          {section.label}
                        </h3>
                        <nav className="space-y-1">
                          {section.items.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                                  isActive
                                    ? "bg-[#C25E4B]/10 text-[#C25E4B]"
                                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                                )}
                              >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                                {item.badge && (
                                  <Badge className="ml-auto bg-[#C25E4B] text-white text-[10px]">{item.badge}</Badge>
                                )}
                              </Link>
                            );
                          })}
                        </nav>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-3 bg-gray-100/50 px-4 py-2 rounded-2xl border border-gray-200/50 group focus-within:bg-white focus-within:border-[#C25E4B]/30 transition-all">
              <Search size={18} className="text-gray-400 group-focus-within:text-[#C25E4B]" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="bg-transparent border-0 outline-none text-sm font-medium w-64 placeholder:text-gray-400"
              />
              <div className="px-1.5 py-0.5 rounded-md bg-gray-200 text-[10px] font-bold text-gray-500">⌘K</div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-xl">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#C25E4B] rounded-full border-2 border-white" />
            </Button>
            
            <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-gray-100 rounded-xl transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#C25E4B] flex items-center justify-center font-black text-white shadow-lg shadow-[#C25E4B]/20">
                    A
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-[13px] font-bold text-[#121212]">Princy Singh</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Studio Director</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest text-gray-400">Account Control</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                   <User size={16} className="mr-3 text-gray-400" /><span className="text-sm font-semibold">Director Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer">
                   <Settings size={16} className="mr-3 text-gray-400" /><span className="text-sm font-semibold">Studio Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-red-600 focus:text-red-700 cursor-pointer">
                   <LogOut size={16} className="mr-3" /><span className="text-sm font-semibold">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
