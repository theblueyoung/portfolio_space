# Yooyoung Jeon — Portfolio (project guide for Claude)

Owner: Yooyoung Jeon, Interaction / UX/UI designer. The user writes in Korean; reply in Korean.

## Stack and commands
Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

- `npm install` once, then `npm run dev` → http://localhost:3000
- `npm run build` must pass before pushing.
- `npm run preview:static` → builds `out/`, a folder that opens by double-click (`out/index.html`, no server).

## Structure
- `app/page.tsx` — sections in order: Hero, Work (`components/SelectedWorks.tsx`), Contact (`components/Footer.tsx`). Section labels have no numbers. Nav: Home / Work / Contact. Design Process and Experiments were removed at the user's request.
- `app/work/[slug]/page.tsx` — project detail pages.
- `components/` — one file per section, plus `motion.tsx` (reveal, tilt, scroll helpers).
- `lib/site.ts` — name, email, social links, nav. Email is yooyoungjeon.design@gmail.com (shown in the footer under the name and role). **Social links are still placeholders.**
- `lib/projects.ts` — the real projects: Visit Jeju (github.com/theblueyoung/usyd_jeju) and 24dday (github.com/theblueyoung/24dday-purple). Each has a card `image`, a wide `cover`, a screen `gallery` and GitHub `links`, all in `public/images/work/`. Card/cover images are screenshots composed onto the site backdrop.
- `app/globals.css` — colours, grain, tilt and reveal utilities.

## Design rules (keep consistent)
Deep navy/indigo + purple background, soft lavender/pink glows, white type, fine borders, grain, generous spacing, 3D tilt on hover, smooth scroll reveals. No new colour palette, no generic SaaS components. Respect `prefers-reduced-motion`.

## Hero
- Base: `public/images/hero-base.jpg` — the night scene darkened to ~20% with the flower glow at ~78%; moon and bubbles removed. Reveal: `public/images/hero-reveal-day.jpg` — the bright daytime scene (moon removed, visor text changed from LIVE to ALIVE, bubbles kept so they only appear under the cursor).
- Both are generated from `assets/hero-source/*-original.jpg` by `scripts/hero_edit.py` (cropped to 1740px wide so the astronaut is at the horizontal centre). To adjust darkness or glow, edit that script and re-run it; don't hand-edit the JPGs.
- Cursor reveal: 260px feathered circle, eased, hidden outside the hero. Both images share the `.hero-img` framing class (object-position: center) so they stay aligned.
- No "View My Work" button and no vertical discipline indicator (removed at the user's request).
- Work cards have no round arrow icon; the "View Project →" text slides in on hover. Work heading is a single line; no intro paragraph.
- Footer: name, then the email in the small muted style (no job title).

## Open items
1. Real social links (LinkedIn/Behance/Instagram are placeholders). Project years, role wording and tools for Visit Jeju and 24dday were inferred from their repos — confirm with the user.
2. The user wants the hero layout/effect and overall layout to match a reference YouTube video (youtube.com/watch?v=VjQ0g0FN1QU). Claude cannot watch videos: ask for screenshots or a written description, then restyle.

## Git
Work on `main` is fine; commit small, push after each change.
