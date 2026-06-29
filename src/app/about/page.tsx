import type { Metadata } from "next";
import { InfoHero } from "@/components/info-hero";
import { SectionHeading } from "@/components/section-heading";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About All-Star Utilities, a family-owned Twin Cities sewer, water, excavation, and pipe lining contractor.",
};

export default function AboutPage() {
  return (
    <>
      <InfoHero
        align="center"
        eyebrow="About All-Star Utilities"
        title="Family-owned utility contractor serving the Twin Cities"
        description={`Founded by ${business.founder} in ${business.founded}, All-Star Utilities handles sewer, water, excavation, and pipe lining work for residential and commercial customers.`}
      />
      <section className="section-flow">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Approach" title="We keep the work accountable">
            <p>
              Over 20 years of sewer, water, and excavation experience. The owner/operator is involved on the job, and we do the work with our own crew.
            </p>
            <p className="mt-4">
              We also work alongside Boston Trucking when a project calls for trucking support.
            </p>
          </SectionHeading>
        </div>
      </section>
      <section className="section-flow pt-0">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Why it matters" title="Utility work needs the right crew">
            <p>
              Sewer and water projects involve excavation safety, existing utilities, emergency response, public right-of-way work, and long-term performance risk.
            </p>
          </SectionHeading>
        </div>
      </section>
    </>
  );
}
