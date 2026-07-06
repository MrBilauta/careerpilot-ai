import { Sparkles } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function ProjectGeneratorPage() {
  return (
    <ComingSoon
      title="AI Project Generator"
      description='Enter your career goal and get personalized project ideas with architecture and learning paths.'
      icon={<Sparkles className="h-12 w-12 text-violet-400" />}
      features={["20 personalized project ideas", "Difficulty levels and skills learned", "Resume impact scoring", "Architecture and folder structure", "Learning roadmap per project"]}
    />
  );
}
