import { GraduationCap } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function InternshipsPage() {
  return (
    <ComingSoon
      title="Internship Finder"
      description="Discover and track software engineering internships across top companies."
      icon={<GraduationCap className="h-12 w-12 text-blue-400" />}
      features={["Search internships by company, location, and tech stack", "Bookmark and track applications", "Filter by remote, hybrid, on-site", "Direct apply links"]}
    />
  );
}
