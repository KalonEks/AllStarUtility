import Image from "next/image";
import Link from "next/link";
import { business, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative pb-20 md:pb-0">
      <div className="container-page footer-main grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-16 place-items-center overflow-hidden rounded-xl border border-white/10 bg-black/40 p-1">
              <Image src="/images/all-star-utilities-logo.png" alt="All-Star Utilities logo" width={96} height={96} className="h-full w-full object-contain" />
            </span>
            <p className="text-xl font-black text-white">{business.name}</p>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/72">
            Twin Cities sewer, water, excavation, and sewer pipe lining specialists. Family-owned and operated since {business.founded}.
          </p>
          <p className="mt-4 text-sm text-white/72">{business.primaryAddress}</p>
          <p className="text-sm text-white/72">{business.secondaryAddress}</p>
        </div>
        <div>
          <p className="font-black text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-white/82">
            <a className="transition hover:text-[#3b8ff0]" href={`tel:${business.phoneHref}`}>{business.phone}</a>
            <a className="font-bold text-[#d71920] transition hover:text-white" href={`tel:${business.emergencyPhoneHref}`}>
              24/7 emergency: {business.emergencyPhone}
            </a>
            {business.email.includes("PLACEHOLDER") ? (
              <span className="text-white/55">Email pending confirmation</span>
            ) : (
              <a className="transition hover:text-[#3b8ff0]" href={`mailto:${business.email}`}>{business.email}</a>
            )}
          </div>
        </div>
        <div>
          <p className="font-black text-white">Site Map</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/78">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#d71920] hover:underline">{item.label}</Link>
            ))}
            <Link href="/contact" className="transition hover:text-[#d71920] hover:underline">Contact</Link>
          </div>
        </div>
      </div>
      <p className="container-page py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </p>
    </footer>
  );
}
