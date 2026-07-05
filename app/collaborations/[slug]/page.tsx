"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Collaboration {
    id?: string;
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    slug: string;
    gallery: string[];
}

const demoCollaborationsData: Record<string, Collaboration> = {
    "thg-paris": {
        name: "THG Paris",
        category: "Bathroom Fittings",
        description: "Art de Vivre in the bathroom.",
        fullDescription: "Our partnership with THG Paris represents a shared commitment to excellence and craftsmanship. Together, we have created a collection of bathroom fittings that blend French elegance with modern innovation. Each piece is akin to jewelry for the home, utilizing the finest materials and semi-precious stones.",
        slug: "thg-paris",
        image: "/projects/living-1.jpeg", // Placeholder
        gallery: ["/projects/living-1.jpeg", "/projects/living-luxe-1.jpg", "/projects/living-luxe-2.jpg"]
    },
    "vero-fabrics": {
        name: "Vero Fabrics",
        category: "Textiles",
        description: "Weaving stories into every thread.",
        fullDescription: "Working with Vero Fabrics allowed us to explore the tactile dimension of design. This bespoke collection features woven silks, velvets, and linens inspired by the natural patterns found in British landscapes. The fabrics are designed to age beautifully, adding depth and character to any interior.",
        slug: "vero-fabrics",
        image: "/projects/bedroom-luxe.jpg", // Placeholder
        gallery: ["/projects/bedroom-luxe.jpg", "/projects/bedroom-luxe-1.jpg", "/projects/bedroom-luxe-2.jpg"]
    },
    "sa-baxter": {
        name: "SA Baxter",
        category: "Hardware",
        description: "Architectural hardware as functional art.",
        fullDescription: "Hardware is the handshake of a building. Our collaboration with SA Baxter focused on creating a line of door and cabinet hardware that feels substantial and grounded. Using lost-wax casting techniques, we achieved unique textures and finishes that bring a bespoke touch to the most habitual interactions in a home.",
        slug: "sa-baxter",
        image: "/projects/urbana-living.jpg", // Placeholder
        gallery: ["/projects/urbana-living.jpg", "/projects/urbana-1.jpg", "/projects/urbana-2.jpg"]
    }
};

export default function CollaborationDetail() {
    const params = useParams();
    const slug = decodeURIComponent(params.slug as string);
    const [collab, setCollab] = useState<Collaboration | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/collaborations/by-slug/${encodeURIComponent(slug)}`);
                if (res.ok) {
                    const data = await res.json();
                    setCollab({
                        ...data,
                        gallery: Array.isArray(data.gallery) ? data.gallery : [],
                    });
                    return;
                }
            } catch (error) {
                console.error("Error fetching collaboration:", error);
            } finally {
                setLoading(false);
            }

            setCollab(demoCollaborationsData[slug] ?? null);
        })();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-neutral-400 text-[11px]">Loading...</div>;
    }

    if (!collab) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-2xl font-serif mb-4">Collaboration Not Found</h1>
                    <Link href="/collaborations" className="text-primary hover:underline">Return to Collaborations</Link>
                </div>
            </div>
        );
    }

    const gallery = collab.gallery.length > 0 ? collab.gallery : [collab.image];
    const firstImage = gallery[1] ?? gallery[0] ?? collab.image;
    const secondImage = gallery[2] ?? gallery[1] ?? gallery[0] ?? collab.image;

    return (
        <main className="bg-white min-h-screen pt-24 lg:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 px-2 min-h-screen">
                {/* Column 1: Text Content */}
                <div className="flex flex-col justify-center px-12 md:px-20 lg:px-24 py-24 order-last lg:order-first">
                    <Link href="/collaborations" className="inline-flex items-center text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black mb-20 transition-colors">
                        <ArrowLeft size={14} className="mr-2" /> Back to Collaborations
                    </Link>
                    <h2 className="text-4xl font-serif mb-8 leading-tight">
                        &ldquo;{collab.description}&rdquo;
                    </h2>
                    <div className="w-12 h-0.5 bg-primary mb-12"></div>
                    <p className="text-neutral-500 font-light text-lg leading-relaxed">
                        {collab.fullDescription}
                    </p>
                </div>

                {/* Columns 2 & 3: Large Images */}
                <div className="relative h-[500px] lg:h-screen w-full">
                    <Image
                        src={firstImage}
                        alt={`${collab.name} showcase 1`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative h-[500px] lg:h-screen w-full">
                    <Image
                        src={secondImage}
                        alt={`${collab.name} showcase 2`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
