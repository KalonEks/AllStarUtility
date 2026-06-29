"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { HeroReveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import { business } from "@/lib/site";

const serviceLayoutOrder = [0, 1, 2, 5, 3, 4];

function diagonalOffsetClass(index: number): string {
  const col = index % 3;
  return `services-bento__offset services-bento__offset--c${col}`;
}

export function HomePage() {
  return (
    <>
      <div className="hero-parallax-fixed" aria-hidden>
        <Image src="/images/residential-utility-hero.png" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="hero-gradient hero-gradient--flow absolute inset-0" />
      </div>

      <section className="relative z-10 min-h-[85svh]">
        <div className="container-page flex min-h-[85svh] flex-col justify-end pb-16 pt-8 md:justify-center md:pb-24 md:pt-12">
          <HeroReveal className="max-w-4xl">
            <p className="eyebrow">Family-owned · {business.warranty}</p>
            <h1 className="heading-hero mt-4">Twin Cities Sewer And Water All Stars</h1>
            <p className="text-lead mt-5 max-w-2xl">
              Over 20 years of sewer, water, and excavation experience — with an owner/operator on every job and a crew that shows up.
            </p>
            <div className="mt-8">
              <Link className="button-primary" href="/contact">Request free consultation</Link>
            </div>
          </HeroReveal>
        </div>
      </section>

      <div className="scroll-over-content relative z-10">
        <section className="section-flow services-section">
          <div className="container-page">
            <Stagger className="services-bento">
              {serviceLayoutOrder.map((serviceIndex, index) => {
                const service = services[serviceIndex];
                const Icon = service.icon;
                return (
                  <StaggerItem key={service.title} className="w-full self-start">
                    <div className={`${diagonalOffsetClass(index)} h-full w-full`}>
                      <Link href={service.href} className="service-card glass-panel glass-panel--interactive group flex flex-col p-6 no-underline">
                        <Icon className="text-[#3b8ff0] transition group-hover:text-[#d71920]" size={28} aria-hidden />
                        <h3 className="mt-5 line-clamp-2 text-xl font-black text-white">{service.title}</h3>
                        <p className="mt-3 line-clamp-3 flex-1 leading-7 text-white/72">{service.summary}</p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#3b8ff0] group-hover:text-[#d71920]">
                          View details <ArrowRight size={16} aria-hidden />
                        </span>
                      </Link>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <CtaBand />

        <section className="section-flow">
          <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="Why customers call" title="This is the kind of work where experience matters">
              <p>
                Sewer and water projects affect access, safety, utilities, restoration, and city requirements. We bring over 20 years of experience,
                with an owner/operator involved and the work handled by our own crew.
              </p>
            </SectionHeading>
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {business.credentials.map((credential) => (
                <StaggerItem key={credential} className="glass-panel flex items-center justify-center p-4 text-center text-sm font-bold leading-6 text-white/88">
                  {credential}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-flow--tight home-bottom-panel">
          <div className="container-page">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <div>
                <p className="eyebrow">Service areas</p>
                <h2 className="heading-section mt-2">Twin Cities metro coverage</h2>
                <p className="text-lead mt-3">Minneapolis, St. Paul, and surrounding neighborhoods.</p>
              </div>
              <Link className="button-secondary button-secondary--brand w-full max-w-sm justify-center" href="/service-areas">
                <MapPin size={18} aria-hidden />
                View service areas
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
