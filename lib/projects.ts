export type Shot = { src: string; alt: string; device: "desktop" | "phone" };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  tools: string[];
  challenge: string;
  outcome: string;
  /** Card image (shown in the Work grid). */
  image?: string;
  /** Wide image for the top of the project page; falls back to `image`. */
  cover?: string;
  /** Optional muted looping preview, e.g. "/videos/<slug>.mp4". */
  video?: string;
  /** Screens shown on the project page. */
  gallery?: Shot[];
  links?: { label: string; href: string }[];
  /** Colours for the generated placeholder visual, used only when there is no image. */
  palette?: [string, string, string];
  mock?: "dashboard" | "mobile" | "ai" | "spatial" | "system";
};

// Card and gallery images in /public/images/work are screenshots of each project,
// composed onto the site's backdrop (see README).
export const projects: Project[] = [
  {
    slug: "visit-jeju",
    title: "Visit Jeju",
    category: "Web Design · Responsive Website",
    year: "2026",
    summary: "A mobile-first tourism website that invites travellers to slow down and explore Jeju's volcanic landscapes, culture and Olle trails.",
    role: "Web Designer & Front-end Developer",
    tools: ["HTML", "CSS (Flexbox, media queries)", "No JavaScript"],
    challenge: "Present an island's nature, culture and walking trails clearly on any screen size, using only HTML and CSS.",
    outcome: "A five-page responsive site — Home, About Jeju, Things to Do, Gallery and the Olle Trail — with a CSS-only mobile menu.",
    image: "/images/work/jeju-card.webp",
    cover: "/images/work/jeju-cover.webp",
    gallery: [
      { src: "/images/work/jeju-index.webp", alt: "Visit Jeju home page", device: "desktop" },
      { src: "/images/work/jeju-about-jeju.webp", alt: "About Jeju page", device: "desktop" },
      { src: "/images/work/jeju-things-to-do.webp", alt: "Things to Do page", device: "desktop" },
      { src: "/images/work/jeju-ollie-trail.webp", alt: "Jeju Olle Trail page", device: "desktop" },
      { src: "/images/work/jeju-gallery.webp", alt: "Gallery page", device: "desktop" },
    ],
    links: [{ label: "View code on GitHub", href: "https://github.com/theblueyoung/usyd_jeju" }],
  },
  {
    slug: "24dday",
    title: "24dday",
    category: "Mobile App · UX/UI Prototype",
    year: "2026",
    summary: "A moving companion app that counts down to the balance-payment day and keeps the schedule, money and moving services in one place shared with the people you move with.",
    role: "UX/UI Designer — concept, information architecture and interactive prototype",
    tools: ["Desk research (reviews & guides)", "Information architecture", "Interactive HTML prototype"],
    challenge: "First-time movers in Korea juggle contract dates, loans, documents and service quotes across many parties, and it is easy to miss a step or a deadline.",
    outcome: "An interactive prototype with a D-day home dashboard, a stage-by-stage schedule with shared tasks, funds planning and a My page for move details and co-movers.",
    image: "/images/work/24dday-card.webp",
    cover: "/images/work/24dday-cover.webp",
    gallery: [
      { src: "/images/work/24dday-home.webp", alt: "Home: D-day countdown, progress and tasks for now", device: "phone" },
      { src: "/images/work/24dday-tl.webp", alt: "Schedule: stage-by-stage checklist with assignees", device: "phone" },
      { src: "/images/work/24dday-fund.webp", alt: "Funds: amount needed and balances by bank", device: "phone" },
      { src: "/images/work/24dday-my.webp", alt: "My page: move details and co-mover management", device: "phone" },
    ],
    links: [{ label: "View code on GitHub", href: "https://github.com/theblueyoung/24dday-purple" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
