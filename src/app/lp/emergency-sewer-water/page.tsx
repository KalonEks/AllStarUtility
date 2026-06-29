import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Emergency Sewer and Water Service",
  description: "24/7 emergency sewer and water contact information for All-Star Utilities.",
};

export default function Page() {
  return (
    <LandingPage
      title="Emergency sewer and water help"
      copy="For active backups, leaks, service interruptions, pooling water, or urgent sewer and water problems, call the emergency line first."
      defaultService="emergency-sewer-water"
    />
  );
}
