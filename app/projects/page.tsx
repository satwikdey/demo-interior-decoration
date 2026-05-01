"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
    {
        title: "5 Ballygunge",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/living-1.jpeg",
        slug: "ballygunge",
        description: "A 5,000 sq. ft. residence designed for four generations, blending legacy pieces with refreshed contemporary aesthetics."
    },
    {
        title: "38/a",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/bedroom-luxe.jpg",
        slug: "38a",
        description: "A compact two-bedroom apartment with an open-plan configuration, muted Scandinavian palette, and concealed lighting."
    },
    {
        title: "Urbana",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/urbana-1.jpg",
        slug: "city-modern",
        description: "A thoughtful high-rise residence emphasising spatial innovation, natural materials, and commissioned local artwork."
    },
    {
        title: "Sinclairs Bayview",
        location: "Port Blair, Andaman",
        category: "Hospitality",
        image: "/projects/sinclairs-1.jpg",
        slug: "sinclairs",
        description: "A landmark renovation of a legacy hospitality asset using a tropical contemporary palette and expansive glazing."
    },
    {
        title: "Bikaner House",
        location: "Bikaner, Rajasthan",
        category: "Heritage & Commercial",
        image: "/projects/bikaner-1.jpg",
        slug: "heritage-palace",
        description: "A contemporary interpretation of Rajasthani haveli architecture — repetitive arches, sandstone tones, and a central courtyard pool."
    },
    {
        title: "Dal Chini",
        location: "Kolkata",
        category: "Hospitality",
        image: "/projects/exhibition-1.jpg",
        slug: "heritage-hall",
        description: "A modern culinary destination with a refined rustic concept — reclaimed wood, hand-finished metals, and natural stone."
    },
    {
        title: "The Taj Gateway",
        location: "Kolkata",
        category: "Hospitality",
        image: "/projects/hospitality-3.jpg",
        slug: "taj-gateway",
        description: "A luxury hotel lobby redesign blending contemporary comfort with traditional Indian craft elements."
    },
    {
        title: "Nahata Residence",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/nahata-1.jpg",
        slug: "skyline-heights",
        description: "Luxury living redefined — multi-unit development with bespoke joinery, premium marble finishes, and a cohesive design language."
    },
    {
        title: "Grand Residence",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/pappu-1.jpg",
        slug: "grand-residence",
        description: "A warm and inviting family home — rich woods, plush velvets, and statement lighting create spaces perfect for entertaining."
    },
    {
        title: "Opulent Suites",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/bedroom-luxe-1.jpg",
        slug: "opulent-bedrooms",
        description: "Master suites designed for ultimate relaxation — plush textiles, bespoke headboards, and integrated lighting systems."
    },
    {
        title: "Modern Bedrooms",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/bedroom-modern-1.jpg",
        slug: "modern-bedrooms",
        description: "Efficient, stylish, and serene — clean lines, smart storage solutions, and a calming neutral palette for modern living."
    },
    {
        title: "Luxury Living",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/living-luxe-1.jpg",
        slug: "luxury-living",
        description: "Grand living areas emphasising volume, light, and sophisticated material palettes — marble, brass, and velvet."
    },
    {
        title: "Urban Living",
        location: "Kolkata",
        category: "Private Residential",
        image: "/projects/living-urban-1.jpg",
        slug: "urban-living",
        description: "Smart open-plan solutions for city apartments — integrating dining and lounging with a focus on flow and functionality."
    },
];

const categories = ["All", "Private Residential", "Hospitality", "Heritage & Commercial"];

export default function Projects() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    const [featured, ...rest] = filteredProjects;

    return (
        <main className="min-h-screen bg-[#F9F7F2]">
            {/* Page Header */}
            <div className="pt-40 pb-12 text-center px-8">
                <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">Our Portfolio</h1>
                <p className="text-neutral-500 font-light max-w-xl mx-auto">
                    A curated selection of completed projects across residential, hospitality, and heritage contexts.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-6 mb-14 px-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`text-[11px] uppercase tracking-widest pb-1 border-b transition-colors ${filter === cat
                            ? "border-neutral-900 text-neutral-900 font-semibold"
                            : "border-transparent text-neutral-400 hover:text-neutral-700"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Featured (First) Project — Full Bleed */}
            {featured && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full mb-3">
                    <Link href={`/projects/${featured.slug}`} className="block group relative w-full h-[70vh] overflow-hidden">
                        <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-transparent md:via-transparent md:bg-black/0 md:group-hover:bg-black/20 transition-colors duration-500" />
                        <div className="absolute bottom-8 left-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">{featured.location} — {featured.category}</p>
                            <h2 className="text-white font-serif text-4xl">{featured.title}</h2>
                        </div>
                    </Link>
                </motion.div>
            )}

            {/* Remaining Projects — 2-col tall grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3 px-0">
                {rest.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                        <Link href={`/projects/${project.slug}`} className="block group relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-transparent md:via-transparent md:bg-black/0 md:group-hover:bg-black/25 transition-colors duration-500" />
                            <div className="absolute bottom-6 left-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">{project.location} — {project.category}</p>
                                <h3 className="text-white font-serif text-2xl">{project.title}</h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}
