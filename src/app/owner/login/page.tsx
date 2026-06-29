import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Owner Login",
  robots: { index: false, follow: false },
};

export default function OwnerLoginPage() {
  return (
    <div className="admin-surface min-h-[60vh]">
      <section className="section-pad">
        <div className="container-page max-w-xl">
          <h1 className="text-4xl font-black text-[#06111f]">Owner login</h1>
          <p className="mt-3 leading-7 text-[#475569]">Private access for manually-created All-Star Utilities owner/admin users.</p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
