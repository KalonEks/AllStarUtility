import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CippLinkText } from "@/components/cipp-link-text";
import { CtaBand } from "@/components/cta-band";
import { InfoHero } from "@/components/info-hero";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sewer Pipe Lining / CIPP",
  description:
    "How CIPP sewer pipe lining works, when it is an option on residential or commercial work, and when excavation may still be required.",
};

const permaLinerCredential =
  business.credentials.find((credential) => credential.startsWith("Perma-Liner")) ??
  "Perma-Liner Certification #701271";

const expectations = [
  {
    heading: "Rehabilitation of the existing sewer",
    body: "CIPP is a lining method for a buried pipe that is still a suitable host. The original line stays in the ground, and the cured liner becomes the new interior surface wastewater flows through.",
  },
  {
    heading: "Typical installation sequence",
    body: "Work starts from an access point, such as a cleanout or a small excavation. The pipe is cleaned and prepared, the liner is inserted and positioned against the host pipe, then cured. The finished line is inspected before it is returned to service.",
  },
  {
    heading: "Liner and resin, cured in place",
    body: `The liner is a flexible tube saturated with resin. Once it is in position, the resin hardens so the liner forms a continuous interior pipe wall. Crews match materials to the pipe and the job. All-Star Utilities holds ${permaLinerCredential} for this work.`,
  },
  {
    heading: "What to plan for on site",
    body: "Sewer service is interrupted while the work is underway. Small access pits may still be needed, and the finished interior is slightly smaller than the original pipe. Less excavation than full replacement is common when the pipe qualifies. Lining is not recommended if inspection finds collapse, a severe offset, standing water, or a pipe that cannot be prepared.",
  },
];

const panels = [
  {
    eyebrow: "How it works",
    title: "Clean, prepare, line, cure",
    body: "The line is evaluated and cleaned, the liner is inserted, and the material is cured in place. After curing, the pipe is checked so the crew can confirm the line is open and ready for service.",
  },
  {
    eyebrow: "When it fits",
    title: "Good pipe candidates",
    body: "Lining can be a good option when the pipe is accessible, cleanable, and still structurally suitable for a liner.",
  },
  {
    eyebrow: "When it does not",
    title: "Excavation may still be needed",
    body: "If the pipe is collapsed, badly offset, holding standing water, or cannot be prepared correctly, excavation or replacement may be the better repair.",
  },
];

const useCases = [
  "Root intrusion in an otherwise usable sewer line",
  "Cracks, small gaps, or worn pipe walls",
  "Reducing yard, driveway, sidewalk, or business disruption",
  "Rehabilitating qualifying residential or commercial sewer laterals",
  "Extending pipe service life when replacement is not the best first option",
];

const notFit = [
  "Collapsed pipe",
  "Severe offsets or separated pipe sections",
  "Major bellies or standing water that prevent proper lining",
  "Pipe that cannot be cleaned, accessed, or prepared correctly",
  "Situations where spot excavation or full replacement is the more reliable repair",
];

export default function PipeLiningPage() {
  return (
    <>
      <InfoHero
        align="center"
        showDivider={false}
        className="pb-0"
        eyebrow="When the pipe qualifies"
        title="How Lining Works"
        description="CIPP lining restores a qualifying sewer from the inside, without replacing the entire line. It is available for residential and commercial work, typically with less excavation than a full cut-and-replace. We evaluate the pipe on site before recommending it."
      />
      <div className="container-page mt-8 flex flex-col items-center">
        <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
          <a className="button-secondary justify-center" href={`tel:${business.phoneHref}`}>
            <Phone size={18} aria-hidden />
            Call {business.phone}
          </a>
          <Link className="button-primary justify-center" href="/contact">
            Request free consultation <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <a className="home-hero__emergency" href={`tel:${business.emergencyPhoneHref}`}>
          24/7 Emergency: {business.emergencyPhone}
        </a>
      </div>
      <div className="flow-divider container-page mt-10" />

      <section className="section-flow">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          <FadeIn>
            <p className="eyebrow">What it is</p>
            <h2 className="heading-section mt-3">A new interior surface inside the old sewer line</h2>
            <p className="text-lead mt-4">
              <CippLinkText
                disabled
                text="CIPP stands for cured-in-place pipe. A resin-saturated liner is placed inside an existing sewer line, shaped to the pipe, and cured so it forms a smooth interior pipe surface."
              />
            </p>
            <p className="text-lead mt-4">
              The goal is to restore flow, bridge certain defects, and reduce future root intrusion without digging up the entire line when the pipe is still a good candidate.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <figure className="glass-panel overflow-hidden">
              <Image
                src="/images/cipp-before-after.png"
                alt="Before and after sewer pipe lining comparison"
                width={900}
                height={520}
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="border-t border-white/10 px-5 py-4 text-sm font-bold text-white/72">
                Before-and-after view of a damaged pipe interior and a smoother lined pipe interior.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section className="section-flow">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="If lining is selected" title="Process, materials, and what to expect">
            <p>
              When CIPP is recommended on residential or commercial sewer work, All-Star Utilities installs a liner
              inside the existing pipe after the line is evaluated and prepared on site.
            </p>
          </SectionHeading>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {expectations.map((item) => (
              <StaggerItem key={item.heading} className="glass-panel p-5">
                <h3 className="text-xl font-black">{item.heading}</h3>
                <p className="mt-3 leading-7 text-white/78">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-flow">
        <div className="container-page">
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {panels.map((panel) => (
              <StaggerItem key={panel.eyebrow} className="glass-panel p-5 text-center">
                <p className="eyebrow">{panel.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-black">{panel.title}</h2>
                <p className="mt-3 leading-7 text-white/78">{panel.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-flow">
        <Stagger className="container-page grid gap-8 lg:grid-cols-2">
          <ListBlock title="Common use cases" items={useCases} />
          <ListBlock title="When lining may not be possible" items={notFit} />
        </Stagger>
      </section>

      <section className="section-flow--tight">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link className="button-ghost" href="/residential-sewer-water">
            View Residential Services <ArrowRight size={18} aria-hidden />
          </Link>
          <Link className="button-ghost" href="/commercial-sewer-water">
            View Commercial Services <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <StaggerItem className="glass-panel p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 font-bold leading-7 text-white/88">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--brand)]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}
