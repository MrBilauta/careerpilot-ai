import { Flame } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function HackathonsPage() {
  return (
    <ComingSoon
      title="Hackathon Hub"
      description="Discover upcoming hackathons and find the perfect teammates."
      icon={<Flame className="h-12 w-12 text-orange-400" />}
      features={["Upcoming hackathon listings", "Filter by type (online, AI, college)", "Team matching based on skills", "Past hackathon archive"]}
    />
  );
}
