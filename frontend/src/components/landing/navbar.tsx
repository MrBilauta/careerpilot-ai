"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_NAME, GITHUB_REPO } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Open Source", href: "#open-source" },
    { label: "Docs", href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center shrink-0">
              <Image src="/logo.svg" alt="CareerPilot AI Logo" width={32} height={32} />
            </div>
            <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="gradient" size="sm">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-sm rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <Link href={GITHUB_REPO} target="_blank" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </Button>
                </Link>
                <Link href="/dashboard" className="block">
                  <Button variant="gradient" className="w-full">
                    Start Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
