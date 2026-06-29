import { Phone } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion";
import { business } from "@/lib/site";

export function CtaBand({ title = "Request a free site evaluation" }: { title?: string }) {
  return (
    <section className="section-flow--tight">
      <div className="container-page">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <div>
            <p className="heading-section">{title}</p>
            <p className="text-lead mt-3">
              Send us the address, what is happening, and how urgent it is. We will review the details and follow up with the next step.
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <a className="button-secondary w-full justify-center" href={`tel:${business.phoneHref}`}>
              <Phone size={18} aria-hidden />
              Call {business.phone}
            </a>
            <Link className="button-primary w-full justify-center" href="/contact">Free Consultation</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
