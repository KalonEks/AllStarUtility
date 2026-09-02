import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Sewer Pipe Lining Twin Cities",
  description: "Find out whether CIPP lining is an option for a qualifying sewer line on Twin Cities residential or commercial work.",
};

export default function Page() {
  return (
    <LandingPage
      title="Sewer Pipe Lining / CIPP Evaluation"
      copy="Lining is an option on residential or commercial sewer work when the pipe qualifies. We evaluate the line before recommending lining, excavation, or replacement."
      defaultService="sewer-pipe-lining-cipp"
    />
  );
}
