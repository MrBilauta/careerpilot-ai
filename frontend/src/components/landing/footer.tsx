"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Heart } from "lucide-react";
import Image from "next/image";
import { APP_NAME, GITHUB_REPO, DISCORD_URL } from "@/lib/constants";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Community: [
    { label: "GitHub", href: GITHUB_REPO },
    { label: "Discord", href: DISCORD_URL },
    { label: "Twitter", href: "https://x.com/Bilautaly" },
    { label: "Instagram", href: "https://instagram.com/theycallme.bilauta" },
    { label: "Contributing", href: `${GITHUB_REPO}/blob/main/CONTRIBUTING.md` },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "License (MIT)", href: `${GITHUB_REPO}/blob/main/LICENSE` },
    { label: "Security", href: `${GITHUB_REPO}/blob/main/SECURITY.md` },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center shrink-0">
                <Image src="/logo.svg" alt="CareerPilot AI Logo" width={32} height={32} />
              </div>
              <span className="font-bold text-lg">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The AI Career Copilot for Computer Science Students. Free and open source.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={GITHUB_REPO}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/Bilautaly"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/theycallme.bilauta"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-3">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. MIT License.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by the open-source community
          </p>
        </div>
      </div>
    </footer>
  );
}
