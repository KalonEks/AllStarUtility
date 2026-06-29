"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { business, navItems } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const isOwner = pathname.startsWith("/owner");
  const isMarketing = !isOwner;

  return (
    <header
      className={
        isOwner
          ? "sticky top-0 z-50 border-b border-[#d7dde7] bg-white/96 shadow-sm shadow-slate-950/5 backdrop-blur-xl"
          : "relative z-50 bg-transparent"
      }
    >
      {isMarketing ? (
        <div className="h-0.5 bg-[linear-gradient(90deg,#d71920_0%,#d71920_34%,rgb(255_255_255/0.25)_34%,rgb(255_255_255/0.25)_66%,#0b63ce_66%,#0b63ce_100%)]" />
      ) : null}
      <div className={`container-page flex items-center justify-between gap-3 py-2 ${isMarketing ? "min-h-[4.75rem] md:min-h-[5.5rem]" : "min-h-[5.25rem] md:min-h-24"}`}>
        <Link href="/" className="flex min-w-0 items-center gap-2.5 leading-tight no-underline sm:gap-3">
          <span className="grid h-[4.25rem] w-[5.5rem] place-items-center overflow-visible md:h-[5rem] md:w-[6.25rem]">
            <Image
              src="/images/all-star-utilities-logo.png"
              alt="All-Star Utilities logo"
              width={220}
              height={150}
              className="h-full w-full object-contain object-[center_42%]"
              priority
            />
          </span>
          <span className="hidden min-w-0 sm:grid">
            <span className={`text-base font-black md:text-lg ${isOwner ? "text-[#06111f]" : "text-white"}`}>{business.name}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wide md:text-[11px] ${isOwner ? "text-[#64748b]" : "text-white/60"}`}>
              {business.tagline}
            </span>
            {!isOwner ? (
              <a
                href={`tel:${business.phoneHref}`}
                className="mt-0.5 text-xs font-bold text-white/75 transition hover:text-white"
              >
                {business.phone}
              </a>
            ) : null}
          </span>
        </Link>
        {isOwner ? (
          <nav className="hidden items-center gap-4 text-xs font-bold lg:flex text-[#172033]" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "text-[#0b63ce]" : "transition-colors hover:text-[#d71920]"}>
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="hidden lg:flex items-center gap-5">
            <nav className="flex items-center gap-4 text-xs font-bold text-white/85" aria-label="Primary navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "text-[#3b8ff0]" : "transition-colors hover:text-white"}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link className="button-primary button-primary-sm shrink-0" href="/contact">
              Free Consultation
            </Link>
          </div>
        )}
        {isOwner ? (
          <div className="hidden md:block">
            <Link className="button-primary button-primary-sm" href="/contact">Free Consultation</Link>
          </div>
        ) : null}
        <details className="group lg:hidden">
          <summary
            className={`inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md border transition [&::-webkit-details-marker]:hidden ${
              isOwner
                ? "border-[#d7dde7] bg-white text-[#06111f]"
                : "border-white/20 bg-black/25 text-white backdrop-blur-sm"
            }`}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <Menu size={20} className="group-open:hidden" aria-hidden />
            <X size={20} className="hidden group-open:block" aria-hidden />
          </summary>
          <div
            className={`fixed left-0 right-0 top-[calc(4.75rem+2px)] border-t shadow-xl md:top-[calc(5.5rem+2px)] ${
              isOwner ? "border-[#d7dde7] bg-white" : "border-white/10 bg-[#0a1220]/95 backdrop-blur-xl"
            }`}
          >
            <nav
              className={`container-page grid gap-1 py-3 text-sm font-bold ${isOwner ? "text-[#172033]" : "text-white"}`}
              aria-label="Mobile navigation"
            >
              {!isOwner ? (
                <a href={`tel:${business.phoneHref}`} className="rounded-md px-3 py-2 text-[#3b8ff0]">
                  Call {business.phone}
                </a>
              ) : null}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2.5 transition ${
                    pathname === item.href
                      ? isOwner
                        ? "bg-[#eef3fb] text-[#0b63ce]"
                        : "bg-white/10 text-[#3b8ff0]"
                      : isOwner
                        ? "hover:bg-[#fff1f1]"
                        : "hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link className="button-primary mt-2 justify-center" href="/contact">
                Free Consultation
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
