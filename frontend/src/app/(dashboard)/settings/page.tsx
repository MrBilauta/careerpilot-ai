"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Key, Bell, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-violet-400" />
            Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="your@email.com" className="bg-white/[0.02]" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub Username</label>
            <Input placeholder="yourusername" className="bg-white/[0.02]" />
          </div>
          <Button variant="gradient" size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Key className="h-4 w-4 text-amber-400" />
            API Configuration
          </CardTitle>
          <CardDescription>Configure AI model and API keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenRouter API Key</label>
            <Input type="password" placeholder="sk-or-..." className="bg-white/[0.02] font-mono" />
            <p className="text-xs text-muted-foreground">
              Get your key at{" "}
              <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">openrouter.ai</a>
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred AI Model</label>
            <div className="flex flex-wrap gap-2">
              {["Gemini Flash", "DeepSeek", "Qwen", "GPT-4o Mini"].map((model) => (
                <Badge key={model} variant="outline" className="cursor-pointer hover:bg-white/5">{model}</Badge>
              ))}
            </div>
          </div>
          <Button variant="gradient" size="sm">Save Configuration</Button>
        </CardContent>
      </Card>

      {/* Data */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="h-4 w-4 text-emerald-400" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Export My Data
          </Button>
          <p className="text-xs text-muted-foreground">
            CareerPilot AI is open source. Your data is stored securely and you can export or delete it at any time.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
