"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-700 ease-[var(--ease-cinema)] ${
        scrolled ? "border-b border-white/[0.06] bg-night/40 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/#home" className="font-display text-[13px] font-medium tracking-[0.32em] text-white/95 transition hover:text-lavender">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group relative text-[13px] tracking-[0.08em] text-white/75 transition-colors duration-500 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-lavender to-blush transition-transform duration-500 ease-[var(--ease-cinema)] group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full hairline md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-5 bg-white transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
          <span className={`absolute h-px w-5 bg-white transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-night/90 px-8 backdrop-blur-2xl transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-6">
          {site.nav.map((item, i) => (
            <li key={item.label} style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }} className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <Link href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="font-display text-4xl font-light text-white/90">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
