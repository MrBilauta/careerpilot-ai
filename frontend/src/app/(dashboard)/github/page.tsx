"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Loader2, Star, GitFork, Users, Code, AlertCircle, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";

interface RepoAnalysis {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  has_readme: boolean;
  readme_quality: string;
  topics: string[];
  quality_score: number;
}

interface GitHubResult {
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  top_languages: Record<string, number>;
  contribution_score: number;
  profile_score: number;
  repositories: RepoAnalysis[];
  strengths: string[];
  improvements: string[];
  portfolio_suggestions: string[];
  summary: string;
}

export default function GitHubPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GitHubResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const data = await api.post<GitHubResult>("/github/analyze", { username: username.trim() });
      setResult(data);
    } catch (err: unknown) {
      const apiErr = err as { detail?: string };
      setError(apiErr.detail || "Failed to analyze. Check the username and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const langColors: Record<string, string> = {
    TypeScript: "bg-blue-500", JavaScript: "bg-yellow-500", Python: "bg-emerald-500",
    Java: "bg-orange-500", "C++": "bg-pink-500", Rust: "bg-red-500",
    Go: "bg-cyan-500", Ruby: "bg-red-400", Swift: "bg-orange-400",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Github className="h-6 w-6 text-emerald-400" />
          GitHub Analyzer
        </h1>
        <p className="text-muted-foreground mt-1">
          Enter a GitHub username to analyze repositories, languages, README quality, and get portfolio suggestions.
        </p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 flex gap-3">
          <Input
            placeholder="GitHub username (e.g., torvalds)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            className="bg-white/[0.02] flex-1"
          />
          <Button variant="gradient" onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            Analyze
          </Button>
        </CardContent>
      </Card>

      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />{error}
        </p>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Profile Header */}
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-6">
              {result.avatar_url && (
                <Image src={result.avatar_url} alt={result.name} width={64} height={64} className="h-16 w-16 rounded-full border-2 border-white/10" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{result.name}</h3>
                <p className="text-sm text-muted-foreground">@{result.username}</p>
                {result.bio && <p className="text-sm mt-1">{result.bio}</p>}
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <Code className="h-4 w-4 mx-auto mb-1 text-violet-400" />
                  <span className="font-bold">{result.public_repos}</span>
                  <p className="text-xs text-muted-foreground">Repos</p>
                </div>
                <div className="text-center">
                  <Star className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                  <span className="font-bold">{result.total_stars}</span>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>
                <div className="text-center">
                  <Users className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                  <span className="font-bold">{result.followers}</span>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-2">Profile Score</p>
                <span className="text-3xl font-bold">{result.profile_score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
                <Progress value={result.profile_score} className="mt-3 h-1.5" />
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-2">Contribution Score</p>
                <span className="text-3xl font-bold">{result.contribution_score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
                <Progress value={result.contribution_score} className="mt-3 h-1.5" />
              </CardContent>
            </Card>
          </div>

          {/* Languages */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Top Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.top_languages).map(([lang, count]) => (
                  <Badge key={lang} variant="outline" className="gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${langColors[lang] || "bg-gray-500"}`} />
                    {lang} ({count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Repositories */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-violet-400" />
                Top Repositories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.repositories.map((repo) => (
                  <div key={repo.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{repo.name}</p>
                      {repo.description && <p className="text-xs text-muted-foreground truncate">{repo.description}</p>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                      {repo.language && <Badge variant="outline" className="text-[10px]">{repo.language}</Badge>}
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{repo.forks}</span>
                      <Badge variant={repo.readme_quality === "excellent" || repo.readme_quality === "good" ? "success" : "warning"} className="text-[10px]">
                        {repo.readme_quality}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-emerald-400">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-amber-400">Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-400">→</span>{s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
