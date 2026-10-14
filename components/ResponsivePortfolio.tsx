"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function useDesktopViewport() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}

export function useDesktopCarousel() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}

type Project = { id: string; slug: string; mainImage: string; title: string; location: string; category: string; description: string };

export function MobilePortfolioCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const go = (direction: number) => {
    const next = Math.max(0, Math.min(projects.length - 1, current + direction));
    const card = track.current?.children[next] as HTMLElement | undefined;
    if (card && track.current) {
      track.current.scrollTo({
        left: card.offsetLeft - (track.current.children[0] as HTMLElement).offsetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  };
  return (
    <section className="v2-portfolio site-container" aria-labelledby="mobile-portfolio-title" aria-roledescription="carousel">
      <p className="v2-eyebrow">Our Portfolio</p>
      <h2 id="mobile-portfolio-title" className="font-serif">Interior <em className="text-[#A67B48]">Archive</em></h2>
      <div ref={track} className="v2-mobile-carousel-track" onScroll={() => {
        const first = track.current?.children[0] as HTMLElement | undefined;
        const second = track.current?.children[1] as HTMLElement | undefined;
        if (first && second && track.current) setCurrent(Math.round(track.current.scrollLeft / (second.offsetLeft - first.offsetLeft)));
      }}>
        {projects.map((project, index) => (
          <article key={project.id} className="v2-project-preview" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}`}>
            <Link href={`/projects/${project.slug}`} className="v2-preview-photo" aria-label={`View ${project.title}`}>
              <Image src={project.mainImage} alt={project.title} fill sizes="(max-width: 767px) calc(100vw - 32px), calc(100vw - 48px)" className="object-cover" />
            </Link>
            <div className="v2-preview-copy">
              <p className="v2-eyebrow">{project.location} · {project.category}</p>
              <h3 className="font-serif">{project.title}</h3>
              <p>{project.description}</p>
              <Link href={`/projects/${project.slug}`} className="v2-cta">Open Project <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="v2-carousel-controls v2-mobile-carousel-controls">
        <button type="button" aria-label="Previous project" disabled={current === 0} onClick={() => go(-1)}>←</button>
        <p aria-live="polite" aria-atomic="true">{current + 1} / {projects.length}</p>
        <button type="button" aria-label="Next project" disabled={current === projects.length - 1} onClick={() => go(1)}>→</button>
      </div>
      <Link href="/projects" className="v2-cta v2-cta-dark">View All Projects <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

export function PortfolioSkeleton() {
  return (
    <section className="v2-portfolio site-container" aria-busy="true">
      <span className="sr-only" role="status">Loading portfolio…</span>
      <p className="v2-eyebrow">Our Portfolio</p>
      <h2 className="font-serif">Interior <em className="text-[#A67B48]">Archive</em></h2>
      <div className="v2-mobile-carousel-track" aria-hidden="true">
        {[0, 1, 2].map(i => <div key={i} className="v2-project-preview"><div className="v2-preview-photo v2-skeleton-photo" /><div className="v2-preview-copy v2-skeleton-copy"><div /><div /><div /></div></div>)}
      </div>
      <div className="v2-mobile-carousel-controls" aria-hidden="true"><div className="v2-skeleton-controls" /></div>
      <div className="v2-cta v2-skeleton-photo" aria-hidden="true">Loading portfolio…</div>
    </section>
  );
}
