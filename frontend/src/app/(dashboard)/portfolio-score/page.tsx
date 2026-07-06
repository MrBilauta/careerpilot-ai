import { Trophy } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function PortfolioScorePage() {
  return (
    <ComingSoon
      title="Portfolio Score"
      description="Get a comprehensive career score analyzing GitHub, LinkedIn, resume, and projects."
      icon={<Trophy className="h-12 w-12 text-purple-400" />}
      features={["Resume Score", "GitHub Score", "LinkedIn Score", "Portfolio Score", "Open Source Score", "Overall Career Score", "Personalized improvement suggestions"]}
    />
  );
}
