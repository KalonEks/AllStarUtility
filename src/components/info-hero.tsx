import { FadeIn } from "@/components/motion";

export function InfoHero({
  eyebrow,
  title,
  description,
  align = "left",
  showDivider = true,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  showDivider?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <section className={`section-flow--tight relative overflow-hidden pt-8 md:pt-12 ${className || ""}`}>
      <div className="container-page">
        <FadeIn className={centered ? "mx-auto max-w-3xl text-center" : undefined}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={`heading-display mt-4 ${centered ? "mx-auto max-w-4xl" : "max-w-4xl"}`}>{title}</h1>
          <p className={`text-lead mt-5 ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>{description}</p>
        </FadeIn>
      </div>
      {showDivider ? <div className="flow-divider container-page mt-10" /> : null}
    </section>
  );
}
