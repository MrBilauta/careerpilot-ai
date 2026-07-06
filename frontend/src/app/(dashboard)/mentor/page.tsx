import { Bot } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function MentorPage() {
  return (
    <ComingSoon
      title="AI Career Mentor"
      description="Chat with an AI mentor for personalized career guidance and advice."
      icon={<Bot className="h-12 w-12 text-indigo-400" />}
      features={["Choose a specialization", "Compare career paths", "Get certification recommendations", "Plan your learning journey", "Track career goals"]}
    />
  );
}
