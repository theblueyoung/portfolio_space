import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: `${p.title} — Yooyoung Jeon`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Nav />
      <main id="main" className="relative overflow-hidden bg-night pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-violet/50 blur-[160px]" />
          <div className="animate-drift absolute -right-40 top-[40%] h-[500px] w-[500px] rounded-full bg-blush/10 blur-[160px]" style={{ animationDelay: "-8s" }} />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <Link href="/#work" className="group inline-flex items-center gap-3 text-[13px] tracking-[0.14em] text-white/60 transition hover:text-white">
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1">
              ←
            </span>
            All work
          </Link>

          <p className="mt-12 text-[12px] tracking-[0.2em] text-lavender/90">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-extralight leading-[1] tracking-[-0.035em]">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">{project.summary}</p>

          <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-[36px] hairline shadow-[0_60px_140px_-50px_rgba(169,155,255,0.5)]">
            <ProjectVisual project={project} variant="cover" priority />
          </div>

          <dl className="mt-20 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-white/40">ROLE</dt>
              <dd className="mt-3 text-[15px] text-white/85">{project.role}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-white/40">TOOLS</dt>
              <dd className="mt-3 text-[15px] text-white/85">{project.tools.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-white/40">CHALLENGE</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-white/70">{project.challenge}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-white/40">OUTCOME</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-white/70">{project.outcome}</dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[14px] tracking-[0.06em] text-white/85 hairline bg-white/[0.03] transition-all duration-500 hover:border-lavender/50 hover:bg-lavender/10 hover:text-white"
                >
                  {l.label}
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section aria-label={`${project.title} screens`} className="mt-28">
              <p className="font-display text-[10px] tracking-[0.3em] text-white/40">SCREENS</p>
              <ul
                className={`mt-8 grid gap-6 ${
                  project.gallery[0].device === "phone" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {project.gallery.map((shot) => (
                  <li key={shot.src}>
                    <figure>
                      <div
                        className={`relative overflow-hidden hairline shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] ${
                          shot.device === "phone" ? "aspect-[390/844] rounded-[28px]" : "aspect-[16/10] rounded-[20px]"
                        }`}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes={shot.device === "phone" ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="object-cover object-top"
                        />
                      </div>
                      <figcaption className="mt-3 text-[13px] text-white/50">{shot.alt}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            href={`/work/${next.slug}`}
            className="group mt-28 flex items-end justify-between gap-6 rounded-[32px] p-8 hairline bg-white/[0.03] transition-all duration-700 hover:border-lavender/40 hover:bg-lavender/[0.06] sm:p-12"
          >
            <span>
              <span className="block font-display text-[10px] tracking-[0.3em] text-white/40">NEXT PROJECT</span>
              <span className="mt-3 block font-display text-3xl font-light tracking-tight sm:text-5xl">{next.title}</span>
            </span>
            <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 transition-all duration-700 group-hover:-rotate-45 group-hover:border-lavender group-hover:bg-lavender/20">
              →
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
