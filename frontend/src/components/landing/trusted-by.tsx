"use client";

import { motion } from "framer-motion";

const logos = [
  "MIT", "Stanford", "Berkeley", "Carnegie Mellon", "Georgia Tech",
  "University of Michigan", "Purdue", "UT Austin", "UCLA", "Cornell",
  "University of Washington", "UIUC",
];

export function TrustedBy() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm text-muted-foreground mb-8 tracking-wide uppercase">
          Trusted by students from top universities
        </p>
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling logos */}
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
            }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold">
                  {logo.charAt(0)}
                </div>
                <span className="text-sm font-medium">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
