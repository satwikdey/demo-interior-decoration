"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MobilePortfolioCarousel, PortfolioSkeleton, useDesktopViewport } from "@/components/ResponsivePortfolio";

const PortfolioCarousel = dynamic(() => import("@/components/DesktopPortfolio"), { ssr: false });

/* ── Types ──────────────────────────────────────────────────── */
interface Project {
  id: string;
  slug: string;
  mainImage: string;
  title: string;
  location: string;
  category: string;
  description: string;
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [principalsExpanded, setPrincipalsExpanded] = useState(false);
  const desktopCarousel = useDesktopViewport();

  const principalsBio = "For over three decades, Yusuf Hussain and Vidhisha Nimuchwala have led Design One with a shared belief that great design begins with understanding people. While Yusuf brings a strong focus on planning, detailing and the technical aspects of execution, Vidhisha contributes her intuitive understanding of spaces, materials and client relationships. Together, they have shaped a practice built on thoughtful design, meticulous execution and lasting client partnerships, creating homes, hospitality spaces and commercial environments that remain relevant long after trends have passed.";
  const previewLength = 250;
  const previewEnd = principalsBio.slice(0, previewLength).lastIndexOf(" ");
  const visiblePrincipalsBio = principalsExpanded ? principalsBio : `${principalsBio.slice(0, previewEnd)}…`;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data)) throw new Error("Portfolio unavailable");
        setProjects(data);
      } catch {
        setUnavailable(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);



  return (
    <main className="font-sans">

      <section className="v2-hero v2-home-hero relative w-full h-screen min-h-[620px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-home.jpg" alt="Design One Living – luxury interior" fill className="object-cover object-center" preload quality={75} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1712]/75 via-[#1E1712]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/60 via-transparent to-transparent" />
        </div>
        <div className="v2-home-copy site-container relative z-10 h-full flex flex-col justify-start pt-36 md:pt-44">
          <div>
            <h1 className="v2-display-1 text-[#FAF7F2] font-serif font-light leading-[0.95] tracking-tight text-scrim-dark">Crafting<br />Experiences</h1>
            <span className="v2-display-2 font-script mt-8 block italic text-[#D4A373] text-scrim-dark">Since 1995</span>
          </div>
          <p className="mt-8 text-[#FAF7F2]/90 text-sm md:text-base leading-relaxed max-w-xs md:max-w-md text-scrim-subtle">For over two decades, Design One has been crafting timeless interiors, architecture and environments that are deeply personal, meticulously detailed and beautifully executed.</p>
        </div>
        <div className="v2-home-stats site-container absolute bottom-28 md:bottom-32 left-0 right-0 z-20 flex items-end justify-end gap-8 md:gap-14">
          {[{ value: "1000+", label: "Projects" }, { value: "25+", label: "Cities" }, { value: "30+", label: "Years" }].map(stat => <div key={stat.label} className="text-right"><p className="text-[#FAF7F2] text-3xl md:text-4xl font-serif leading-none font-medium">{stat.value}</p><p className="text-[#FAF7F2]/90 text-xs uppercase tracking-[0.2em] mt-1">{stat.label}</p></div>)}
        </div>
      </section>

      {loading ? <PortfolioSkeleton />
        : unavailable ? <section className="site-container v2-empty-state"><h2 className="font-serif">Portfolio is temporarily unavailable</h2><p>We could not load the live projects. Please try again later.</p><Link href="/projects" className="v2-cta">View Portfolio</Link></section>
        : projects.length === 0 ? <section className="site-container v2-empty-state"><h2 className="font-serif">Our Portfolio</h2><p>New projects will appear here soon.</p></section>
        : desktopCarousel ? <PortfolioCarousel projects={projects} /> : <MobilePortfolioCarousel projects={projects} />}

      {/* ── The Principals ───────────────────────────────── */}
      <section className="v2-principals flex flex-col lg:flex-row min-h-[90vh]">

        {/* Left: Dark editorial panel */}
        <div className="relative flex flex-col justify-between bg-[#1E1712] lg:w-[55%] w-full px-12 md:px-16 lg:px-20 pt-20 pb-16">

          {/* Label */}
          <p className="text-xs uppercase tracking-[0.25em] text-[#A67B48] font-bold mb-10">
            The Principals
          </p>

          {/* Editorial Headline */}
          <div className="mb-auto">
            <h2 className="flex flex-wrap items-baseline gap-x-5 leading-[0.95] mb-16">
              <span
                className="v2-display-3 text-[#FAF7F2] font-sans font-light"
              >
                Yusuf
              </span>
              <span
                className="v2-display-3 text-[#A67B48] font-serif italic"
                style={{  fontWeight: 400 }}
              >
                &amp;
              </span>
              <span
                className="v2-display-3 text-[#FAF7F2] font-sans font-light"
              >
                Vidhisha
              </span>
            </h2>

            {/* Single bio paragraph */}
            <div className="max-w-xl">
              <p className="text-[#FAF7F2]/90 font-normal text-base md:text-lg leading-relaxed">{visiblePrincipalsBio}</p>
              <button
                type="button"
                className="v2-read-more"
                aria-expanded={principalsExpanded}
                onClick={() => setPrincipalsExpanded((expanded) => !expanded)}
              >
                {principalsExpanded ? "Show less" : "Read more"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Team photo */}
        <div className="v2-principals-photo relative lg:w-[45%] w-full h-[70vh] lg:h-auto overflow-hidden">
          <Image
            sizes="(max-width: 1279px) 100vw, 45vw"
            src="/projects/about-team-new.jpeg"
            alt="Yusuf Hussain and Vidhisha Nimuchwala — DesignOne Studio"
            fill
            className="object-cover"
            style={{ objectPosition: "center 18%" }}
          />
        </div>
      </section>

      {/* ── Our Services ─────────────────────────────────── */}
      <section className="bg-[#DFD6CD] py-20 md:py-28">
        <div className="site-container">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 md:mb-16 pb-10 border-b border-[#5C4F44]/30">
            <div>
              <h2 className="leading-[0.92]">
                <span
                  className="v2-display-4 block text-[#2A211B] font-sans font-light"
                >
                  Our
                </span>
                <span
                  className="v2-display-4 block text-[#A67B48] font-serif italic"
                  style={{  fontWeight: 400 }}
                >
                  Services
                </span>
              </h2>
            </div>
            <p className="text-[#5C4F44] font-medium text-sm leading-relaxed max-w-xs mt-6 lg:mt-0 lg:text-right">
              A full range of interior design disciplines<br />
              from concept to complete delivery, curated<br />
              for every space.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {[
              {
                num: "01",
                title: "Residential Interiors",
                description: "Personal residences crafted with warmth, refinement and enduring design sensibilities.",
              },
              {
                num: "02",
                title: "Project Management",
                description: "Coordinating consultants, contractors and timelines to ensure smooth execution from start to finish.",
              },
              {
                num: "03",
                title: "Commercial Spaces",
                description: "Purpose-driven environments that elevate brands, businesses and guest experiences.",
              },
              {
                num: "04",
                title: "Bespoke Furniture",
                description: "Thoughtfully designed furniture and finishes that create cohesive, functional and timeless interiors.",
              },
              {
                num: "05",
                title: "Architectural Design",
                description: "From new builds to renovations, we create architecture that responds to context, purpose and people.",
              },
              {
                num: "06",
                title: "Turnkey Execution",
                description: "From concept to completion, every detail is managed with precision, coordination and care.",
              },
            ].map((service) => (
              <Link
                key={service.num}
                href="/contact"
                className="group relative flex flex-col justify-between bg-[#FAF7F2] hover:bg-[#FAF7F2] border border-[#5C4F44]/25 hover:border-[#A67B48] p-6 lg:p-5 min-h-[230px] lg:min-h-[200px] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden rounded-lg"
              >
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <p className="text-xs text-[#A67B48] font-mono font-bold shrink-0">
                      {service.num}
                    </p>
                    <h3 className="font-serif text-[#2A211B] text-lg lg:text-base xl:text-lg font-medium leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[#4A3E34] font-normal text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 text-[#A67B48] group-hover:text-[#2A211B] transition-colors duration-300">
                  <span className="text-lg leading-none transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
