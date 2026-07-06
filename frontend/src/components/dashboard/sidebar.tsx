"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, ScanSearch, Github, Linkedin, Mail,
  PenTool, MessageSquare, Briefcase, GraduationCap, Map, FolderGit2,
  Star, GitBranch, Users, Sparkles, Code, Trophy, BarChart3, Flame,
  Bot, Network, Settings, ChevronLeft, Menu,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV, APP_NAME } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FileText, ScanSearch, Github, Linkedin, Mail,
  PenTool, MessageSquare, Briefcase, GraduationCap, Map, FolderGit2,
  Star, GitBranch, Users, Sparkles, Code, Trophy, BarChart3, Flame,
  Bot, Network,
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center shrink-0">
            <Image src="/logo.svg" alt="CareerPilot AI Logo" width={32} height={32} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-sm tracking-tight overflow-hidden whitespace-nowrap"
              >
                {APP_NAME}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/5 transition-colors"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3 space-y-6">
        {DASHBOARD_NAV.map((group) => (
          <div key={group.group}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider"
                >
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-violet-400")} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-border/50 p-3">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors",
            pathname === "/dashboard/settings" && "bg-white/10 text-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed lg:relative z-40 h-full border-r border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300 shrink-0",
          collapsed ? "w-[68px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
