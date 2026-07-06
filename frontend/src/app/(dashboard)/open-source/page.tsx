import { GitBranch } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function OpenSourcePage() {
  return (
    <ComingSoon
      title="Open Source Recommender"
      description="Find the perfect open-source projects to contribute to based on your skills."
      icon={<GitBranch className="h-12 w-12 text-emerald-400" />}
      features={["Personalized repo recommendations", "Good First Issues finder", "Contribution roadmap generator", "Trending project discovery"]}
    />
  );
}
