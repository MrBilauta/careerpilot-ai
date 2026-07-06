"use client";

import { motion } from "framer-motion";
import {
  FileText, ScanSearch, Github, Mail, MessageSquare, Briefcase,
  Bot, Network, Trophy, BarChart3, Flame, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  FileText, ScanSearch, Github, Mail, MessageSquare, Briefcase,
  Bot, Network, Trophy, BarChart3, Flame, Users,
};

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-blue-500/30 bg-blue-500/5">
            <span className="text-blue-400 text-xs">22 Features</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text-primary bg-200% animate-gradient-shift">
              Land Your Dream Job
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            From resume optimization to interview prep, CareerPilot AI has every tool
            you need to stand out in the competitive tech job market.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || FileText;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group glass-card p-6 glass-hover cursor-default"
              >
                {/* Icon */}
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  style={{ boxShadow: `0 8px 24px -8px rgba(0,0,0,0.3)` }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Title + Status */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  {feature.status === "live" ? (
                    <Badge variant="success" className="text-[10px] px-1.5 py-0">Live</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">Soon</Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
