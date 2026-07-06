import { PenTool } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function ResumeBuilderPage() {
  return (
    <ComingSoon
      title="Resume Builder"
      description="Build professional resumes with modern templates and export to PDF."
      icon={<PenTool className="h-12 w-12 text-cyan-400" />}
      features={["Multiple modern templates", "Real-time preview", "PDF export", "ATS-friendly formatting", "Import from LinkedIn"]}
    />
  );
}
