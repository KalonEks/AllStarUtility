import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Water Line Replacement Twin Cities",
  description: "Request a free water line replacement consultation from All-Star Utilities in the Twin Cities metro.",
};

export default function Page() {
  return (
    <LandingPage
      title="Water line replacement and repair"
      copy="All-Star Utilities evaluates residential and commercial water line problems, replacement needs, excavation access, and urgent service concerns."
      defaultService="water-line-replacement"
    />
  );
}
