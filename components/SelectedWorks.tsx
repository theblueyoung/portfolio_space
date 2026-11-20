"use client";

import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal, useTilt } from "./motion";

// Asymmetric editorial layout: [column span, aspect, vertical offset] per card on large screens.
const LAYOUT = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-40" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:-mt-24" },
  { span: "lg:col-span-7", aspect: "aspect-[16/11]", offset: "lg:mt-16" },
  { span: "lg:col-span-10 lg:col-start-2", aspect: "aspect-[21/9]", offset: "lg:mt-8" },
];

export function SelectedWorks() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute right-[-10%] top-[8%] h-[600px] w-[600px] rounded-full bg-lilac/15 blur-[160px]" />
        <div className="animate-drift absolute left-[-15%] top-[55%] h-[520px] w-[520px] rounded-full bg-blush/10 blur-[160px]" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.34em] text-lavender/80">WORK</p>
          <h2 id="work-title" className="mt-5 font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-light leading-[1.1] tracking-[-0.025em] md:whitespace-nowrap">
            Digital Products &amp; <span className="bg-gradient-to-r from-lavender to-blush bg-clip-text text-transparent">Interfaces</span> I&apos;ve Crafted
          </h2>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12 lg:gap-y-10">
          {projects.map((p, i) => (
            <li key={p.slug} className={`${LAYOUT[i % LAYOUT.length].span} ${LAYOUT[i % LAYOUT.length].offset}`}>
              <Reveal delay={i % 2 ? 140 : 0}>
                <WorkCard project={p} index={i} aspect={LAYOUT[i % LAYOUT.length].aspect} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkCard({ project, index, aspect }: { project: Project; index: number; aspect: string }) {
  const tiltRef = useTilt<HTMLAnchorElement>(5, 14);
  return (
    <Link
      ref={tiltRef}
      href={`/work/${project.slug}`}
      className="tilt group block rounded-[32px] focus-visible:outline-offset-8"
      aria-label={`${project.title} — ${project.category}, ${project.year}. View project`}
    >
      <div className={`relative ${aspect} overflow-hidden rounded-[32px] hairline shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] transition-[box-shadow,border-color] duration-700 group-hover:border-lavender/30 group-hover:shadow-[0_50px_120px_-30px_rgba(169,155,255,0.45)]`}>
        <div className="absolute inset-0 scale-[1.04] transition-transform duration-[1.4s] ease-[var(--ease-cinema)] group-hover:scale-[1.1]">
          <ProjectVisual project={project} />
        </div>
        <div aria-hidden="true" className="tilt-glow pointer-events-none absolute inset-0" />

        <span className="absolute left-6 top-6 font-display text-[11px] tracking-[0.3em] text-white/60 sm:left-8 sm:top-8">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Caption sits below the visual so it never competes with the screenshots */}
      <div className="mt-6 px-1" style={{ transform: "translateZ(30px)" }}>
        <p className="text-[12px] tracking-[0.14em] text-lavender/90">{project.category}</p>
        <div className="mt-2 flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-light tracking-tight sm:text-[2rem]">{project.title}</h3>
          <span className="shrink-0 font-display text-[12px] tracking-[0.2em] text-white/50">{project.year}</span>
        </div>
        <span className="mt-3 inline-flex items-center gap-2 overflow-hidden text-[13px] tracking-[0.12em] text-white/80">
          <span className="translate-y-0 transition-transform duration-700 ease-[var(--ease-cinema)] sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-visible:translate-y-0">
            View Project →
          </span>
        </span>
      </div>
    </Link>
  );
}
