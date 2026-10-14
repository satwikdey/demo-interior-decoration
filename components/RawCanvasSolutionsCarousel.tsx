"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Solution = { title: string; image: string };

export default function RawCanvasSolutionsCarousel({ solutions }: { solutions: Solution[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const go = (direction: number) => {
    const next = Math.max(0, Math.min(solutions.length - 1, current + direction));
    const card = track.current?.children[next] as HTMLElement | undefined;
    if (!card || !track.current) return;
    track.current.scrollTo({ left: card.offsetLeft - (track.current.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <div className="v2-solutions-carousel" aria-roledescription="carousel" aria-label="What We Do">
      <div ref={track} className="v2-solutions-track" onScroll={() => {
        const first = track.current?.children[0] as HTMLElement | undefined;
        const second = track.current?.children[1] as HTMLElement | undefined;
        if (first && second && track.current) setCurrent(Math.round(track.current.scrollLeft / (second.offsetLeft - first.offsetLeft)));
      }}>
        {solutions.map((card, index) => (
          <article key={card.title} className="v2-solution-card group" aria-roledescription="slide" aria-label={`${index + 1} of ${solutions.length}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1712]"><Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 72px) / 2), 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/80 via-transparent to-transparent" /></div>
            <h3 className="v2-solution-title">{card.title}</h3>
          </article>
        ))}
      </div>
      <div className="v2-carousel-controls v2-solutions-controls">
        <button type="button" aria-label="Previous service" disabled={current === 0} onClick={() => go(-1)}>←</button>
        <p aria-live="polite" aria-atomic="true">{current + 1} / {solutions.length}</p>
        <button type="button" aria-label="Next service" disabled={current === solutions.length - 1} onClick={() => go(1)}>→</button>
      </div>
    </div>
  );
}
