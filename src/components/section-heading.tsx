import { FadeIn } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <FadeIn className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className={`heading-section mt-3 ${align === "center" ? "mx-auto" : ""}`}>{title}</h2>
      {children ? <div className="text-lead mt-4">{children}</div> : null}
    </FadeIn>
  );
}
