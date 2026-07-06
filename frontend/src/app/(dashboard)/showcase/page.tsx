import { Star } from "lucide-react";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function ShowcasePage() {
  return (
    <ComingSoon
      title="Project Showcase"
      description="Publish your projects and discover what other students are building."
      icon={<Star className="h-12 w-12 text-amber-400" />}
      features={["Publish projects with screenshots and live demos", "Star, like, comment, and bookmark", "Discover trending student projects", "Contributor lists"]}
    />
  );
}
