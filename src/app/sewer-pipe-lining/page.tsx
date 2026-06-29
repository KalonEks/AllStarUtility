import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CippLinkText } from "@/components/cipp-link-text";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sewer Pipe Lining / CIPP",
  description:
    "Plain-language information about CIPP sewer pipe lining, when it is useful, how it works, and when excavation may still be required.",
};

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
      <section className="bg-[#08111f] py-20 text-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#d71920]">Sewer pipe lining</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              <CippLinkText text="Sewer Pipe Lining / CIPP" disabled />
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-white/84">
              <CippLinkText text="CIPP lining can restore the inside of a qualifying sewer line with less digging than full open replacement." disabled />
            </p>
          </div>
          <aside className="rounded-lg border border-white/15 bg-white/8 p-6 shadow-2xl shadow-black/20">
            <p className="text-sm font-black uppercase tracking-wide text-[#d71920]">Need an evaluation?</p>
            <h2 className="mt-3 text-2xl font-black">We need to see the pipe before recommending lining.</h2>
            <p className="mt-3 leading-7 text-white/78">
              Pipe lining is useful, but it is not the right answer for every sewer line.
            </p>
            <div className="mt-6 grid gap-3">
              <Link className="button-primary" href="/contact">
                Request Free Consultation
                <ArrowRight size={18} aria-hidden />
              </Link>
              <a className="button-secondary" href={`tel:${business.phoneHref}`}>
                <Phone size={18} aria-hidden />
                Call {business.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#d71920]">What it is</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#06111f] md:text-4xl">A new interior surface inside the old sewer line</h2>
            <p className="mt-4 text-lg leading-8 text-[#475569]">
              <CippLinkText text="CIPP stands for cured-in-place pipe. A resin-saturated liner is placed inside an existing sewer line, shaped to the pipe, and cured so it forms a smooth interior pipe surface." disabled />
            </p>
            <p className="mt-4 text-lg leading-8 text-[#475569]">
              The goal is to restore flow, bridge certain defects, and reduce future root intrusion without digging up the entire line when the pipe is still a good candidate.
            </p>
          </div>
          <figure className="overflow-hidden rounded-lg border border-[#d7dde7] bg-[#f7f9fc] shadow-xl shadow-slate-950/10">
            <Image src="/images/cipp-before-after.png" alt="Before and after sewer pipe lining comparison" width={900} height={520} className="aspect-[16/10] w-full object-cover" />
            <figcaption className="border-t border-[#d7dde7] px-5 py-4 text-sm font-bold text-[#475569]">
              Before-and-after view of a damaged pipe interior and a smoother lined pipe interior.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad bg-[#08111f] text-white">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <InfoPanel
            eyebrow="How it works"
            title="Clean, prepare, line, cure"
            body="The line is evaluated and cleaned, the liner is inserted, and the material is cured in place. After curing, the pipe is checked so the crew can confirm the line is open and ready for service."
          />
          <InfoPanel
            eyebrow="When it fits"
            title="Good pipe candidates"
            body="Lining can be a good option when the existing pipe is accessible, cleanable, and still structurally suitable enough to receive the liner."
          />
          <InfoPanel
            eyebrow="When it does not"
            title="Excavation may still be needed"
            body="If the pipe is collapsed, badly offset, holding standing water, or cannot be prepared correctly, excavation or replacement may be the better repair."
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <ListBlock title="Common use cases" items={useCases} />
          <ListBlock title="When we may be unable to use lining" items={notFit} />
        </div>
      </section>
    </>
  );
}

function InfoPanel({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="hover-lift rounded-lg border border-white/15 bg-white/8 p-6">
      <p className="text-sm font-black uppercase tracking-wide text-[#d71920]">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-white/78">
        <CippLinkText text={body} disabled />
      </p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-[#d7dde7] bg-white p-6 shadow-sm shadow-slate-950/5">
      <h2 className="text-2xl font-black text-[#06111f]">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="flex gap-3 font-bold leading-7 text-[#172033]">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d71920]" aria-hidden />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
