import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="section-flow--tight pt-8 md:pt-12">
        <div className="container-page max-w-3xl">
          <FadeIn>
            <p className="eyebrow">Legal</p>
            <h1 className="heading-display mt-4">{title}</h1>
            <p className="mt-2 text-sm font-bold text-white/55">Draft. Last updated: {updated}.</p>
          </FadeIn>
        </div>
        <div className="flow-divider container-page mt-10" />
      </section>
      <section className="section-flow pt-0">
        <div className="container-page max-w-3xl">
          <FadeIn className="glass-panel grid gap-5 p-8 leading-8 text-white/82">{children}</FadeIn>
        </div>
      </section>
    </>
  );
}
