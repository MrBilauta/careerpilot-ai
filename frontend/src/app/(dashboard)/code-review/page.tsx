import { Code } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function CodeReviewPage() {
  return (
    <ComingSoon
      title="AI Code Reviewer"
      description="Upload your repository and get AI-powered code quality, security, and performance reviews."
      icon={<Code className="h-12 w-12 text-blue-400" />}
      features={["Code quality analysis", "Security vulnerability detection", "Performance optimization suggestions", "Best practices enforcement", "Complexity scoring", "Actionable fix generation"]}
    />
  );
}
