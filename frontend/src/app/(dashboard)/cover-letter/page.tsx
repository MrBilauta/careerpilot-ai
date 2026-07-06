"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, Zap, AlertCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface CoverLetterResult {
  cover_letter: string;
  key_points_addressed: string[];
  tone: string;
  word_count: number;
}

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [tone, setTone] = useState("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (resumeText.length < 50 || jobDescription.length < 50 || !companyName || !jobTitle) {
      setError("All fields are required. Resume and JD must be at least 50 characters.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post<CoverLetterResult>("/cover-letter/generate", {
        resume_text: resumeText, job_description: jobDescription,
        company_name: companyName, job_title: jobTitle, tone,
      });
      setResult(data);
    } catch (err: unknown) {
      const apiErr = err as { detail?: string };
      setError(apiErr.detail || "Failed to generate. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.cover_letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Mail className="h-6 w-6 text-orange-400" />
          Cover Letter Generator
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate a personalized, compelling cover letter tailored to each job you apply for.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="bg-white/[0.02]" />
              <Input placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="bg-white/[0.02]" />
              <div className="flex gap-2">
                {(["professional", "friendly", "enthusiastic"] as const).map((t) => (
                  <Button key={t} variant={tone === t ? "default" : "outline"} size="sm" onClick={() => setTone(t)} className="capitalize">
                    {t}
                  </Button>
                ))}
              </div>
              <Textarea placeholder="Paste your resume text..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="min-h-[150px] font-mono text-sm bg-white/[0.02]" />
              <Textarea placeholder="Paste the job description..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="min-h-[150px] font-mono text-sm bg-white/[0.02]" />
              {error && <p className="text-sm text-red-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{error}</p>}
              <Button variant="gradient" className="w-full" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Zap className="h-4 w-4" /> Generate Cover Letter</>}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          {result ? (
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">Generated Cover Letter</CardTitle>
                  <Badge variant="outline">{result.word_count} words</Badge>
                  <Badge variant="outline" className="capitalize">{result.tone}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {result.cover_letter}
                </div>
                {result.key_points_addressed.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Key Points Addressed</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.key_points_addressed.map((p, i) => (
                        <Badge key={i} variant="success" className="text-[10px]">{p}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Fill in the details and generate your cover letter.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
