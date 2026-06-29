import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Sewer Pipe Lining Twin Cities",
  description: "Learn whether CIPP sewer pipe lining is right for your Twin Cities property.",
};

export default function Page() {
  return (
    <LandingPage
      title="Sewer pipe lining / CIPP evaluation"
      copy="Pipe lining can reduce disruption for qualifying sewer laterals. All-Star Utilities evaluates whether lining, excavation, or replacement is the right next step."
      defaultService="sewer-pipe-lining-cipp"
    />
  );
}
