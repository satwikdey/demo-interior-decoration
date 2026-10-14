"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useDesktopCarousel } from "./ResponsivePortfolio";
interface Project { id: string; slug: string; mainImage: string; title: string; location: string; category: string; description: string; }
/* ── Carousel slide variants ────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Portfolio Carousel ─────────────────────────────────────── */
export default function PortfolioCarousel({ projects }: { projects: Project[] }) {
  const reducedMotion = !useDesktopCarousel();
  const [paused, setPaused] = useState(false);
  const [[current, direction], setPage] = useState([0, 0]);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([prev]) => {
        const next = (prev + newDir + projects.length) % projects.length;
        return [next, newDir];
      });
    },
    [projects.length]
  );

  // Auto-advance every 5s
  useEffect(() => {
    if (reducedMotion || paused) return;
    autoRef.current = setInterval(() => paginate(1), 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paginate, reducedMotion, paused]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (!reducedMotion && !paused) autoRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate, reducedMotion, paused]);

  const go = (dir: number) => {
    paginate(dir);
    resetAuto();
  };

  const project = projects[current]!;

  return (
    <section className="relative w-full bg-[#DFD6CD] overflow-hidden pt-16 md:pt-24 pb-16 md:pb-24">
      {/* ── Header row: label left, view-all right — same baseline */}
      <div className="site-container flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C4F44] font-semibold">Our Portfolio</p>
        <Link
          href="/projects"
          className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#2A211B] hover:text-[#A67B48] font-semibold transition-colors group"
        >
          View All Projects
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── Interior Archive heading */}
      <div className="site-container mb-8 md:mb-12">
        <h2 className="v2-display-11 font-sans font-light text-[#2A211B] leading-[0.9]">
          Interior{" "}
          <span className="font-serif italic text-[#A67B48] font-normal">Archive</span>
        </h2>
      </div>

      {/* ── Carousel track ───────────────────────────────────── */}
      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-8">

        {/* Only the centre card shows */}

        {/* Main slide */}
        <div className="relative mx-auto w-full lg:w-[92%] aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl z-20">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={reducedMotion ? undefined : slideVariants}
              transition={reducedMotion ? { duration: 0 } : undefined}
              initial={reducedMotion ? false : "enter"}
              animate={reducedMotion ? { opacity: 1, x: 0, scale: 1 } : "center"}
              exit={reducedMotion ? { opacity: 1 } : "exit"}
              className="absolute inset-0"
            >
              {/* Background image */}
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="92vw"
              />

              {/* Dark gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/40 to-[#1E1712]/30" />

              {/* Counter pill */}
              <div className="absolute top-6 left-6 bg-[#1E1712]/60 backdrop-blur-md border border-[#FAF7F2]/20 rounded-full px-4 py-1.5 text-[#FAF7F2] text-xs font-medium tracking-[0.25em] uppercase">
                {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>

              {/* Category badge */}
              <div className="absolute top-6 right-6 bg-[#A67B48] shadow-md rounded-full px-4 py-1.5 text-[#FAF7F2] text-xs font-semibold tracking-[0.2em] uppercase">
                {project.category}
              </div>

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-[#A67B48] text-xs font-semibold uppercase tracking-[0.3em] mb-2 drop-shadow-sm"
                >
                  {project.location}
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.55 }}
                  className="v2-display-12 font-serif text-[#FAF7F2] leading-[1] mb-3 text-scrim-dark"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="text-[#FAF7F2]/90 text-sm md:text-base font-normal leading-relaxed max-w-lg mb-6 hidden md:block text-scrim-subtle"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#A67B48] text-[#2A211B] hover:text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 shadow-lg group"
                  >
                    Open Project
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls row ─────────────────────────────────── */}
        <div className="v2-carousel-controls flex items-center justify-center gap-6 mt-8 z-30 relative">
          {/* Prev */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="w-12 h-12 rounded-full border border-[#2A211B]/30 hover:border-[#2A211B] bg-[#2A211B]/10 hover:bg-[#2A211B]/20 flex items-center justify-center text-[#2A211B] transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          <p className="text-sm" aria-live="polite">{current + 1} / {projects.length}</p>

          {/* Next */}
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="w-12 h-12 rounded-full border border-[#2A211B]/30 hover:border-[#2A211B] bg-[#2A211B]/10 hover:bg-[#2A211B]/20 flex items-center justify-center text-[#2A211B] transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {!reducedMotion && <button type="button" className="v2-carousel-pause" onClick={() => setPaused(!paused)}>{paused ? "Resume slideshow" : "Pause slideshow"}</button>}

        {/* Mobile: View all */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#2A211B] hover:text-[#A67B48] transition-colors"
          >
            View All Projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

