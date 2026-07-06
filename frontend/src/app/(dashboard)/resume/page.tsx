"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Loader2, CheckCircle2, AlertCircle, Lightbulb, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";

interface ResumeScore {
  category: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

interface ResumeAnalysis {
  overall_score: number;
  summary: string;
  scores: ResumeScore[];
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  action_verbs_found: string[];
  action_verbs_suggested: string[];
  ats_compatible: boolean;
  grammar_issues: string[];
  improvement_priority: string[];
}

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (resumeText.length < 50) {
      setError("Please paste at least 50 characters of resume text.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post<ResumeAnalysis>("/resume/analyze", {
        resume_text: resumeText,
        job_title: jobTitle || undefined,
      });
      setResult(data);
    } catch (err: unknown) {
      const apiErr = err as { detail?: string };
      setError(apiErr.detail || "Failed to analyze resume. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-teal-500";
    if (score >= 60) return "from-amber-500 to-yellow-500";
    return "from-red-500 to-orange-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-400" />
          AI Resume Review
        </h1>
        <p className="text-muted-foreground mt-1">
          Paste your resume text below and get AI-powered feedback with scoring and actionable suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Upload className="h-4 w-4 text-violet-400" />
                Resume Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your resume text here... (minimum 50 characters)"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] font-mono text-sm bg-white/[0.02]"
              />
              <Input
                placeholder="Target job title (optional — e.g., Software Engineer Intern)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-white/[0.02]"
              />
              {error && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {error}
                </p>
              )}
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleAnalyze}
                disabled={isLoading || resumeText.length < 50}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Overall Score */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${getScoreGradient(result.overall_score)} shadow-lg`}>
                      <span className="text-3xl font-bold text-white">{result.overall_score}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Overall Score</h3>
                      <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                      <Badge variant={result.ats_compatible ? "success" : "warning"} className="mt-2">
                        {result.ats_compatible ? "ATS Compatible ✓" : "ATS Issues Detected"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Scores */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4 text-violet-400" />
                    Category Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.scores.map((score) => (
                    <div key={score.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{score.category}</span>
                        <span className={`text-sm font-bold ${getScoreColor(score.score)}`}>
                          {score.score}/100
                        </span>
                      </div>
                      <Progress value={score.score} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">{score.feedback}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-amber-400">
                      <Lightbulb className="h-4 w-4" />
                      Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Paste your resume and click &quot;Analyze&quot; to get AI-powered feedback.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
