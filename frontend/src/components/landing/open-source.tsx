"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GITHUB_REPO } from "@/lib/constants";

const stats = [
  { icon: Star, label: "Stars", value: "0+", color: "text-amber-400" },
  { icon: GitFork, label: "Forks", value: "0+", color: "text-blue-400" },
  { icon: Users, label: "Contributors", value: "1+", color: "text-emerald-400" },
  { icon: Code, label: "Commits", value: "100+", color: "text-violet-400" },
];

export function OpenSource() {
  return (
    <section id="open-source" className="py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Github className="h-4 w-4" />
            <span className="text-sm font-medium">Open Source</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Built in the Open,
            <br />
            <span className="gradient-text-secondary bg-200% animate-gradient-shift">
              For Everyone
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground text-lg mb-12">
            CareerPilot AI is 100% open source under the MIT License. Every line of code is
            transparent, auditable, and welcomes contributions from developers worldwide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-1 mb-10"
        >
          <div className="rounded-xl bg-[#0d1117] p-6 font-mono text-sm overflow-x-auto">
            <div className="text-muted-foreground mb-2"># Clone and get started in under 2 minutes</div>
            <div>
              <span className="text-emerald-400">$</span>{" "}
              <span className="text-blue-400">git clone</span>{" "}
              <span className="text-amber-300">https://github.com/MrBilauta/careerpilot-ai.git</span>
            </div>
            <div>
              <span className="text-emerald-400">$</span>{" "}
              <span className="text-blue-400">cd</span> careerpilot-ai
            </div>
            <div>
              <span className="text-emerald-400">$</span>{" "}
              <span className="text-blue-400">docker compose up</span>{" "}
              <span className="text-muted-foreground">--build</span>
            </div>
            <div className="mt-2 text-muted-foreground">
              # 🚀 Frontend at http://localhost:3000
              <br />
              # 📡 Backend at http://localhost:8000/docs
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              View on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
