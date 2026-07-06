/** TypeScript type definitions for CareerPilot AI */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  github_username?: string;
  created_at: string;
}

export interface ResumeAnalysis {
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

export interface ResumeScore {
  category: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface ATSResult {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string[];
  summary: string;
  keyword_density: Record<string, number>;
}

export interface GitHubProfile {
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
  repositories: Repository[];
  strengths: string[];
  improvements: string[];
  portfolio_suggestions: string[];
  summary: string;
}

export interface Repository {
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

export interface CoverLetter {
  cover_letter: string;
  key_points_addressed: string[];
  tone: string;
  word_count: number;
}

export interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: string;
  sample_answer: string;
  tips: string[];
  follow_ups: string[];
}

export type JobStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: JobStatus;
  salary_range: string;
  notes: string;
  applied_date?: string;
  created_at: string;
}
