"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
    {
        title: "Kensington Residence",
        category: "Private Residential",
        image: "/projects/living-1.jpeg",
        slug: "kensington-residence",
    },
    {
        title: "Mayfair Penthouse",
        category: "Residential Development",
        image: "/projects/bedroom-luxe.jpg",
        slug: "mayfair-penthouse",
    },
    {
        title: "City Modern",
        category: "Private Residential",
        image: "/projects/urbana-1.jpg",
        slug: "city-modern",
    },
    {
        title: "Heritage Hall",
        category: "Commercial",
        image: "/projects/exhibition-1.jpg",
        slug: "heritage-hall",
    },
    {
        title: "Heritage Palace",
        category: "Commercial",
        image: "/projects/bikaner-1.jpg",
        slug: "heritage-palace",
    },
    {
        title: "Skyline Heights",
        category: "Residential Development",
        image: "/projects/nahata-1.jpg",
        slug: "skyline-heights",
    },
    {
        title: "Grand Residence",
        category: "Private Residential",
        image: "/projects/pappu-1.jpg",
        slug: "grand-residence",
    },
    {
        title: "Opulent Bedroom Suites",
        category: "Private Residential",
        image: "/projects/bedroom-luxe-1.jpg",
        slug: "opulent-bedrooms",
    },
    {
        title: "Modern Bedroom Concepts",
        category: "Private Residential",
        image: "/projects/bedroom-modern-1.jpg",
        slug: "modern-bedrooms",
    },
    {
        title: "Luxury Living Spaces",
        category: "Private Residential",
        image: "/projects/living-luxe-1.jpg",
        slug: "luxury-living",
    },
    {
        title: "Urban Living Concepts",
        category: "Private Residential",
        image: "/projects/living-urban-1.jpg",
        slug: "urban-living",
    },
    {
        title: "Viareggio Logica Superyacht",
        category: "Marine & Aviation",
        image: "/projects/living-1.jpeg", // Placeholder
        slug: "viareggio-logica",
    },
];

const categories = ["All", "Private Residential", "Residential Development", "Marine & Aviation", "Commercial"];

export default function Projects() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <main className="pt-32 pb-24 min-h-screen bg-neutral-50">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">Our Portfolio</h1>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto">
                        A curated selection of our work across the globe.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`text-sm uppercase tracking-widest pb-1 border-b transition-colors ${filter === cat
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-neutral-400 hover:text-primary"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            slug={project.slug}
                            index={index}
                        />
                    ))}
                </motion.div>
            </Container>
        </main>
    );
}
