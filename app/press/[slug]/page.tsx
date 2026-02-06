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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-2xl font-serif mb-4">Article Not Found</h1>
                    <Link href="/press" className="text-primary hover:underline">Return to Press</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            <div className="relative h-[50vh] w-full">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-white px-4 max-w-4xl"
                    >
                        <p className="text-sm uppercase tracking-widest font-bold mb-4 bg-primary inline-block px-3 py-1">{article.publication}</p>
                        <h1 className="text-4xl md:text-6xl font-serif leading-tight">{article.title}</h1>
                        <p className="text-lg font-light mt-6 opacity-80">{article.date}</p>
                    </motion.div>
                </div>
            </div>

            <Container className="py-24">
                <Link href="/press" className="inline-flex items-center text-sm uppercase tracking-widest text-neutral-500 hover:text-black mb-16 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Press
                </Link>

                <div className="max-w-3xl mx-auto">
                    <p className="text-2xl font-serif leading-relaxed mb-12 first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                        {article.content}
                    </p>

                    {/* Placeholder for more content */}
                    <div className="space-y-6 text-neutral-600 font-light text-lg leading-relaxed mb-12">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    {article.link && (
                        <a href={article.link} className="inline-flex items-center text-primary font-bold hover:underline">
                            Read Full Article on {article.publication} <ExternalLink size={16} className="ml-2" />
                        </a>
                    )}
                </div>
            </Container>
        </main>
    );
}
