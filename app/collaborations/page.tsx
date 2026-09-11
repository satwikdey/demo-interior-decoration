"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Collaboration {
    id?: string;
    name: string;
    category: string;
    description: string;
    image: string;
    slug: string;
}

const demoCollaborations: Collaboration[] = [
    {
        name: "THG Paris",
        category: "Bathroom Fittings",
        description: "Handcrafted precision fittings from Paris — where engineering meets haute couture.",
        image: "/projects/living-1.jpeg",
        slug: "thg-paris"
    },
    {
        name: "Vero Fabrics",
        category: "Textiles",
        description: "Bespoke fabric houses curating natural fibres, textures, and tonal palettes for our interiors.",
        image: "/projects/bedroom-luxe.jpg",
        slug: "vero-fabrics"
    },
    {
        name: "SA Baxter",
        category: "Hardware",
        description: "Architecturally refined hardware — door pulls, handles, and fixtures in solid brass and bronze.",
        image: "/projects/urbana-living.jpg",
        slug: "sa-baxter"
    }
];

export default function Collaborations() {
    const [collaborations, setCollaborations] = useState<Collaboration[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/collaborations");
                const data = await res.json();
                setCollaborations(res.ok && Array.isArray(data) && data.length > 0 ? data : []);
            } catch {
                setCollaborations([]);
            }
        })();
    }, []);

    const activeCollaborations =
        collaborations.length > 0 ? collaborations : demoCollaborations;

    return (
        <main className="min-h-screen bg-[#DFD6CD]">

            {/* -- HERO HEADER --------------------------------------- */}
            <section
                className="relative w-full flex flex-col justify-end overflow-hidden bg-[#1E1712]"
                style={{ minHeight: "45vh" }}
            >
                {/* Subtle background texture */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 70% 50%, rgba(250,247,242,0.15) 0%, transparent 60%)",
                    }}
                />

                <div className="relative z-10 site-container pb-16 pt-36">
                    <p
                        className="uppercase text-[#A67B48] font-bold mb-4"
                        style={{ fontSize: "11px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                    >
                        Studio Partnerships
                    </p>
                    <h1 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }} className="text-scrim-dark">
                        <span
                            className="block text-[#FAF7F2] font-light"
                            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
                        >
                            Our
                        </span>
                        <span
                            className="block italic text-[#D4A373] font-normal"
                            style={{
                                fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
                            }}
                        >
                            Collaborations
                        </span>
                    </h1>
                    <p
                        className="text-[#FAF7F2]/90 font-normal leading-relaxed mt-6 max-w-xl text-base md:text-lg text-scrim-subtle"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Partnering with the world&apos;s finest artisans and specialist brands to create
                        curated collections that embody our design ethos — refined, lasting, personal.
                    </p>
                </div>

                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FAF7F2]/15" />
            </section>

            {/* -- COLLABORATION GRID -------------------------------- */}
            <section className="bg-[#DFD6CD]">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {activeCollaborations.map((collab, index) => (
                        <Link
                            href={`/collaborations/${collab.slug}`}
                            key={collab.id ?? collab.slug}
                            className="group block cursor-pointer bg-[#FAF7F2] hover:bg-[#FAF7F2] transition-colors"
                        >
                            {/* Image */}
                            <div
                                className="relative w-full overflow-hidden bg-[#1E1712]"
                                style={{ height: "clamp(320px, 50vw, 600px)" }}
                            >
                                <Image
                                    src={collab.image}
                                    alt={collab.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/80 via-[#1E1712]/20 to-transparent"
                                />
                                {/* Hover accent line */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-[#A67B48]"
                                />
                            </div>

                            {/* Card info */}
                            <div
                                className="px-8 py-8 flex items-start justify-between border-b md:border-r border-[#5C4F44]/25 bg-[#FAF7F2]"
                            >
                                <div>
                                    <p
                                        className="uppercase text-[#A67B48] font-bold mb-2 text-xs tracking-[0.25em]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {collab.category}
                                    </p>
                                    <h2
                                        className="text-[#2A211B] font-medium group-hover:text-[#A67B48] transition-colors duration-300 font-serif text-2xl lg:text-3xl"
                                    >
                                        {collab.name}
                                    </h2>
                                    <p
                                        className="text-[#4A3E34] font-normal leading-relaxed mt-3 text-sm max-w-sm"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {collab.description}
                                    </p>
                                </div>
                                <ArrowUpRight
                                    className="text-[#A67B48] group-hover:text-[#2A211B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1 shrink-0"
                                    size={22}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* -- BOTTOM CTA ---------------------------------------- */}
            <section
                className="site-container py-24 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-10 bg-[#1E1712] text-[#FAF7F2] my-16 rounded-3xl shadow-2xl"
            >
                <div>
                    <p
                        className="uppercase text-[#A67B48] font-bold mb-4 text-xs tracking-[0.3em]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Work With Us
                    </p>
                    <h2
                        className="text-[#FAF7F2] font-light leading-[0.95] font-serif"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)" }}
                    >
                        Interested in a{" "}
                        <span className="italic text-[#D4A373] font-normal">
                            partnership?
                        </span>
                    </h2>
                </div>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 self-start md:self-auto px-8 py-4 bg-[#A67B48] hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2A211B] transition-all duration-300 rounded-full font-semibold uppercase text-xs tracking-[0.2em] shadow-xl shrink-0"
                >
                    Get in Touch
                    <span className="text-sm">→</span>
                </Link>
            </section>

        </main>
    );
}
