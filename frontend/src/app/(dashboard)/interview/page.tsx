import { MessageSquare } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function InterviewPage() {
  return (
    <ComingSoon
      title="Interview Preparation"
      description="Practice behavioral, technical, and system design questions with AI-powered mock interviews."
      icon={<MessageSquare className="h-12 w-12 text-rose-400" />}
      features={[
        "Behavioral questions with STAR method answers",
        "Technical coding problems with explanations",
        "System design mock interviews",
        "AI Mock Interviewer (voice-ready architecture)",
        "Personalized question sets based on target company",
      ]}
    />
  );
}
