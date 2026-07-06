"use client";

import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GITHUB_REPO } from "@/lib/constants";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}

export function ComingSoon({ title, description, icon, features }: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">{icon}</div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <Badge variant="outline" className="gap-1">
                <Construction className="h-3 w-3" />
                Coming Soon
              </Badge>
            </div>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {features && features.length > 0 && (
            <div className="text-left space-y-2 bg-white/[0.02] rounded-xl p-4">
              <p className="text-sm font-medium mb-3">Planned features:</p>
              {features.map((f, i) => (
                <p key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-violet-400">◦</span>
                  {f}
                </p>
              ))}
            </div>
          )}
          <div className="flex justify-center gap-3">
            <Link href={`${GITHUB_REPO}/issues`} target="_blank">
              <Button variant="outline" size="sm">Request Feature</Button>
            </Link>
            <Link href={`${GITHUB_REPO}/blob/main/CONTRIBUTING.md`} target="_blank">
              <Button variant="gradient" size="sm">Contribute</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
