import type { Metadata } from "next";
import { InfoHero } from "@/components/info-hero";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { serviceAreas } from "@/lib/site";

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
      <section className="section-flow">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Coverage" title="Areas we serve">
            <p>
              If your property is in or near the Twin Cities, contact us with the address and we will let you know how we can help.
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <AreaList title="Minneapolis neighborhoods" items={serviceAreas.minneapolis} />
            <AreaList title="St. Paul neighborhoods" items={serviceAreas.stPaul} />
          </div>
        </div>
      </section>
    </>
  );
}

function AreaList({ title, items }: { title: string; items: string[] }) {
  return (
    <FadeIn className="glass-panel p-6">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <Stagger className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <StaggerItem key={item} className="trust-chip">
            {item}
          </StaggerItem>
        ))}
      </Stagger>
    </FadeIn>
  );
}
