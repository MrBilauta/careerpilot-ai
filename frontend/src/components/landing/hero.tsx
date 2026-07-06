"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GITHUB_REPO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-8 px-4 py-1.5 text-sm gap-2 border-violet-500/30 bg-violet-500/5"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-violet-300">Open Source & Free Forever</span>
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          The AI Career Copilot
          <br />
          <span className="gradient-text-primary bg-200% animate-gradient-shift">
            Every CS Student Needs
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          AI-powered resume review, ATS scanning, GitHub analysis, interview prep,
          and career guidance — all in one free, open-source platform built for
          students like you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button variant="gradient" size="xl" className="group">
              Start Free — No Credit Card
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="xl" className="gap-2">
              <Github className="h-5 w-5" />
              Star on GitHub
              <span className="flex items-center gap-1 ml-1 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-20 relative"
        >
          {/* Glow behind the preview */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-blue-500/10 to-transparent blur-3xl rounded-3xl" />

          {/* Dashboard mock */}
          <div className="relative glass-card p-2 sm:p-3 glow-lg">
            <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-background">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    careerpilot.ai/dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard content mock */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Career Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Welcome back! Your career score is improving.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/25">
                      85
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Resume Score", value: "89", color: "from-blue-500 to-cyan-500" },
                    { label: "GitHub Score", value: "91", color: "from-emerald-500 to-teal-500" },
                    { label: "Interview Ready", value: "76", color: "from-violet-500 to-purple-500" },
                    { label: "Applications", value: "12", color: "from-orange-500 to-pink-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-card p-4 space-y-2">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <p className={`text-2xl font-bold gradient-text bg-gradient-to-r ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Activity bars */}
                <div className="space-y-3">
                  {[
                    { label: "Resume Optimization", progress: 89, color: "from-blue-500 to-violet-500" },
                    { label: "GitHub Portfolio", progress: 72, color: "from-emerald-500 to-teal-500" },
                    { label: "Interview Prep", progress: 45, color: "from-orange-500 to-pink-500" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
