"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const pressData: Record<string, {
    publication: string;
    title: string;
    date: string;
    content: string;
    image: string;
    link?: string;
}> = {
    "words-of-wisdom": {
        publication: "The Rake",
        title: "Words of Wisdom: Design Philosophy",
        date: "October 2025",
        image: "/projects/living-1.jpeg",
        content: "In an exclusive interview with The Rake, our principal discusses the evolving definition of luxury. 'True luxury is silence,' he says. 'It is the absence of noise, both visual and auditory. It is the peace that comes from a perfectly resolved space.' The article explores how this philosophy influences our material choices, selecting natural stones and woods that ground the inhabitant.",
        link: "#"
    },
    "finest-interior-designers": {
        publication: "Architectural Digest",
        title: "The 50 Finest Interior Designers 2025",
        date: "September 2025",
        image: "/projects/bedroom-luxe.jpg",
        content: "The Studio has once again been named in the AD100 list. The citation praises the studio's 'unwavering commitment to bespoke craftsmanship' and its ability to 'create spaces that are as comfortable as they are grand.' We are honored to be included alongside such esteemed company.",
        link: "#"
    },
    "londons-newest-masterpiece": {
        publication: "Vogue Living",
        title: "London's Newest Masterpiece",
        date: "July 2025",
        image: "/projects/urbana-living.jpg",
        content: "Vogue Living takes a tour of our latest project in Mayfair. 'It is rare to find a home that feels so completely one with its surroundings,' writes the editor. The feature highlights the custom joinery and the curated art collection that includes works by both established and emerging British artists.",
        link: "#"
    },
    "restoring-history": {
        publication: "Elle Decor",
        title: "Restoring History in Bikaner",
        date: "May 2025",
        image: "/projects/bikaner-1.jpg",
        content: "Our restoration of the Bikaner Palace is the cover story for this month's Elle Decor. The project was a labor of love, requiring three years of meticulous work to restore the original frescoes and stone carvings. We worked with local artisans to ensure that every repair was faithful to the original methods.",
        link: "#"
    }
};

export default function PressDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const article = pressData[slug];

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#DFD6CD]">
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-[#2A211B] mb-4">Article Not Found</h1>
                    <Link href="/press" className="text-xs uppercase tracking-widest font-bold border-b-2 border-[#2A211B] pb-1 text-[#2A211B] hover:text-[#A67B48] transition-colors">Return to Press</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#DFD6CD] min-h-screen text-[#2A211B]">
            {/* Hero */}
            <div className="relative h-[60vh] w-full bg-[#1E1712]">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover opacity-75"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/50 to-transparent flex items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="site-container pb-16 pt-36 max-w-4xl text-[#FAF7F2]"
                    >
                        <span className="text-xs uppercase tracking-[0.25em] font-bold mb-4 bg-[#A67B48] text-[#FAF7F2] inline-block px-4 py-1.5 rounded-full">{article.publication}</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-normal leading-tight text-scrim-dark mt-2">{article.title}</h1>
                        <p className="text-sm font-semibold uppercase tracking-widest mt-4 text-[#D4A373]">{article.date}</p>
                    </motion.div>
                </div>
            </div>

            <Container className="py-20 md:py-24">
                <Link href="/press" className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#5C4F44] hover:text-[#2A211B] mb-16 transition-colors group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Press
                </Link>

                <div className="max-w-3xl mx-auto bg-[#FAF7F2] p-8 md:p-14 rounded-3xl border border-[#5C4F44]/25 shadow-sm">
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-10 text-[#2A211B] font-normal first-letter:text-5xl first-letter:font-serif first-letter:text-[#A67B48] first-letter:mr-2 first-letter:float-left">
                        {article.content}
                    </p>

                    <div className="space-y-6 text-[#4A3E34] font-normal text-lg leading-relaxed mb-12 border-t border-[#5C4F44]/20 pt-8">
                        <p>
                            Every architectural endeavor at Design One Studio is grounded in rigorous context analysis, acoustic refinement, and bespoke material curation.
                        </p>
                    </div>

                    {article.link && (
                        <a href={article.link} className="inline-flex items-center gap-2 px-8 py-4 bg-[#2A211B] hover:bg-[#A67B48] text-[#FAF7F2] rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-md">
                            Read Full Feature on {article.publication} <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </Container>
        </main>
    );
}
