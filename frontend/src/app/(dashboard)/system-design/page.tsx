import { Network } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function SystemDesignPage() {
  return (
    <ComingSoon
      title="System Design Playground"
      description="Interactive learning for distributed systems and architecture design."
      icon={<Network className="h-12 w-12 text-teal-400" />}
      features={["URL Shortener design", "Chat App architecture", "Instagram/Netflix/Uber system design", "Interactive diagrams", "Step-by-step explanations"]}
    />
  );
}
