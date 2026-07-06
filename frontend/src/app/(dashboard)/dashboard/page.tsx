"use client";

import { motion } from "framer-motion";
import {
  FileText, ScanSearch, Github, Mail, MessageSquare, Sparkles,
  ArrowUpRight, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Resume Score", value: 85, icon: FileText, color: "from-blue-500 to-cyan-500", href: "/dashboard/resume" },
  { label: "GitHub Score", value: 72, icon: Github, color: "from-emerald-500 to-teal-500", href: "/dashboard/github" },
  { label: "Interview Ready", value: 45, icon: MessageSquare, color: "from-violet-500 to-purple-500", href: "/dashboard/interview" },
  { label: "Applications", value: 8, icon: ScanSearch, color: "from-orange-500 to-pink-500", href: "/dashboard/jobs" },
];

const quickActions = [
  { label: "Review Resume", icon: FileText, href: "/dashboard/resume", color: "from-blue-500 to-cyan-500" },
  { label: "Scan ATS", icon: ScanSearch, href: "/dashboard/ats", color: "from-violet-500 to-purple-500" },
  { label: "Analyze GitHub", icon: Github, href: "/dashboard/github", color: "from-emerald-500 to-teal-500" },
  { label: "Cover Letter", icon: Mail, href: "/dashboard/cover-letter", color: "from-orange-500 to-pink-500" },
  { label: "Interview Prep", icon: MessageSquare, href: "/dashboard/interview", color: "from-rose-500 to-red-500" },
  { label: "AI Mentor", icon: Sparkles, href: "/dashboard/mentor", color: "from-amber-500 to-yellow-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight">Career Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your career preparation progress.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="glass-card glass-hover group cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  {stat.label !== "Applications" && (
                    <span className="text-xs text-muted-foreground">/100</span>
                  )}
                </div>
                {stat.label !== "Applications" && (
                  <Progress value={stat.value} className="mt-3 h-1.5" />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                      {action.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Feed */}
      <motion.div variants={item}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "Upload your first resume to get started", badge: "Action", variant: "warning" as const },
                { text: "Connect your GitHub profile for analysis", badge: "Setup", variant: "default" as const },
                { text: "Complete your career profile for personalized suggestions", badge: "Tip", variant: "success" as const },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <div className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                  <p className="text-sm text-muted-foreground flex-1">{activity.text}</p>
                  <Badge variant={activity.variant}>{activity.badge}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
