import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Sewer Line Repair Twin Cities",
  description: "Request a free sewer line repair consultation from All-Star Utilities in the Twin Cities metro.",
};

export default function Page() {
  return (
    <LandingPage
      title="Sewer Line Repair in the Twin Cities"
      copy="Recurring backups, sewer odors, root intrusion, cracked pipe, and city notices should be evaluated before a repair path is selected."
      defaultService="sewer-line-repair"
    />
  );
}
