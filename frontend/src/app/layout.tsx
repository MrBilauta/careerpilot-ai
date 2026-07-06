import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerPilot AI — The AI Career Copilot for CS Students",
  description:
    "Free, open-source AI-powered platform helping computer science students prepare for internships and software engineering jobs. Resume review, ATS scanner, interview prep, and more.",
  keywords: [
    "career",
    "AI",
    "resume review",
    "internship",
    "software engineering",
    "interview prep",
    "open source",
    "computer science",
    "job search",
  ],
  authors: [{ name: "CareerPilot AI Contributors" }],
  openGraph: {
    title: "CareerPilot AI — The AI Career Copilot for CS Students",
    description:
      "Free, open-source AI career platform. Resume review, ATS scanning, interview prep, GitHub analysis, and more.",
    type: "website",
    locale: "en_US",
    siteName: "CareerPilot AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerPilot AI",
    description: "The AI Career Copilot Every CS Student Needs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
