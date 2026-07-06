"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/20 to-purple-600/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Animated orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-sm text-violet-300">100% Free & Open Source</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ready to Accelerate
              <br />
              Your Career?
            </h2>

            <p className="mx-auto max-w-xl text-muted-foreground text-lg mb-8">
              Join thousands of CS students already using CareerPilot AI to prepare
              for their dream internships and jobs.
            </p>

            <Link href="/dashboard">
              <Button variant="gradient" size="xl" className="group">
                Get Started for Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
