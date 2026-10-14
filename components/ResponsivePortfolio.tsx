"use client";

import { useEffect, useState } from "react";
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

export function StackedPortfolio({ projects }: { projects: Project[] }) {
  return (
    <section className="v2-portfolio site-container" aria-labelledby="mobile-portfolio-title">
      <p className="v2-eyebrow">Our Portfolio</p>
      <h2 id="mobile-portfolio-title" className="font-serif">Interior <em className="text-[#A67B48]">Archive</em></h2>
      <div className="v2-card-collection">
        {projects.slice(0, 3).map(project => (
          <article key={project.id} className="v2-project-preview">
            <Link href={`/projects/${project.slug}`} className="v2-preview-photo" aria-label={`View ${project.title}`}>
              <Image src={project.mainImage} alt={project.title} fill sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 64px) / 2), 33vw" className="object-cover" />
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
      <div className="v2-card-collection" aria-hidden="true">
        {[0, 1, 2].map(i => <div key={i} className="v2-project-preview"><div className="v2-preview-photo v2-skeleton-photo" /><div className="v2-preview-copy v2-skeleton-copy"><div /><div /><div /></div></div>)}
      </div>
      <div className="v2-cta v2-skeleton-photo" aria-hidden="true">Loading portfolio…</div>
    </section>
  );
}
