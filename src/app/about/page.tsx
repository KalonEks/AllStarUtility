import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
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
      <section className="section-flow section-flow--after-divider">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Approach" title="Accountable work, from the owner on site">
            <p>
              Over 20 years of sewer, water, and excavation experience. The owner/operator is involved on site, and we do the work with our own crew.
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
      <section className="section-flow">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Credentials" title="Licensed, Bonded, Certified." />
          <ul className="mx-auto mt-6 max-w-xl space-y-2 text-center text-sm font-bold text-white/82">
            {business.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link className="button-ghost" href="/residential-sewer-water">
              View Residential Services <ArrowRight size={18} aria-hidden />
            </Link>
            <Link className="button-ghost" href="/commercial-sewer-water">
              View Commercial Services <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
