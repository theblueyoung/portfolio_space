"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Reveal, useInView, useTilt } from "./motion";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wrapRef, inView] = useInView<HTMLDivElement>("150px");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let frame = 0;
    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };
    let ps: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.1,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        if (!reduced) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -5) {
            p.y = h + 5;
            p.x = Math.random() * w;
          }
        }
        const alpha = p.a * (0.6 + Math.sin(t / 900 + p.tw) * 0.4);
        ctx.fillStyle = `rgba(220,205,255,${alpha})`;
        ctx.shadowColor = "rgba(244,185,227,0.8)";
        ctx.shadowBlur = p.r * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [inView]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export function Footer() {
  const ctaRef = useTilt<HTMLAnchorElement>(10, 24);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-night pt-32 sm:pt-44">
      {/* Final-scene atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-[#0a0824] to-[#04030f]" />
        <div className="animate-drift absolute bottom-[-20%] left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-violet/45 blur-[180px]" />
        <div className="animate-drift absolute bottom-[-10%] left-[15%] h-[380px] w-[480px] rounded-full bg-blush/15 blur-[140px]" style={{ animationDelay: "-7s" }} />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(200,182,255,0.16),transparent_70%)]" />
      </div>
      <Particles />

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.34em] text-lavender/80">CONTACT</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="contact-title" className="mt-8 max-w-[1300px] font-display text-[clamp(2.8rem,8vw,8.5rem)] font-extralight leading-[0.98] tracking-[-0.04em]">
            Let&apos;s build something{" "}
            <span className="text-glow bg-gradient-to-r from-lavender via-[#e4d8ff] to-blush bg-clip-text font-light text-transparent">alive</span>{" "}
            together.
          </h2>
        </Reveal>

        <Reveal delay={220} className="mt-16 flex flex-col items-start gap-10 sm:flex-row sm:items-center">
          <a
            ref={ctaRef}
            href={`mailto:${site.email}?subject=${encodeURIComponent("Let's create something together")}`}
            className="tilt group relative inline-flex items-center gap-6 rounded-full py-3 pl-9 pr-3 hairline bg-white/[0.04] backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(169,155,255,0.6)] transition-colors duration-700 hover:border-lavender/50 hover:bg-lavender/10"
          >
            <span aria-hidden="true" className="tilt-glow pointer-events-none absolute inset-0 rounded-full" />
            <span className="relative font-display text-lg font-light tracking-wide sm:text-xl" style={{ transform: "translateZ(20px)" }}>
              Let&apos;s Create
            </span>
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-lavender to-blush text-night transition-transform duration-700 ease-[var(--ease-cinema)] group-hover:rotate-[-45deg] group-hover:scale-110"
              style={{ transform: "translateZ(30px)" }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </Reveal>

        <div className="mt-32 grid gap-12 border-t border-white/10 py-12 sm:grid-cols-3 sm:items-start">
          <div>
            <Link href="/#home" className="font-display text-[13px] font-medium tracking-[0.32em]">
              {site.name}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block w-fit text-[13px] leading-relaxed text-white/45 transition hover:text-white"
            >
              {site.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="font-display text-[10px] tracking-[0.3em] text-white/35">NAVIGATE</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-[14px] text-white/70 transition hover:text-lavender">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-display text-[10px] tracking-[0.3em] text-white/35">ELSEWHERE</p>
            <ul className="mt-4 space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[14px] text-white/70 transition hover:text-lavender">
                    {s.label}
                    <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-8 text-[12px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <a href="#home" className="tracking-[0.2em] transition hover:text-white">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
