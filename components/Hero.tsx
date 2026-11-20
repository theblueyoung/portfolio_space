"use client";

import Image from "next/image";
import { useRef } from "react";
import { CursorReveal } from "./CursorReveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="home" aria-label="Introduction" className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background: the dark night scene, shown exactly as supplied, so the copy reads with high contrast */}
      <Image
        src="/images/hero-base.jpg"
        alt="An astronaut in a dark field of softly glowing flowers"
        fill
        priority
        sizes="100vw"
        className="hero-img z-0 object-cover"
      />

      {/* Cursor-following reveal of the daytime scene — above background, below all UI */}
      <CursorReveal src="/images/hero-reveal-day.jpg" areaRef={sectionRef} />

      {/* Feathered atmospheric shadow behind the copy. No hard edges; fades toward the centre. */}
      <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0 z-[6]" />
      {/* Gentle top fade for nav legibility and a soft bottom hand-off into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-40 bg-gradient-to-b from-[rgba(9,7,32,0.35)] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-28 bg-gradient-to-b from-transparent to-night" />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-[780px] pt-10">
          <p className="hero-in font-display text-[10px] font-medium tracking-[0.24em] text-white/85 sm:text-xs sm:tracking-[0.34em]" style={{ animationDelay: "150ms" }}>
            INTERACTION DESIGNER <span className="mx-2 text-lavender/70">/</span> UX/UI DESIGNER
          </p>

          <h1
            className="hero-in mt-6 font-display text-[clamp(2.2rem,3.6vw,3.75rem)] font-light leading-[1.04] tracking-[-0.025em] text-white"
            style={{ animationDelay: "300ms" }}
          >
            <span className="sm:whitespace-nowrap">Where Human&#8209;Centric</span>
            <br />
            <span className="sm:whitespace-nowrap">Design Meets AI</span>
            <br />
            <span className="bg-gradient-to-r from-lavender via-[#d9c9ff] to-blush bg-clip-text font-normal text-transparent">Experience</span>
          </h1>

          <p className="hero-in mt-7 max-w-[440px] text-[15px] leading-[1.75] text-white/75 sm:text-base" style={{ animationDelay: "450ms" }}>
            I design intuitive, emotional and intelligent digital experiences — blending research, interaction and AI to create
            products people genuinely love to use.
          </p>
        </div>
      </div>


      {/* Scroll cue */}
      <a href="#work" className="group absolute bottom-8 left-6 z-10 flex items-center gap-4 sm:left-10 lg:left-16">
        <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-lavender to-transparent" />
        </span>
        <span className="hero-tag font-display text-[10px] tracking-[0.34em] text-white/75 transition-colors group-hover:text-white">SCROLL TO EXPLORE</span>
      </a>

      <style>{`
        .hero-shade { background: radial-gradient(ellipse 120% 62% at 20% 52%, rgba(9,7,32,0.66) 0%, rgba(9,7,32,0.46) 38%, rgba(9,7,32,0.18) 68%, rgba(9,7,32,0) 90%); }
        @media (min-width: 768px) { .hero-shade { background: radial-gradient(ellipse 62% 78% at 8% 56%, rgba(9,7,32,0.62) 0%, rgba(9,7,32,0.42) 32%, rgba(9,7,32,0.16) 58%, rgba(9,7,32,0) 78%); } }
        .hero-tag { text-shadow: 0 1px 12px rgba(9,7,32,0.65); }
        .hero-in { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(8px); animation: hero-in 1.4s var(--ease-cinema) forwards; }
        @keyframes hero-in { to { opacity: 1; transform: none; filter: none; } }
        @media (prefers-reduced-motion: reduce) { .hero-in { opacity: 1; transform: none; filter: none; animation: none; } }
      `}</style>
    </section>
  );
}
