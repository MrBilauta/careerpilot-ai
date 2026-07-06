/** Application-wide constants */

export const APP_NAME = "CareerPilot AI";
export const APP_DESCRIPTION = "The AI Career Copilot for Computer Science Students";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const GITHUB_REPO = "https://github.com/MrBilauta/careerpilot-ai";
export const DISCORD_URL = "https://discord.gg/YfagG2rG4n";

/** Navigation items for the dashboard sidebar */
export const DASHBOARD_NAV = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { title: "Portfolio Score", href: "/dashboard/portfolio-score", icon: "Trophy" },
      { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
    ],
  },
  {
    group: "Resume & Applications",
    items: [
      { title: "Resume Review", href: "/dashboard/resume", icon: "FileText" },
      { title: "ATS Scanner", href: "/dashboard/ats", icon: "ScanSearch" },
      { title: "Resume Builder", href: "/dashboard/resume-builder", icon: "PenTool" },
      { title: "Cover Letter", href: "/dashboard/cover-letter", icon: "Mail" },
    ],
  },
  {
    group: "Profile Analysis",
    items: [
      { title: "GitHub Analyzer", href: "/dashboard/github", icon: "Github" },
      { title: "LinkedIn Analyzer", href: "/dashboard/linkedin", icon: "Linkedin" },
    ],
  },
  {
    group: "Career Prep",
    items: [
      { title: "Interview Prep", href: "/dashboard/interview", icon: "MessageSquare" },
      { title: "System Design", href: "/dashboard/system-design", icon: "Network" },
      { title: "AI Mentor", href: "/dashboard/mentor", icon: "Bot" },
      { title: "Roadmap", href: "/dashboard/roadmap", icon: "Map" },
    ],
  },
  {
    group: "Job Search",
    items: [
      { title: "Job Tracker", href: "/dashboard/jobs", icon: "Briefcase" },
      { title: "Internships", href: "/dashboard/internships", icon: "GraduationCap" },
      { title: "Hackathons", href: "/dashboard/hackathons", icon: "Flame" },
    ],
  },
  {
    group: "Community",
    items: [
      { title: "Projects", href: "/dashboard/projects", icon: "FolderGit2" },
      { title: "Showcase", href: "/dashboard/showcase", icon: "Star" },
      { title: "Open Source", href: "/dashboard/open-source", icon: "GitBranch" },
      { title: "Community", href: "/dashboard/community", icon: "Users" },
    ],
  },
  {
    group: "AI Tools",
    items: [
      { title: "Project Generator", href: "/dashboard/project-generator", icon: "Sparkles" },
      { title: "Code Review", href: "/dashboard/code-review", icon: "Code" },
    ],
  },
] as const;

/** Feature list for landing page */
export const FEATURES = [
  {
    title: "AI Resume Review",
    description: "Upload your resume and get instant AI-powered feedback with scoring, ATS compatibility, and actionable suggestions.",
    icon: "FileText",
    color: "from-blue-500 to-cyan-500",
    status: "live" as const,
  },
  {
    title: "ATS Scanner",
    description: "Compare your resume against job descriptions. Find missing keywords and optimize for Applicant Tracking Systems.",
    icon: "ScanSearch",
    color: "from-violet-500 to-purple-500",
    status: "live" as const,
  },
  {
    title: "GitHub Analyzer",
    description: "Analyze your GitHub profile — repositories, READMEs, languages, contributions, and portfolio quality score.",
    icon: "Github",
    color: "from-emerald-500 to-teal-500",
    status: "live" as const,
  },
  {
    title: "Cover Letter Generator",
    description: "Generate personalized, compelling cover letters tailored to each job description you apply for.",
    icon: "Mail",
    color: "from-orange-500 to-pink-500",
    status: "live" as const,
  },
  {
    title: "Interview Preparation",
    description: "Practice behavioral, technical, and system design questions with AI-generated answers and tips.",
    icon: "MessageSquare",
    color: "from-rose-500 to-red-500",
    status: "live" as const,
  },
  {
    title: "Job Tracker",
    description: "Track applications with a Kanban board — Wishlist, Applied, Interview, Offer, and Rejected stages.",
    icon: "Briefcase",
    color: "from-amber-500 to-yellow-500",
    status: "coming_soon" as const,
  },
  {
    title: "AI Career Mentor",
    description: "Chat with an AI mentor for career guidance, specialization advice, and personalized recommendations.",
    icon: "Bot",
    color: "from-indigo-500 to-blue-500",
    status: "coming_soon" as const,
  },
  {
    title: "System Design Playground",
    description: "Interactive learning for URL Shortener, Chat App, Netflix, Uber, and more distributed systems.",
    icon: "Network",
    color: "from-teal-500 to-emerald-500",
    status: "coming_soon" as const,
  },
  {
    title: "Portfolio Score",
    description: "Get a comprehensive career score analyzing your GitHub, LinkedIn, resume, and project portfolio.",
    icon: "Trophy",
    color: "from-purple-500 to-violet-500",
    status: "coming_soon" as const,
  },
  {
    title: "Developer Analytics",
    description: "Track commits, PRs, coding streaks, and growth with beautiful charts and actionable insights.",
    icon: "BarChart3",
    color: "from-cyan-500 to-blue-500",
    status: "coming_soon" as const,
  },
  {
    title: "Hackathon Hub",
    description: "Discover upcoming hackathons, find teammates based on skills, and track your hackathon journey.",
    icon: "Flame",
    color: "from-red-500 to-orange-500",
    status: "coming_soon" as const,
  },
  {
    title: "Community & Gamification",
    description: "Join study groups, earn XP and badges, climb leaderboards, and connect with other students.",
    icon: "Users",
    color: "from-pink-500 to-rose-500",
    status: "coming_soon" as const,
  },
] as const;
