import { BarChart3 } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Developer Analytics"
      description="Track your coding activity, contributions, and growth with beautiful charts."
      icon={<BarChart3 className="h-12 w-12 text-cyan-400" />}
      features={["GitHub commit tracking", "PR and issue analytics", "Coding streak tracking", "Portfolio growth over time", "Learning progress charts"]}
    />
  );
}
