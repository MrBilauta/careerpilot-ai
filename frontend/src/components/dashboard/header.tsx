"use client";

import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 px-6 bg-background/80 backdrop-blur-xl">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="flex items-center gap-2 w-full rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted-foreground hover:border-border transition-colors">
          <Search className="h-4 w-4" />
          <span className="flex-1">Search features...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-white/5 px-1.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-semibold">
            U
          </div>
        </Button>
      </div>
    </header>
  );
}
