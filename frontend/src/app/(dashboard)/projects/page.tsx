import { FolderGit2 } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Projects"
      description="AI-powered project ideas and portfolio management."
      icon={<FolderGit2 className="h-12 w-12 text-violet-400" />}
      features={["AI project idea generator", "Portfolio management", "Project templates", "Architecture suggestions"]}
    />
  );
}
