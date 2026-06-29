"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { business, navItems } from "@/lib/site";

const adminNavItems = [
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/", label: "Public site" },
];

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const links = isAdmin ? adminNavItems : navItems;

  return (
    <header className="relative z-50 bg-transparent">
      <div className="h-0.5 bg-[linear-gradient(90deg,#d71920_0%,#d71920_34%,rgb(255_255_255/0.25)_34%,rgb(255_255_255/0.25)_66%,#0b63ce_66%,#0b63ce_100%)]" />
      <div className="container-page flex min-h-[4.75rem] items-center justify-between gap-3 py-2 md:min-h-[5.5rem]">
        <div className="flex min-w-0 items-center gap-2.5 leading-tight sm:gap-3">
          <Link href="/" className="grid h-[4.25rem] w-[5.5rem] place-items-center overflow-visible no-underline md:h-[5rem] md:w-[6.25rem]">
            <Image
              src="/images/all-star-utilities-logo.png"
              alt="All-Star Utilities logo"
              width={220}
              height={150}
              className="h-full w-full object-contain object-[center_42%]"
              priority
            />
          </Link>
          <span className="hidden min-w-0 sm:grid">
            <Link href="/" className="text-base font-black text-white no-underline md:text-lg">
              {business.name}
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/60 md:text-[11px]">
              {isAdmin ? "Admin dashboard" : business.tagline}
            </span>
            {!isAdmin ? (
              <a
                href={`tel:${business.phoneHref}`}
                className="mt-0.5 text-xs font-bold text-white/75 transition hover:text-white"
              >
                {business.phone}
              </a>
            ) : null}
          </span>
        </div>
        <div className="hidden items-center gap-5 lg:flex">
          <nav className="flex items-center gap-4 text-xs font-bold text-white/85" aria-label="Primary navigation">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "text-[#3b8ff0]" : "transition-colors hover:text-white"}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {!isAdmin ? (
            <Link className="button-primary button-primary-sm shrink-0" href="/contact">
              Free Consultation
            </Link>
          ) : null}
        </div>
        <details className="group lg:hidden">
          <summary className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-white/20 bg-black/25 text-white backdrop-blur-sm transition [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle navigation menu</span>
            <Menu size={20} className="group-open:hidden" aria-hidden />
            <X size={20} className="hidden group-open:block" aria-hidden />
          </summary>
          <div className="fixed left-0 right-0 top-[calc(4.75rem+2px)] border-t border-white/10 bg-[#0a1220]/95 shadow-xl backdrop-blur-xl md:top-[calc(5.5rem+2px)]">
            <nav className="container-page grid gap-1 py-3 text-sm font-bold text-white" aria-label="Mobile navigation">
              {!isAdmin ? (
                <a href={`tel:${business.phoneHref}`} className="rounded-md px-3 py-2 text-[#3b8ff0]">
                  Call {business.phone}
                </a>
              ) : null}
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2.5 transition ${
                    pathname === item.href ? "bg-white/10 text-[#3b8ff0]" : "hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!isAdmin ? (
                <Link className="button-primary mt-2 justify-center" href="/contact">
                  Free Consultation
                </Link>
              ) : null}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
