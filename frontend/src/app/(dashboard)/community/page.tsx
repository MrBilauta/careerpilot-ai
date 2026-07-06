import { Users } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function CommunityPage() {
  return (
    <ComingSoon
      title="Community"
      description="Connect with other CS students, form teams, and grow together."
      icon={<Users className="h-12 w-12 text-pink-400" />}
      features={["Create and join teams", "Study groups", "Resource sharing", "Find collaborators", "Mentor beginners", "Monthly challenges", "Gamification with XP, badges, and leaderboards"]}
    />
  );
}
