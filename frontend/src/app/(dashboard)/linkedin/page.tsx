import { Linkedin } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function LinkedInPage() {
  return (
    <ComingSoon
      title="LinkedIn Analyzer"
      description="Optimize your LinkedIn profile for recruiter visibility and SEO."
      icon={<Linkedin className="h-12 w-12 text-blue-500" />}
      features={["Headline optimization suggestions", "About section improvements", "Experience bullet point enhancement", "Keywords and SEO analysis", "Profile completeness score"]}
    />
  );
}
