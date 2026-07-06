"use client";

import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Features } from "@/components/landing/features";
import { OpenSource } from "@/components/landing/open-source";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        {/* Top gradient orb */}
        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-b from-violet-500/10 via-blue-500/5 to-transparent blur-3xl" />
        {/* Bottom gradient orb */}
        <div className="absolute -bottom-[20%] right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-t from-purple-500/10 via-pink-500/5 to-transparent blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Features />
        <OpenSource />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
