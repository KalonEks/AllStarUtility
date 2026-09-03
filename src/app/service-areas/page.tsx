import type { Metadata } from "next";
import { InfoHero } from "@/components/info-hero";
import { ServiceAreaMap } from "@/components/service-area-map";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "All-Star Utilities sewer, water, excavation, and pipe lining service area in the Twin Cities metro.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <InfoHero
        align="center"
        eyebrow="Twin Cities metro"
        title="Sewer and water service across Minneapolis, St. Paul, and the metro"
        description="We serve homeowners, commercial properties, contractors, and property managers across the Twin Cities metro."
      />
      <section className="section-flow section-flow--after-divider">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Coverage" title="Areas we serve">
            <p>
              If your property is in or near the Twin Cities, contact us with the address and we will let you know how
              we can help.
            </p>
          </SectionHeading>
          <div className="mx-auto mt-10 max-w-5xl">
            <ServiceAreaMap />
          </div>
        </div>
      </section>
    </>
  );
}
