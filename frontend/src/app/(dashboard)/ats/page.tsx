"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScanSearch, Loader2, CheckCircle2, XCircle, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";

interface ATSResult {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string[];
  summary: string;
  keyword_density: Record<string, number>;
}

export default function ATSPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (resumeText.length < 50 || jobDescription.length < 50) {
      setError("Both resume and job description must be at least 50 characters.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post<ATSResult>("/ats/compare", {
        resume_text: resumeText,
        job_description: jobDescription,
      });
      setResult(data);
    } catch (err: unknown) {
      const apiErr = err as { detail?: string };
      setError(apiErr.detail || "Failed to compare. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-teal-500";
    if (score >= 60) return "from-amber-500 to-yellow-500";
    return "from-red-500 to-orange-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ScanSearch className="h-6 w-6 text-violet-400" />
          ATS Scanner
        </h1>
        <p className="text-muted-foreground mt-1">
          Compare your resume against a job description to find missing keywords and optimize ATS compatibility.
        </p>
      </div>

      {/* Side-by-side input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Your Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[250px] font-mono text-sm bg-white/[0.02]"
            />
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[250px] font-mono text-sm bg-white/[0.02]"
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      <Button
        variant="gradient"
        className="w-full sm:w-auto"
        onClick={handleCompare}
        disabled={isLoading}
      >
        {isLoading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Scanning...</>
        ) : (
          <><Zap className="h-4 w-4" /> Compare & Score</>
        )}
      </Button>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Match Score */}
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-6">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${getScoreColor(result.match_score)} shadow-lg`}>
                <span className="text-3xl font-bold text-white">{result.match_score}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">ATS Match Score</h3>
                <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Matched Keywords ({result.matched_keywords.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.matched_keywords.map((kw) => (
                    <Badge key={kw} variant="success">{kw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-red-400">
                  <XCircle className="h-4 w-4" />
                  Missing Keywords ({result.missing_keywords.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords.map((kw) => (
                    <Badge key={kw} variant="destructive">{kw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
