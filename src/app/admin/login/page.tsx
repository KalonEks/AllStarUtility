import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
import { InfoHero } from "@/components/info-hero";
import { FadeIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <InfoHero
        align="center"
        showDivider={false}
        eyebrow="Admin access"
        title="Sign in to the dashboard"
        description="Private access for manually-created All-Star Utilities admin users."
      />
      <section className="section-flow contact-page-form">
        <div className="container-page mx-auto max-w-xl">
          <FadeIn>
            <LoginForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
