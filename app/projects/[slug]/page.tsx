"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type ProjectContentBlock = {
    id: string;
    type: "IMAGE" | "TEXT";
    content: string;
};

type ProjectRecord = {
    title: string;
    location: string;
    category: string;
    description: string;
    mainImage: string;
    content?: ProjectContentBlock[];
};

export default function ProjectDetail() {
    const params = useParams();
    const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const slug = decodeURIComponent(String(slugParam));
    const [project, setProject] = useState<ProjectRecord | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/by-slug/${encodeURIComponent(slug)}`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#DFD6CD] uppercase tracking-widest text-[#2A211B] text-xs font-semibold">Loading...</div>;
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#DFD6CD]">
                <div className="text-center">
                    <p className="text-[#2A211B] font-medium mb-4 text-base">Project not found</p>
                    <Link href="/projects" className="text-xs uppercase tracking-widest font-bold border-b-2 border-[#2A211B] pb-1 text-[#2A211B] hover:text-[#A67B48] hover:border-[#A67B48] transition-colors">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#DFD6CD] min-h-screen text-[#2A211B]">
            {/* Hero — full bleed with rich contrast gradient */}
            <div className="relative h-[80vh] w-full bg-[#1E1712]">
                <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/40 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-12 left-8 md:left-16 right-8"
                >
                    <p className="text-[#A67B48] text-xs uppercase tracking-[0.25em] font-bold mb-3 drop-shadow-sm">{project.location} — {project.category}</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#FAF7F2] font-normal text-scrim-dark leading-tight">{project.title}</h1>
                </motion.div>
            </div>

            <Container className="py-20 md:py-24">
                <Link href="/projects" className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#5C4F44] hover:text-[#2A211B] mb-16 transition-colors group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                </Link>

                {/* Project Info + Description */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 mb-24 pb-16 border-b border-[#5C4F44]/25">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C4F44] mb-2">Location</h3>
                            <p className="font-serif text-xl font-medium text-[#2A211B]">{project.location}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C4F44] mb-2">Type</h3>
                            <p className="font-serif text-xl font-medium text-[#2A211B]">{project.category}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C4F44] mb-3">Project Narrative</h3>
                        <p className="text-[#2A211B] font-normal text-lg md:text-xl leading-relaxed">{project.description}</p>
                        <div className="w-16 h-0.5 bg-[#A67B48] mt-8" />
                    </div>
                </div>

                {/* Dynamic Content Blocks */}
                <div className="space-y-24">
                    {project.content?.map((block, index) => (
                        <motion.div
                            key={block.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="w-full"
                        >
                            {block.type === "IMAGE" ? (
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-[#1E1712] shadow-xl">
                                    <Image
                                        src={block.content}
                                        alt={`${project.title} — ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                        sizes="100vw"
                                    />
                                </div>
                            ) : (
                                <div className="max-w-3xl mx-auto py-8">
                                    <p className="text-[#2A211B] font-normal text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
                                        {block.content}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-32 text-center border-t border-[#5C4F44]/25 pt-20">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A67B48] mb-3">Design One Studio</p>
                    <h3 className="text-3xl md:text-4xl font-serif text-[#2A211B] mb-8 font-medium">Ready to begin your project?</h3>
                    <Link href="/contact" className="inline-block px-10 py-4 bg-[#2A211B] hover:bg-[#A67B48] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-colors shadow-lg">
                        Get in Touch
                    </Link>
                </div>
            </Container>
        </main>
    );
}
