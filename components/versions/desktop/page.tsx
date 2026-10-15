"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

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

/* ── Fallback data (same as portfolio page) ─────────────────── */
const demoProjects: Project[] = [
  {
    id: "demo-1",
    slug: "urbana-demo",
    mainImage: "/projects/urbana-living.jpg",
    title: "Urbana Living",
    location: "Kolkata",
    category: "Private Residential",
    description: "A calm, layered living space balancing tonal finishes with soft contrast.",
  },
  {
    id: "demo-2",
    slug: "nahata-demo",
    mainImage: "/projects/nahata-living.jpg",
    title: "Nahata Residence",
    location: "Kolkata",
    category: "Private Residential",
    description: "A refined family home with bespoke furniture and warm textures.",
  },
  {
    id: "demo-3",
    slug: "bikaner-demo",
    mainImage: "/projects/bikaner-1.jpg",
    title: "Bikaner Suite",
    location: "Bikaner, Rajasthan",
    category: "Heritage & Commercial",
    description: "Modern hospitality language blended with regional material character.",
  },
  {
    id: "demo-4",
    slug: "exhibition-demo",
    mainImage: "/projects/exhibition-1.jpg",
    title: "Exhibition Pavilion",
    location: "Mumbai",
    category: "Heritage & Commercial",
    description: "An immersive showcase environment crafted around spatial storytelling.",
  },
  {
    id: "demo-5",
    slug: "bedroom-demo",
    mainImage: "/projects/bedroom-luxe.jpg",
    title: "Luxe Bedroom Concept",
    location: "Delhi",
    category: "Private Residential",
    description: "A plush sleeping suite with precise joinery and ambient lighting.",
  },
  {
    id: "demo-6",
    slug: "living-demo",
    mainImage: "/projects/living-1.jpeg",
    title: "Contemporary Living Studio",
    location: "Jaipur",
    category: "Hospitality",
    description: "Clean geometry and tactile finishes for a timeless contemporary mood.",
  },
];

/* ── Hero fade-up animation ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

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
function PortfolioCarousel({ projects }: { projects: Project[] }) {
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
    autoRef.current = setInterval(() => paginate(1), 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paginate]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate]);

  const go = (dir: number) => {
    paginate(dir);
    resetAuto();
  };

  const goTo = (idx: number) => {
    setPage(([prev]) => [idx, idx > prev ? 1 : -1]);
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
        <h2 className="font-sans font-light text-[#2A211B] leading-[0.9]" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
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
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Background image */}
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
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
                  className="font-serif text-[#FAF7F2] leading-[1] mb-3 text-scrim-dark"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
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
        <div className="flex items-center justify-center gap-6 mt-8 z-30 relative">
          {/* Prev */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="w-12 h-12 rounded-full border border-[#2A211B]/30 hover:border-[#2A211B] bg-[#2A211B]/10 hover:bg-[#2A211B]/20 flex items-center justify-center text-[#2A211B] transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className="relative h-[4px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === current ? 32 : 12, background: "rgba(42,33,27,0.25)" }}
              >
                {i === current && (
                  <motion.span
                    layoutId="dot-fill"
                    className="absolute inset-0 rounded-full bg-[#2A211B]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="w-12 h-12 rounded-full border border-[#2A211B]/30 hover:border-[#2A211B] bg-[#2A211B]/10 hover:bg-[#2A211B]/20 flex items-center justify-center text-[#2A211B] transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>

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

/* ── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(res.ok && Array.isArray(data) && data.length > 0 ? data : demoProjects);
      } catch {
        setProjects(demoProjects);
      }
    })();
  }, []);

  const displayProjects = projects.length > 0 ? projects : demoProjects;

  return (
    <main className="font-sans">

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[620px] overflow-hidden">

        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-home.jpg"
            alt="Design One Living – luxury interior"
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1712]/75 via-[#1E1712]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/60 via-transparent to-transparent" />
        </div>

        {/* Stats row */}
        <div className="site-container absolute bottom-28 md:bottom-32 left-0 right-0 z-20 flex items-end justify-end gap-8 md:gap-14">
          {[
            { value: "1000+", label: "Projects" },
            { value: "25+", label: "Cities" },
            { value: "30+", label: "years" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-right"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <p className="text-[#FAF7F2] text-3xl md:text-4xl font-serif leading-none text-scrim-dark font-medium">{stat.value}</p>
              <p className="text-[#FAF7F2]/90 text-xs font-medium tracking-[0.2em] uppercase mt-1 text-scrim-subtle">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main headline – bottom left */}
        <div className="site-container relative z-10 h-full flex flex-col justify-start pt-36 md:pt-44">
          <div className="space-y-0">
            <motion.h1
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[#FAF7F2] font-serif font-light leading-[0.95] tracking-tight select-none text-scrim-dark"
              style={{ fontSize: "clamp(3.5rem,10vw,8.5rem)" }}
            >
              Crafting
            </motion.h1>
            <motion.p
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[#FAF7F2] font-serif font-light leading-[0.95] tracking-tight select-none text-scrim-dark"
              style={{ fontSize: "clamp(3.5rem,10vw,8.5rem)" }}
            >
              Experiences
            </motion.p>
            <motion.span
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 block italic leading-[1.05] select-none text-[#D4A373] md:mt-10 text-scrim-dark"
              style={{
                fontFamily: "var(--font-script), serif",
                fontSize: "clamp(3rem,9vw,7.5rem)",
              }}
            >
              Since 1995
            </motion.span>
          </div>

          <motion.p
            custom={0.9}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 text-[#FAF7F2]/90 text-sm md:text-base font-normal leading-relaxed max-w-xs md:max-w-md text-scrim-subtle"
          >
            For over two decades, Design One has been crafting timeless interiors, architecture and environments that are deeply personal, meticulously detailed and beautifully executed.
          </motion.p>
        </div>

      </section>

      {/* ── Portfolio Carousel ────────────────────────────── */}
      <PortfolioCarousel projects={displayProjects} />

      {/* ── The Principals ───────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-[90vh]">

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
                className="text-[#FAF7F2] font-sans font-light"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Yusuf
              </span>
              <span
                className="text-[#A67B48] font-serif italic"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 400 }}
              >
                &amp;
              </span>
              <span
                className="text-[#FAF7F2] font-sans font-light"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Vidhisha
              </span>
            </h2>

            {/* Single bio paragraph */}
            <div className="max-w-xl">
              <p className="text-[#FAF7F2]/90 font-normal text-base md:text-lg leading-relaxed">
                For over three decades, Yusuf Hussain and Vidhisha Nimuchwala have led Design One with a shared belief that great design begins with understanding people. While Yusuf brings a strong focus on planning, detailing and the technical aspects of execution, Vidhisha contributes her intuitive understanding of spaces, materials and client relationships. Together, they have shaped a practice built on thoughtful design, meticulous execution and lasting client partnerships, creating homes, hospitality spaces and commercial environments that remain relevant long after trends have passed.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Team photo */}
        <div className="relative lg:w-[45%] w-full h-[70vh] lg:h-auto overflow-hidden">
          <Image
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
                  className="block text-[#2A211B] font-sans font-light"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
                >
                  Our
                </span>
                <span
                  className="block text-[#A67B48] font-serif italic"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 400 }}
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
