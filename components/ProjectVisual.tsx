import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Shows the project's screenshot/video when provided; otherwise a generated,
 * on-brand interface mock so the layout never looks empty.
 */
export function ProjectVisual({
  project,
  priority = false,
  variant = "card",
}: {
  project: Project;
  priority?: boolean;
  /** "cover" uses the wide project-page image when there is one. */
  variant?: "card" | "cover";
}) {
  const src = variant === "cover" ? project.cover ?? project.image : project.image;
  if (project.video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={project.video}
        poster={project.image}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }
  if (src) {
    return (
      <Image
        src={src}
        alt={`${project.title} screens`}
        fill
        sizes={variant === "cover" ? "(min-width: 1400px) 1300px, 100vw" : "(min-width: 1024px) 60vw, 100vw"}
        className="object-cover"
        priority={priority}
      />
    );
  }
  return <MockVisual project={project} />;
}

function MockVisual({ project }: { project: Project }) {
  const [a, b, bg] = project.palette ?? ["#c8b6ff", "#f4b9e3", "#1b1440"];
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${a}33, transparent 55%), radial-gradient(90% 80% at 90% 90%, ${b}2e, transparent 60%), ${bg}`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute inset-0 flex items-center justify-center px-[10%] pb-[30%] pt-[14%]" style={{ transform: "translate(calc(var(--px,0) * -14px), calc(var(--py,0) * -14px))", transition: "transform .6s cubic-bezier(.22,1,.36,1)" }}>
        {(project.mock ?? "mobile") === "mobile" && <MobileMock a={a} b={b} />}
        {project.mock === "dashboard" && <DashboardMock a={a} b={b} />}
        {project.mock === "ai" && <AiMock a={a} b={b} />}
        {project.mock === "spatial" && <SpatialMock a={a} b={b} />}
        {project.mock === "system" && <SystemMock a={a} b={b} />}
      </div>
    </div>
  );
}

const glass = "rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]";

function MobileMock({ a, b }: { a: string; b: string }) {
  return (
    <div className="flex h-full items-center gap-[6%]">
      {[0, 1].map((k) => (
        <div key={k} className={`${glass} relative aspect-[9/19] h-[92%] rounded-[28px] p-[6%] ${k ? "translate-y-[8%] opacity-80" : ""}`}>
          <div className="mx-auto h-1.5 w-1/3 rounded-full bg-white/25" />
          <div className="mt-[14%] aspect-square w-full rounded-full" style={{ background: `conic-gradient(from 200deg, ${a}, ${b}, ${a}22 70%)`, mask: "radial-gradient(circle, transparent 58%, #000 60%)", WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%)" }} />
          <div className="mt-[12%] space-y-2">
            <div className="h-2 w-3/4 rounded bg-white/50" />
            <div className="h-2 w-1/2 rounded bg-white/25" />
          </div>
          <div className="mt-[12%] grid grid-cols-2 gap-2">
            <div className="aspect-square rounded-xl" style={{ background: `${a}40` }} />
            <div className="aspect-square rounded-xl" style={{ background: `${b}33` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardMock({ a, b }: { a: string; b: string }) {
  const bars = [40, 65, 52, 80, 58, 92, 70, 84];
  return (
    <div className={`${glass} grid h-full w-full grid-cols-[22%_1fr] gap-[3%] p-[3%]`}>
      <div className="space-y-3 rounded-xl bg-white/[0.04] p-3">
        {[70, 50, 60, 40, 55].map((w, i) => (
          <div key={i} className="h-2 rounded bg-white/25" style={{ width: `${w}%`, opacity: i === 1 ? 1 : 0.6 }} />
        ))}
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-[4%]">
        <div className="grid grid-cols-3 gap-3">
          {[a, b, "#ffffff"].map((c, i) => (
            <div key={i} className="rounded-xl bg-white/[0.05] p-3">
              <div className="h-1.5 w-1/2 rounded bg-white/30" />
              <div className="mt-2 h-3 w-2/3 rounded" style={{ background: c, opacity: 0.8 }} />
            </div>
          ))}
        </div>
        <div className="flex items-end gap-[3%] rounded-xl bg-white/[0.04] p-[4%]">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: `linear-gradient(to top, ${a}55, ${i % 3 === 0 ? b : a})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiMock({ a, b }: { a: string; b: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-[70%] aspect-square rounded-full blur-2xl" style={{ background: `radial-gradient(circle, ${a}88, ${b}33 50%, transparent 70%)` }} />
      <div className="relative w-[78%] space-y-3">
        <div className={`${glass} ml-auto w-[70%] p-4`}>
          <div className="h-2 w-5/6 rounded bg-white/45" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/25" />
        </div>
        <div className={`${glass} w-[82%] p-4`} style={{ borderColor: `${b}66` }}>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />
            <div className="h-2 w-1/3 rounded bg-white/50" />
          </div>
          <div className="mt-3 h-2 w-full rounded bg-white/30" />
          <div className="mt-2 h-2 w-4/5 rounded bg-white/20" />
          <div className="mt-3 flex gap-2">
            <span className="h-5 w-16 rounded-full" style={{ background: `${a}44` }} />
            <span className="h-5 w-12 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpatialMock({ a, b }: { a: string; b: string }) {
  return (
    <div className="relative h-full w-full" style={{ perspective: "800px" }}>
      <div className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom" style={{ transform: "rotateX(68deg)", backgroundImage: `linear-gradient(${a}55 1px, transparent 1px), linear-gradient(90deg, ${a}55 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
        <path d="M40 230 C 140 200, 160 140, 220 120 S 340 60, 370 30" fill="none" stroke={b} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
        <circle cx="370" cy="30" r="10" fill={a} opacity="0.9" />
        <circle cx="370" cy="30" r="22" fill="none" stroke={a} opacity="0.4" />
      </svg>
      <div className={`${glass} absolute right-[8%] top-[34%] w-[34%] p-3`}>
        <div className="h-2 w-2/3 rounded bg-white/50" />
        <div className="mt-2 h-2 w-1/2 rounded bg-white/25" />
      </div>
    </div>
  );
}

function SystemMock({ a, b }: { a: string; b: string }) {
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-3">
      <div className={`${glass} col-span-2 flex items-center gap-3 p-4`}>
        <span className="h-8 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${a}, ${b})` }} />
        <span className="h-8 w-20 rounded-full border border-white/30" />
      </div>
      <div className={`${glass} flex items-center justify-center`}>
        <span className="relative h-6 w-11 rounded-full" style={{ background: a }}>
          <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>
      <div className={`${glass} row-span-2 p-4`}>
        {[a, b, "#ffffff", `${a}88`].map((c, i) => (
          <div key={i} className="mb-2 h-6 rounded-lg" style={{ background: c, opacity: 0.85 }} />
        ))}
      </div>
      <div className={`${glass} col-span-2 row-span-2 p-4`}>
        <div className="h-2 w-1/3 rounded bg-white/50" />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg" style={{ background: i % 3 ? "rgba(255,255,255,.07)" : `${b}44` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
