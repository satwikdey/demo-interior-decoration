"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        description: "Handcrafted precision fittings from Paris � where engineering meets haute couture.",
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
        description: "Architecturally refined hardware � door pulls, handles, and fixtures in solid brass and bronze.",
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
                className="relative w-full flex flex-col justify-end overflow-hidden"
                style={{ minHeight: "42vh", background: "#6A5A49" }}
            >
                {/* Subtle background texture */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 70% 50%, rgba(154,142,132,0.13) 0%, transparent 60%)",
                    }}
                />

                <div className="relative z-10 site-container pb-14 pt-36">
                    <p
                        className="uppercase text-[#9A8E84] mb-5"
                        style={{ fontSize: "var(--text-xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                    >
                        Studio Partnerships
                    </p>
                    <h1 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
                        <span
                            className="block text-[#DFD6CD] font-light"
                            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
                        >
                            Our
                        </span>
                        <span
                            className="block italic"
                            style={{
                                fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
                                fontWeight: 300,
                                color: "#9A8E84",
                            }}
                        >
                            Collaborations
                        </span>
                    </h1>
                    <p
                        className="text-[#DFD6CD] font-light leading-relaxed mt-8 max-w-lg"
                        style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                    >
                        Partnering with the world&apos;s finest artisans and specialist brands to create
                        curated collections that embody our design ethos � refined, lasting, personal.
                    </p>
                </div>

                {/* Hairline bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(223,214,205,0.12)" }} />
            </section>

            {/* -- COLLABORATION GRID -------------------------------- */}
            <section className="bg-[#DFD6CD]">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {activeCollaborations.map((collab, index) => (
                        <Link
                            href={`/collaborations/${collab.slug}`}
                            key={collab.id ?? collab.slug}
                            className="group block cursor-pointer"
                        >
                            {/* Image */}
                            <div
                                className="relative w-full overflow-hidden"
                                style={{ height: "clamp(320px, 55vw, 700px)" }}
                            >
                                <Image
                                    src={collab.image}
                                    alt={collab.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ filter: "brightness(0.75)" }}
                                />
                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(to top, rgba(106,90,73,0.9) 0%, transparent 50%)",
                                    }}
                                />
                                {/* Hover accent line */}
                                <div
                                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                                    style={{ background: "#9A8E84" }}
                                />
                            </div>

                            {/* Card info */}
                            <div
                                className="px-8 py-7 flex items-start justify-between"
                                style={{
                                    borderBottom: "1px solid rgba(154,142,132,0.35)",
                                    borderRight: index < activeCollaborations.length - 1 ? "1px solid rgba(154,142,132,0.35)" : "none",
                                    background: "#DFD6CD",
                                }}
                            >
                                <div>
                                    <p
                                        className="uppercase text-[#9A8E84] mb-2"
                                        style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                                    >
                                        {collab.category}
                                    </p>
                                    <h2
                                        className="text-[#6A5A49] font-light group-hover:text-[#9A8E84] transition-colors duration-300"
                                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}
                                    >
                                        {collab.name}
                                    </h2>
                                    <p
                                        className="text-[#6A5A49]/72 font-light leading-relaxed mt-2"
                                        style={{ fontSize: "var(--text-base)", fontFamily: "var(--font-sans)", maxWidth: "22rem" }}
                                    >
                                        {collab.description}
                                    </p>
                                </div>
                                <span
                                    className="text-[#9A8E84] group-hover:text-[#9A8E84] transition-all duration-300 mt-1 group-hover:translate-x-1 inline-block"
                                    style={{ fontSize: "1.1rem" }}
                                >
                                    ?
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* -- BOTTOM CTA ---------------------------------------- */}
            <section
                className="site-container py-24 md:py-32 flex flex-col md:flex-row md:items-end justify-between gap-10"
                style={{ background: "#9A8E84", borderTop: "1px solid rgba(106,90,73,0.16)" }}
            >
                <div>
                    <p
                        className="uppercase text-[#DFD6CD]/70 mb-5"
                        style={{ fontSize: "var(--text-xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                    >
                        Work With Us
                    </p>
                    <h2
                        className="text-[#DFD6CD] font-light leading-[0.95]"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.8rem)" }}
                    >
                        Interested in a{" "}
                        <span className="italic" style={{ color: "#6A5A49" }}>
                            partnership?
                        </span>
                    </h2>
                </div>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 self-start md:self-auto px-8 py-4 hover:opacity-90 transition-all duration-300 flex-shrink-0"
                    style={{
                        background: "#B08E68",
                        color: "#DFD6CD",
                        fontSize: "var(--text-sm)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                    }}
                >
                    Get in Touch
                    <span>?</span>
                </Link>
            </section>

        </main>
    );
}
