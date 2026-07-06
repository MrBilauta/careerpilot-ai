import { Briefcase } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function JobsPage() {
  return (
    <ComingSoon
      title="Job Tracker"
      description="Track your job applications with a Kanban board from Wishlist through Offer."
      icon={<Briefcase className="h-12 w-12 text-amber-400" />}
      features={["Kanban board (Wishlist → Applied → Interview → Offer → Rejected)", "Application analytics and stats", "Deadline reminders", "Notes and contact tracking"]}
    />
  );
}
