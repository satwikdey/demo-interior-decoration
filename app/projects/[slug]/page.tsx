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
        return <div className="min-h-screen flex items-center justify-center bg-[#DFD6CD] uppercase tracking-widest text-[#9A8E84] text-[11px]">Loading...</div>;
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#DFD6CD]">
                <div className="text-center">
                    <p className="text-[#6A5A49]/70 font-light mb-4">Project not found</p>
                    <Link href="/projects" className="text-[11px] uppercase tracking-widest font-bold border-b border-[#6A5A49] pb-1 hover:text-primary transition-colors">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#DFD6CD] min-h-screen text-[#6A5A49]">
            {/* Hero — full bleed */}
            <div className="relative h-[80vh] w-full">
                <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6A5A49]/50 via-transparent to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-10 left-10"
                >
                    <p className="text-[#DFD6CD]/65 text-[10px] uppercase tracking-widest mb-2">{project.location} — {project.category}</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#DFD6CD]">{project.title}</h1>
                </motion.div>
            </div>

            <Container className="py-24">
                <Link href="/projects" className="inline-flex items-center text-[11px] uppercase tracking-widest text-[#9A8E84] hover:text-[#6A5A49] mb-16 transition-colors">
                    <ArrowLeft size={14} className="mr-2" /> Back to Portfolio
                </Link>

                {/* Project Info + Description */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9A8E84] mb-2">Location</h3>
                            <p className="font-serif text-lg">{project.location}</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9A8E84] mb-2">Type</h3>
                            <p className="font-serif text-lg">{project.category}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <p className="text-[#6A5A49]/75 font-light text-sm uppercase tracking-widest mb-4">{project.description}</p>
                        <div className="w-12 h-px bg-primary mb-8" />
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
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#9A8E84]/20">
                                    <Image
                                        src={block.content}
                                        alt={`${project.title} — ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                        sizes="100vw"
                                    />
                                </div>
                            ) : (
                                <div className="max-w-3xl mx-auto">
                                    <p className="text-[#6A5A49] font-light text-2xl leading-relaxed whitespace-pre-wrap">
                                        {block.content}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-32 text-center border-t border-[#9A8E84]/30 pt-24">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A8E84] mb-4">DesignOne Studio</p>
                    <h3 className="text-3xl font-serif mb-8">Ready to begin your project?</h3>
                    <Link href="/contact" className="inline-block px-12 py-4 bg-[#B08E68] text-[#DFD6CD] text-[11px] uppercase tracking-widest hover:bg-[#9A8E84] hover:text-[#6A5A49] transition-colors">
                        Get in Touch
                    </Link>
                </div>
            </Container>
        </main>
    );
}
