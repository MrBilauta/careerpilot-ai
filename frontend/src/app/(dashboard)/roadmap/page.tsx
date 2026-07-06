import { Map } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function RoadmapPage() {
  return (
    <ComingSoon
      title="Learning Roadmap"
      description="Personalized learning paths for every specialization in tech."
      icon={<Map className="h-12 w-12 text-teal-400" />}
      features={["Frontend, Backend, AI/ML, DevOps, Cybersecurity paths", "Interactive skill trees", "Resource recommendations", "Progress tracking", "AI-generated personalized roadmaps"]}
    />
  );
}
