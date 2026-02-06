"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Helper to generate image arrays
const generateImages = (prefix: string, count: number, ext: string = ".jpg") =>
    Array.from({ length: count }, (_, i) => `/projects/${prefix}-${i + 1}${ext}`);

const projectsData: Record<string, { title: string; category: string; description: string; images: string[] }> = {
    // Existing Flat Projects
    "city-modern": {
        title: "Urbana Modern",
        category: "Private Residential",
        description: "A contemporary sanctuary in the heart of the city. Clean lines, bold forms, and a curated selection of modern furniture create a space that is both striking and livable.",
        images: generateImages("urbana", 20),
    },
    "heritage-palace": {
        title: "Bikaner Palace",
        category: "Commercial",
        description: "A sensitive restoration of a historic palace, blending traditional Rajasthani craftsmanship with modern luxury. Every detail honors the building's heritage while providing 21st-century comfort.",
        images: generateImages("bikaner", 16),
    },
    "skyline-heights": {
        title: "Nahata Heights",
        category: "Residential Development",
        description: "Luxury living redefined. This multi-unit development features bespoke joinery, premium marble finishes, and a cohesive design language that appeals to the discerning buyer.",
        images: generateImages("nahata", 12),
    },
    "grand-residence": {
        title: "Pappu Residence",
        category: "Private Residential",
        description: "A warm and inviting family home with a touch of glamour. Rich woods, plush velvets, and statement lighting create a series of spaces that are perfect for entertaining.",
        images: generateImages("pappu", 20),
    },
    "heritage-hall": {
        title: "Heritage Hall",
        category: "Commercial",
        description: "An immersive exhibition space designed to celebrate history. We used dramatic lighting and grand scale installations to guide visitors through a narrative journey.",
        images: generateImages("exhibition", 2),
    },

    // New Split Projects
    "opulent-bedrooms": {
        title: "Opulent Bedroom Suites",
        category: "Private Residential",
        description: "A collection of master suites designed for ultimate relaxation and grandeur. Featuring plush textiles, bespoke headboards, and integrated lighting systems.",
        images: generateImages("bedroom-luxe", 15),
    },
    "modern-bedrooms": {
        title: "Modern Bedroom Concepts",
        category: "Private Residential",
        description: "Efficient, stylish, and serene. These bedroom designs focus on clean lines, smart storage solutions, and a calming neutral palette for the modern lifestyle.",
        images: generateImages("bedroom-modern", 15),
    },
    "luxury-living": {
        title: "Luxury Living Spaces",
        category: "Private Residential",
        description: "Grand living areas designed for hosting and relaxation. Emphasizing volume, light, and sophisticated material palettes including marble, brass, and velvet.",
        images: generateImages("living-luxe", 14),
    },
    "urban-living": {
        title: "Urban Living Concepts",
        category: "Private Residential",
        description: "Smart open-plan living solutions for city apartments. Integrating dining and lounging areas seamlessly with a focus on flow and functionality.",
        images: generateImages("living-urban", 11),
    },

    // Placeholders (Reusing subsets for fullness)
    "kensington-residence": {
        title: "Kensington Residence",
        category: "Private Residential",
        description: "A masterclass in understated luxury, this residence combines classical proportions with contemporary detailing.",
        images: generateImages("living-luxe", 5),
    },
    "mayfair-penthouse": {
        title: "Mayfair Penthouse",
        category: "Residential Development",
        description: "Located in one of London's most prestigious addresses, this penthouse exudes sophistication.",
        images: generateImages("bedroom-luxe", 5),
    },
    "viareggio-logica": {
        title: "Viareggio Logica Superyacht",
        category: "Marine & Aviation",
        description: "A masterpiece of marine engineering and interior design. We brought the comfort and elegance of a land-based estate to the open sea.",
        images: ["/projects/living-1.jpeg", "/projects/bedroom-luxe.jpg"], // Keep manual for unique
    },
};

export default function ProjectDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsData[slug];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Project not found</p>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <div className="relative h-[70vh] w-full">
                <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-white text-center px-4"
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            <Container className="py-24">
                <Link href="/projects" className="inline-flex items-center text-sm uppercase tracking-widest text-neutral-500 hover:text-black mb-12 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Category</h3>
                            <p className="text-lg font-serif">{project.category}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Service</h3>
                            <p className="text-lg font-serif">Interior Design</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Year</h3>
                            <p className="text-lg font-serif">2024</p>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h2 className="text-3xl font-serif mb-6 leading-normal text-neutral-800">
                            {project.description}
                        </h2>
                    </div>
                </div>

                {/* Gallery */}
                <div className="space-y-4 md:space-y-8">
                    {project.images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="relative w-full"
                        >
                            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-neutral-100">
                                <Image
                                    src={img}
                                    alt={`${project.title} image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Project / CTA */}
                <div className="mt-32 text-center border-t border-neutral-200 pt-24">
                    <h3 className="text-2xl font-serif mb-8">Ready to start your project?</h3>
                    <Link href="/contact" className="inline-block px-8 py-4 bg-primary text-white text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors">
                        Get in Touch
                    </Link>
                </div>

            </Container>
        </main>
    );
}
