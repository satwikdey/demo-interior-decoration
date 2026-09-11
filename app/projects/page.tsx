"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  slug: string;
  mainImage: string;
  title: string;
  location: string;
  category: string;
  description: string;
}

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
    location: "Bikaner",
    category: "Hospitality",
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

const baseCategories = ["All", "Private Residential", "Hospitality", "Heritage & Commercial"];

/* -- Card component ------------------------------------------- */
function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-[#1E1712] shadow-sm hover:shadow-xl transition-shadow",
        className
      )}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/35 to-transparent" />
        </div>

        {/* Bottom label */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A67B48] font-bold mb-1 drop-shadow-sm">
            {project.location}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-[#FAF7F2] font-medium leading-tight text-scrim-dark">
            {project.title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#FAF7F2]/90 mt-1 font-medium text-scrim-subtle">
            {project.category}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

/* -- Masonry-style grid group (alternating layout) ------------ */
function ProjectGroup({
  group,
  groupIndex,
  startIndex,
}: {
  group: Project[];
  groupIndex: number;
  startIndex: number;
}) {
  const flip = groupIndex % 2 === 1;

  /* 1-up: full-width banner */
  if (group.length === 1) {
    return (
      <div className="grid grid-cols-1">
        <ProjectCard project={group[0]!} index={startIndex} className="h-[55vw] max-h-[520px] min-h-[280px]" />
      </div>
    );
  }

  /* 2-up: equal halves */
  if (group.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {group.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={startIndex + i} className="aspect-[4/5]" />
        ))}
      </div>
    );
  }

  /* 3-up: 1 tall left + 2 stacked right */
  const tallCard = group[0]!;
  const smallCards = group.slice(1);

  const tallLeft = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[3fr_2fr]">
      <ProjectCard project={tallCard} index={startIndex} className="aspect-[3/4] sm:aspect-auto sm:min-h-[540px]" />
      <div className="grid grid-rows-2 gap-4">
        {smallCards.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={startIndex + 1 + i} className="min-h-[180px]" />
        ))}
      </div>
    </div>
  );

  const tallRight = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_3fr]">
      <div className="grid grid-rows-2 gap-4">
        {smallCards.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={startIndex + 1 + i} className="min-h-[180px]" />
        ))}
      </div>
      <ProjectCard project={tallCard} index={startIndex} className="aspect-[3/4] sm:aspect-auto sm:min-h-[540px]" />
    </div>
  );

  return flip ? tallRight : tallLeft;
}

/* 4-up layout: 1 tall left + (1 wide top + 2 small bottom right) */
function FourUpGroup({
  group,
  groupIndex,
  startIndex,
}: {
  group: Project[];
  groupIndex: number;
  startIndex: number;
}) {
  const flip = groupIndex % 2 === 1;
  const [tall, wide, bl, br] = group as [Project, Project, Project, Project];

  const leftSide = <ProjectCard project={tall} index={startIndex} className="sm:min-h-[560px] aspect-[3/4] sm:aspect-auto" />;
  const rightSide = (
    <div className="flex flex-col gap-4">
      <ProjectCard project={wide} index={startIndex + 1} className="flex-1 min-h-[220px]" />
      <div className="grid grid-cols-2 gap-4">
        <ProjectCard project={bl} index={startIndex + 2} className="aspect-[4/3]" />
        <ProjectCard project={br} index={startIndex + 3} className="aspect-[4/3]" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[5fr_7fr]">
      {flip ? <>{rightSide}{leftSide}</> : <>{leftSide}{rightSide}</>}
    </div>
  );
}

/* -- Dispatcher ----------------------------------------------- */
function ProjectSection({
  group,
  groupIndex,
  startIndex,
}: {
  group: Project[];
  groupIndex: number;
  startIndex: number;
}) {
  if (group.length === 4) {
    return <FourUpGroup group={group} groupIndex={groupIndex} startIndex={startIndex} />;
  }
  return <ProjectGroup group={group} groupIndex={groupIndex} startIndex={startIndex} />;
}

/* -- Page ----------------------------------------------------- */
function chunkProjects(projects: Project[], size = 4): Project[][] {
  const out: Project[][] = [];
  for (let i = 0; i < projects.length; i += size) out.push(projects.slice(i, i + size));
  return out;
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(res.ok && Array.isArray(data) ? data : []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const active = projects.length > 0 ? projects : demoProjects;
  const categories = [...new Set([...baseCategories, ...active.map((p) => p.category)])];
  const featured = active[0];

  const gridProjects = active.slice(1);
  const filtered = filter === "All"
    ? gridProjects
    : gridProjects.filter((p) => p.category === filter);
  const groups = chunkProjects(filtered, 4);

  return (
    <main className="min-h-screen bg-[#DFD6CD]">

      {/* -- Hero Header ------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#1E1712] pt-28 pb-10">
        <div className="site-container">
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] md:h-[520px]">

          {/* Left: Title + description */}
          <div className="absolute left-8 top-1/2 z-10 max-w-xl -translate-y-1/2 md:left-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A67B48] font-bold mb-6">
              Our Portfolio
            </p>
            <h1 className="leading-[0.9] mb-8 text-scrim-dark">
              <span
                className="block font-sans font-light text-[#FAF7F2]"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                Interior
              </span>
              <span
                className="block font-serif italic text-[#D4A373] font-normal"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                Portfolio
              </span>
            </h1>
            <p className="text-[#FAF7F2]/90 font-normal text-sm md:text-base leading-relaxed max-w-md text-scrim-subtle">
              A curated selection of completed projects across residential,
              hospitality, and heritage contexts — each shaped by proportion,
              lifestyle and light.
            </p>
          </div>

          {/* Featured image */}
          {featured && (
            <div className="absolute inset-0 z-0">
              <Image
                src={featured.mainImage}
                alt={featured.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E1712]/95 via-[#1E1712]/75 to-[#1E1712]/40" />
            </div>
          )}
          </div>
        </div>
      </section>

      {/* -- Filter bar -------------------------------------------- */}
      <div className="site-container flex flex-wrap justify-center gap-3 bg-[#DFD6CD] pt-10 pb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-full border transition-all duration-300 font-semibold shadow-sm ${filter === cat
                ? "bg-[#2A211B] border-[#2A211B] text-[#FAF7F2]"
                : "bg-[#FAF7F2] border-[#5C4F44]/30 text-[#2A211B] hover:bg-[#A67B48] hover:border-[#A67B48] hover:text-[#FAF7F2]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* -- Project Grid ------------------------------------------ */}
      <div className="site-container pb-24">
        {loading ? (
          <div className="py-40 text-center text-xs uppercase tracking-widest text-[#5C4F44] font-semibold">
            Loading Portfolio...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-40 text-center">
            <p className="text-[#2A211B] font-medium text-base italic">No projects found in this category.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {groups.map((group, gi) => (
              <ProjectSection
                key={`group-${gi}-${group.map((p) => p.id).join("-")}`}
                group={group}
                groupIndex={gi}
                startIndex={gi * 4}
              />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
