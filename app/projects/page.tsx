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

function chunkProjects(projects: Project[], chunkSize = 4): Project[][] {
  const groups: Project[][] = [];
  for (let i = 0; i < projects.length; i += chunkSize) {
    groups.push(projects.slice(i, i + chunkSize));
  }
  return groups;
}

function ProjectTile({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className={cn("group relative overflow-hidden border border-neutral-100 bg-white", className)}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-white/75">{project.location}</p>
          <h3 className="font-serif text-2xl md:text-3xl">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm font-light text-white/85">{project.description}</p>
        </div>
      </Link>
    </motion.article>
  );
}

function ProjectPatternGroup({
  group,
  groupIndex,
  startIndex,
}: {
  group: Project[];
  groupIndex: number;
  startIndex: number;
}) {
  const mirror = groupIndex % 2 === 1;

  if (group.length === 1) {
    return (
      <div className="grid grid-cols-1">
        <ProjectTile
          project={group[0]!}
          index={startIndex}
          className="aspect-[16/9] md:aspect-[16/7]"
        />
      </div>
    );
  }

  if (group.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        {group.map((project, i) => (
          <ProjectTile
            key={project.id}
            project={project}
            index={startIndex + i}
            className="aspect-[4/5]"
          />
        ))}
      </div>
    );
  }

  if (group.length === 3) {
    const left = group[0]!;
    const rightTop = group[1]!;
    const rightBottom = group[2]!;

    const desktopLayout = (
      <div className="hidden gap-0 md:grid md:grid-cols-12">
        <ProjectTile project={left} index={startIndex} className="col-span-5 h-full min-h-[36rem]" />
        <div className="col-span-7 grid grid-rows-2 gap-0">
          <ProjectTile
            project={rightTop}
            index={startIndex + 1}
            className="aspect-[16/9] h-full min-h-[17rem]"
          />
          <ProjectTile
            project={rightBottom}
            index={startIndex + 2}
            className="aspect-[16/9] h-full min-h-[17rem]"
          />
        </div>
      </div>
    );

    const mirroredDesktopLayout = (
      <div className="hidden gap-0 md:grid md:grid-cols-12">
        <div className="col-span-7 grid grid-rows-2 gap-0">
          <ProjectTile
            project={rightTop}
            index={startIndex + 1}
            className="aspect-[16/9] h-full min-h-[17rem]"
          />
          <ProjectTile
            project={rightBottom}
            index={startIndex + 2}
            className="aspect-[16/9] h-full min-h-[17rem]"
          />
        </div>
        <ProjectTile project={left} index={startIndex} className="col-span-5 h-full min-h-[36rem]" />
      </div>
    );

    return (
      <>
        <div className="grid grid-cols-1 gap-0 md:hidden">
          {group.map((project, i) => (
            <ProjectTile key={project.id} project={project} index={startIndex + i} className="aspect-[16/10]" />
          ))}
        </div>
        {mirror ? mirroredDesktopLayout : desktopLayout}
      </>
    );
  }

  const left = group[0]!;
  const rightTop = group[1]!;
  const rightBottomLeft = group[2]!;
  const rightBottomRight = group[3]!;

  const desktopLayout = (
    <div className="hidden gap-0 md:grid md:grid-cols-12">
      <ProjectTile project={left} index={startIndex} className="col-span-5 h-full min-h-[36rem]" />
      <div className="col-span-7 grid grid-rows-[1fr_auto] gap-0">
        <ProjectTile
          project={rightTop}
          index={startIndex + 1}
          className="aspect-[16/8] h-full min-h-[17rem]"
        />
        <div className="grid grid-cols-2 gap-0">
          <ProjectTile
            project={rightBottomLeft}
            index={startIndex + 2}
            className="aspect-[16/10] min-h-[12rem]"
          />
          <ProjectTile
            project={rightBottomRight}
            index={startIndex + 3}
            className="aspect-[16/10] min-h-[12rem]"
          />
        </div>
      </div>
    </div>
  );

  const mirroredDesktopLayout = (
    <div className="hidden gap-0 md:grid md:grid-cols-12">
      <div className="col-span-7 grid grid-rows-[1fr_auto] gap-0">
        <ProjectTile
          project={rightTop}
          index={startIndex + 1}
          className="aspect-[16/8] h-full min-h-[17rem]"
        />
        <div className="grid grid-cols-2 gap-0">
          <ProjectTile
            project={rightBottomLeft}
            index={startIndex + 2}
            className="aspect-[16/10] min-h-[12rem]"
          />
          <ProjectTile
            project={rightBottomRight}
            index={startIndex + 3}
            className="aspect-[16/10] min-h-[12rem]"
          />
        </div>
      </div>
      <ProjectTile project={left} index={startIndex} className="col-span-5 h-full min-h-[36rem]" />
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-0 md:hidden">
        {group.map((project, i) => (
          <ProjectTile key={project.id} project={project} index={startIndex + i} className="aspect-[16/10]" />
        ))}
      </div>
      {mirror ? mirroredDesktopLayout : desktopLayout}
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch projects");
        }

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const activeProjects = projects.length > 0 ? projects : demoProjects;
  const categories = [...new Set([...baseCategories, ...activeProjects.map((project) => project.category)])];
  const filteredProjects =
    filter === "All"
      ? activeProjects
      : activeProjects.filter((project) => project.category === filter);

  const groupedProjects = chunkProjects(filteredProjects, 4);
  const isDemoMode = projects.length === 0;

  return (
    <main className="min-h-screen bg-white pb-0">
      <div className="pt-40 pb-12 text-center px-8">
        <h1 className="font-script text-6xl md:text-7xl text-neutral-900 mb-4">Our Portfolio</h1>
        <p className="text-neutral-500 font-light max-w-xl mx-auto">
          A curated selection of completed projects across residential, hospitality, and heritage
          contexts.
        </p>
        {isDemoMode && (
          <p className="mt-4 text-[10px] uppercase tracking-widest text-amber-700">
            Showing demo layout cards until live Firebase projects are available
          </p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Open Backend To Change Images
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400">
            Admin login required
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-14 px-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[11px] uppercase tracking-widest pb-1 border-b transition-colors ${
              filter === cat
                ? "border-neutral-900 text-neutral-900 font-semibold"
                : "border-transparent text-neutral-400 hover:text-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-40 uppercase tracking-widest text-[10px] text-neutral-400">
          Loading Portfolio...
        </div>
      ) : (
        <div className="space-y-0 px-0 pb-0">
          {groupedProjects.map((group, groupIndex) => (
            <ProjectPatternGroup
              key={`group-${groupIndex}-${group.map((project) => project.id).join("-")}`}
              group={group}
              groupIndex={groupIndex}
              startIndex={groupIndex * 4}
            />
          ))}
        </div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="py-40 text-center px-8">
          <p className="text-neutral-400 font-light italic">No projects found in this category.</p>
        </div>
      )}
    </main>
  );
}
