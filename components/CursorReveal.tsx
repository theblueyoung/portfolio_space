"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

const RADIUS = 260;
const EASE = 0.14;

/**
 * Reveals `src` through a soft circular spotlight that follows the cursor
 * inside `areaRef`. Sits above the hero background and below all hero UI.
 * Renders nothing until the image exists, so the hero works before the asset is added.
 */
export function CursorReveal({ src, areaRef }: { src: string; areaRef: RefObject<HTMLElement | null> }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setAvailable(true);
    probe.onerror = () => setAvailable(false);
    probe.src = src;
  }, [src]);

  useEffect(() => {
    const area = areaRef.current;
    const layer = layerRef.current;
    if (!available || !area || !layer) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const paint = () => {
      layer.style.setProperty("--reveal-x", `${pos.x}px`);
      layer.style.setProperty("--reveal-y", `${pos.y}px`);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      paint();
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const local = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onEnter = (e: PointerEvent) => {
      const p = local(e);
      target.x = pos.x = p.x;
      target.y = pos.y = p.y;
      paint();
      layer.style.opacity = "1";
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      target.x = p.x;
      target.y = p.y;
      layer.style.opacity = "1";
      if (reduced) {
        pos.x = p.x;
        pos.y = p.y;
        paint();
        return;
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      layer.style.opacity = "0";
    };

    area.addEventListener("pointerenter", onEnter);
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [available, areaRef]);

  if (!available) return null;

  const mask = `radial-gradient(circle ${RADIUS}px at var(--reveal-x, -9999px) var(--reveal-y, -9999px), #000 0%, #000 45%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 80%, transparent 100%)`;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 ease-[var(--ease-cinema)]"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <Image src={src} alt="" fill sizes="100vw" className="hero-img object-cover" priority={false} />
    </div>
  );
}
