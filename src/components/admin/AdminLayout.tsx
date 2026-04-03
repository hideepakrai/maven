"use client";

import React, { useState } from "react";
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

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F4F4F0] font-inter">
      {/* Sidebar for Desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-[#121212] text-white transition-all duration-300 ease-in-out border-r border-white/10",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          {!isSidebarCollapsed && (
            <span className="text-lg font-display font-black tracking-tighter uppercase text-[#C25E4B]">
              Minnaro
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-white hover:bg-white/10"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#C25E4B] text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} className={cn(isActive ? "text-white" : "text-gray-400")} />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-3 text-gray-400 hover:bg-white/5 hover:text-white justify-start",
              isSidebarCollapsed && "px-0 justify-center"
            )}
          >
            <LogOut size={20} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#121212] text-white border-0 w-64">
                <div className="flex h-16 items-center px-6 border-b border-white/10">
                  <span className="text-lg font-display font-black tracking-tighter uppercase text-[#C25E4B]">
                    Minnaro
                  </span>
                </div>
                <nav className="p-4 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#C25E4B] text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-200 w-64">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent border-none focus:ring-0 text-xs w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-gray-500">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#C25E4B] rounded-full border-2 border-white" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 border border-gray-200">
                  <User size={20} className="text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
