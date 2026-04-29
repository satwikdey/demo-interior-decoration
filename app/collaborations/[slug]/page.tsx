"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// This would typically come from a CMS or API, but we'll mock it here
// ensuring it matches the slugs we will add to the list page.
const collaborationsData: Record<string, {
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    gallery: string[];
}> = {
    "thg-paris": {
        name: "THG Paris",
        category: "Bathroom Fittings",
        description: "Art de Vivre in the bathroom.",
        fullDescription: "Our partnership with THG Paris represents a shared commitment to excellence and craftsmanship. Together, we have created a collection of bathroom fittings that blend French elegance with modern innovation. Each piece is akin to jewelry for the home, utilizing the finest materials and semi-precious stones.",
        image: "/projects/living-1.jpeg", // Placeholder
        gallery: ["/projects/living-1.jpeg", "/projects/living-luxe-1.jpg", "/projects/living-luxe-2.jpg"]
    },
    "vero-fabrics": {
        name: "Vero Fabrics",
        category: "Textiles",
        description: "Weaving stories into every thread.",
        fullDescription: "Working with Vero Fabrics allowed us to explore the tactile dimension of design. This bespoke collection features woven silks, velvets, and linens inspired by the natural patterns found in British landscapes. The fabrics are designed to age beautifully, adding depth and character to any interior.",
        image: "/projects/bedroom-luxe.jpg", // Placeholder
        gallery: ["/projects/bedroom-luxe.jpg", "/projects/bedroom-luxe-1.jpg", "/projects/bedroom-luxe-2.jpg"]
    },
    "sa-baxter": {
        name: "SA Baxter",
        category: "Hardware",
        description: "Architectural hardware as functional art.",
        fullDescription: "Hardware is the handshake of a building. Our collaboration with SA Baxter focused on creating a line of door and cabinet hardware that feels substantial and grounded. Using lost-wax casting techniques, we achieved unique textures and finishes that bring a bespoke touch to the most habitual interactions in a home.",
        image: "/projects/urbana-living.jpg", // Placeholder
        gallery: ["/projects/urbana-living.jpg", "/projects/urbana-1.jpg", "/projects/urbana-2.jpg"]
    }
};

export default function CollaborationDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const collab = collaborationsData[slug];

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

    return (
        <main className="bg-white min-h-screen pt-24 lg:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 px-2 min-h-screen">
                {/* Column 1: Text Content */}
                <div className="flex flex-col justify-center px-12 md:px-20 lg:px-24 py-24 order-last lg:order-first">
                    <Link href="/collaborations" className="inline-flex items-center text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black mb-20 transition-colors">
                        <ArrowLeft size={14} className="mr-2" /> Back to Collaborations
                    </Link>
                    <h2 className="text-4xl font-serif mb-8 leading-tight">
                        "{collab.description}"
                    </h2>
                    <div className="w-12 h-0.5 bg-primary mb-12"></div>
                    <p className="text-neutral-500 font-light text-lg leading-relaxed">
                        {collab.fullDescription}
                    </p>
                </div>

                {/* Columns 2 & 3: Large Images */}
                <div className="relative h-[500px] lg:h-screen w-full">
                    <Image
                        src={collab.gallery[1] || collab.image}
                        alt={`${collab.name} showcase 1`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative h-[500px] lg:h-screen w-full">
                    <Image
                        src={collab.gallery[2] || collab.image}
                        alt={`${collab.name} showcase 2`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
