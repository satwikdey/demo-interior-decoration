"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const generateImages = (prefix: string, count: number, ext: string = ".jpg") =>
    Array.from({ length: count }, (_, i) => `/projects/${prefix}-${i + 1}${ext}`);

const projectsData: Record<string, {
    title: string;
    location: string;
    category: string;
    year: string;
    area?: string;
    description: string;
    fullDescription: string;
    images: string[];
}> = {
    // Real DesignOne Projects
    "ballygunge": {
        title: "5 Ballygunge",
        location: "Kolkata",
        category: "Private Residential",
        year: "2024",
        area: "5,000 sq. ft.",
        description: "A four-generation family home — reinterpreting legacy pieces within a refreshed aesthetic.",
        fullDescription: "A 5,000 sq. ft. residence designed for four generations. The project focuses on reinterpreting existing furniture and legacy pieces, blending them with a refreshed aesthetic of rich wood finishes and traditional accents. Custom cabinetry was introduced to maintain proportion without visual clutter, and each room follows the same restrained design language — minimal yet warm. Every decision was driven by spatial optimisation, ensuring the space feels both grand and practical for daily family life.",
        images: [...generateImages("living-luxe", 8), ...generateImages("bedroom-luxe", 5)],
    },
    "38a": {
        title: "38/a",
        location: "Kolkata",
        category: "Private Residential",
        year: "2024",
        description: "A compact two-bedroom apartment with maximum spatial efficiency and a Scandinavian sensibility.",
        fullDescription: "A compact two-bedroom apartment designed with an open-plan configuration to maximise the sense of space. It features a muted Scandinavian palette, layered with darker accents, textured surfaces, and custom cabinetry — introduced to maintain proportion without visual clutter. The bedroom follows the same restrained design solutions. Minimal yet warm, every decision was driven by spatial optimisation, ensuring the everyday practicality within a compact urban footprint.",
        images: [...generateImages("bedroom-modern", 10), ...generateImages("living-urban", 8)],
    },
    "city-modern": {
        title: "Urbana",
        location: "Kolkata",
        category: "Private Residential",
        year: "2023",
        description: "A high-rise residence where spatial innovation and natural materials come together to elevate everyday living.",
        fullDescription: "A thoughtful high-rise residence emphasising spatial innovation and natural materials. A key design decision was the extension of the balcony into the hall area — this maximises the panoramic high-rise views and allows the balcony to function as an outdoor living extension. This single move transforms a conventional element into a central experiential feature. All aesthetic, technical services were carefully concealed outside the hall, with vents and wiring placed behind furniture, ensuring the visual flow of the space is preserved. Bamboo-based flooring plays a central role in shaping the home's identity, while a commissioned artwork by local artisans stands as the defining centrepiece of the residence.",
        images: generateImages("urbana", 20),
    },
    "sinclairs": {
        title: "Sinclairs Bayview",
        location: "Port Blair, Andaman & Nicobar Islands",
        category: "Hospitality",
        year: "2024",
        description: "A landmark renovation of a legacy hospitality asset — tropical contemporary palette, panoramic ocean views.",
        fullDescription: "A landmark renovation of a legacy hospitality asset on the Andaman Islands. The design uses a tropical contemporary palette and expansive glazing to maximise panoramic ocean views while enhancing climate resilience. Understanding cost before execution begins allowed better decisions and prevented costly corrections after possession. The renovation sought to honour the building's identity while significantly elevating the guest experience through thoughtful spatial and material interventions.",
        images: ["/projects/sinclairs-1.jpg", ...generateImages("living-luxe", 9), ...generateImages("bedroom-luxe", 7)],
    },
    "heritage-palace": {
        title: "Bikaner House",
        location: "Bikaner, Rajasthan",
        category: "Heritage & Commercial",
        year: "2023",
        description: "A contemporary interpretation of traditional Rajasthani haveli architecture.",
        fullDescription: "A contemporary interpretation of traditional Rajasthani courtyard architecture (haveli typology). The design features repetitive arches, carved railings, sandstone tones, and a central courtyard pool — all drawn from the historical vocabulary of the region. The challenge was to introduce modern comfort and functionality without compromising the building's heritage character. Materials were sourced locally wherever possible, and artisans from the region were engaged to ensure authenticity in each carved and finished detail.",
        images: generateImages("bikaner", 16),
    },
    "heritage-hall": {
        title: "Dal Chini",
        location: "Kolkata",
        category: "Hospitality",
        year: "2024",
        description: "A modern culinary destination — refined rustic, reclaimed wood, hand-finished metals, natural stone.",
        fullDescription: "A modern culinary destination designed with a refined rustic concept. The material palette includes reclaimed wood, hand-finished metals, and natural stone to create an atmosphere that is approachable yet upscale. The design carefully balances warmth with restraint — ensuring the space feels inviting without becoming casual. Lighting plays a central role, with layered sources creating an evolving atmosphere from daytime lunch service through evening dining. Sufficient time for fabrication, curing processes, and installation as an investment that prevents post-occupancy corrections.",
        images: generateImages("exhibition", 2),
    },
    "taj-gateway": {
        title: "The Taj Gateway",
        location: "Kolkata",
        category: "Hospitality",
        year: "2024",
        description: "A luxury hotel lobby redesign blending contemporary comfort with traditional Indian craft elements.",
        fullDescription: "The redesign of the Taj Gateway lobby focuses on creating a sense of arrival that is both grand and welcoming. By integrating traditional Indian craft elements—such as ornate sandstone carvings and geometric marble patterns—with contemporary furniture and warm lighting, the studio has created a space that feels deeply rooted in its context while providing modern comfort. The high ceilings and arched windows are accentuated to allow natural light to flood the space, highlighting the rich textures and jewel tones of the interior.",
        images: ["/projects/hospitality-3.jpg", ...generateImages("living-luxe", 5)],
    },
    "skyline-heights": {
        title: "Nahata Residence",
        location: "Kolkata",
        category: "Private Residential",
        year: "2023",
        area: "Multi-unit",
        description: "Luxury living redefined — bespoke joinery, premium marble finishes, cohesive design language.",
        fullDescription: "Luxury living redefined. This multi-unit development features bespoke joinery, premium marble finishes, and a cohesive design language that appeals to the discerning buyer. Each unit maintains its own character while adhering to shared principles of proportion, material quality, and considered detailing. The design intent was to create homes that feel custom-built rather than developer standard — spaces where the quality of each surface and junction speaks to a higher standard of craft.",
        images: generateImages("nahata", 12),
    },
    "grand-residence": {
        title: "Grand Residence",
        location: "Kolkata",
        category: "Private Residential",
        year: "2023",
        description: "A warm and inviting family home with a touch of glamour — rich woods, plush velvets, statement lighting.",
        fullDescription: "A warm and inviting family home with a touch of glamour. Rich woods, plush velvets, and statement lighting create a series of spaces that are perfect for both everyday life and entertaining at scale. The design balances the needs of a large family with the aesthetic ambition of the client — finding a middle ground between grandeur and liveability. Custom furniture pieces were designed specifically for the space, ensuring that each room has a focal point that anchors the broader composition.",
        images: generateImages("pappu", 20),
    },
    "opulent-bedrooms": {
        title: "Opulent Suites",
        location: "Kolkata",
        category: "Private Residential",
        year: "2024",
        description: "Master suites for ultimate relaxation — plush textiles, bespoke headboards, integrated lighting.",
        fullDescription: "A collection of master suites designed for ultimate relaxation and grandeur. Featuring plush textiles, bespoke headboards, and integrated lighting systems that allow the mood of each room to shift from energised morning routines to restorative evening atmospheres. Every textile, finish, and fixture was selected to perform both visually and experientially — ensuring that the suites feel as considered at 11pm as they do at 11am.",
        images: generateImages("bedroom-luxe", 15),
    },
    "modern-bedrooms": {
        title: "Modern Bedrooms",
        location: "Kolkata",
        category: "Private Residential",
        year: "2024",
        description: "Efficient, stylish, serene — clean lines, smart storage, calming neutral palette.",
        fullDescription: "Efficient, stylish, and serene. These bedroom designs focus on clean lines, smart storage solutions, and a calming neutral palette for the modern lifestyle. The challenge with each compact bedroom was to create a sense of spaciousness without sacrificing storage or functionality. Custom joinery runs floor to ceiling, integrating wardrobe, study, and display functions into a single resolved composition.",
        images: generateImages("bedroom-modern", 15),
    },
    "luxury-living": {
        title: "Luxury Living",
        location: "Kolkata",
        category: "Private Residential",
        year: "2024",
        description: "Grand living areas — volume, light, marble, brass, and velvet.",
        fullDescription: "Grand living areas designed for hosting and relaxation. Emphasising volume, light, and sophisticated material palettes including marble, brass, and velvet. Each space was designed with an awareness of how it would be inhabited — from the daily routines of the household to formal entertaining occasions. The selection of statement furniture pieces was made collaboratively with the client, ensuring that each living room reflects not just the studio's aesthetic sensibility but the personality of the family within.",
        images: generateImages("living-luxe", 14),
    },
    "urban-living": {
        title: "Urban Living",
        location: "Kolkata",
        category: "Private Residential",
        year: "2023",
        description: "Smart open-plan solutions for city apartments — flow, functionality, and restraint.",
        fullDescription: "Smart open-plan living solutions for city apartments. Integrating dining and lounging areas seamlessly with a focus on flow and functionality. In each of these projects, the brief was to make the most of a constrained footprint without compromise. Furniture selection and layout planning were undertaken simultaneously — treating them as a single design problem rather than sequential decisions. The result is a series of spaces that feel considered from every angle.",
        images: generateImages("living-urban", 11),
    },
    "kensington-residence": {
        title: "Kensington Residence",
        location: "London",
        category: "Private Residential",
        year: "2022",
        description: "A masterclass in understated luxury — classical proportions with contemporary detailing.",
        fullDescription: "A masterclass in understated luxury, this residence combines classical proportions with contemporary detailing. The palette is deliberately restrained — off-whites, warm greys, and carefully chosen natural stones — allowing the architecture and the views to speak. Custom joinery throughout the apartment ties each space to a coherent design language while accommodating the diverse functional requirements of a London pied-à-terre.",
        images: generateImages("living-luxe", 5),
    },
    "mayfair-penthouse": {
        title: "Mayfair Penthouse",
        location: "London",
        category: "Private Residential",
        year: "2022",
        description: "Located in one of London's most prestigious addresses — understated sophistication throughout.",
        fullDescription: "Located in one of London's most prestigious addresses, this penthouse exudes sophistication through restraint. The design foregoes ostentatious gestures in favour of exceptional quality at every junction — from the precision of the joinery reveals to the selection of hand-knotted rugs. The rooftop terrace was treated as a natural extension of the living space, with outdoor furniture and planting schemes that mirror the material palette of the interior.",
        images: generateImages("bedroom-luxe", 5),
    },
};

export default function ProjectDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsData[slug];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
                <div className="text-center">
                    <p className="text-neutral-400 font-light mb-4">Project not found</p>
                    <Link href="/projects" className="text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-primary transition-colors">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Hero — full bleed */}
            <div className="relative h-[80vh] w-full">
                <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-10 left-10"
                >
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">{project.location} — {project.category}</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-white">{project.title}</h1>
                </motion.div>
            </div>

            <Container className="py-24">
                <Link href="/projects" className="inline-flex items-center text-[11px] uppercase tracking-widest text-neutral-400 hover:text-black mb-16 transition-colors">
                    <ArrowLeft size={14} className="mr-2" /> Back to Portfolio
                </Link>

                {/* Project Info + Description */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Location</h3>
                            <p className="font-serif text-lg">{project.location}</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Type</h3>
                            <p className="font-serif text-lg">{project.category}</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Year</h3>
                            <p className="font-serif text-lg">{project.year}</p>
                        </div>
                        {project.area && (
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Area</h3>
                                <p className="font-serif text-lg">{project.area}</p>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-3">
                        <p className="text-neutral-400 font-light text-sm uppercase tracking-widest mb-4">{project.description}</p>
                        <div className="w-12 h-px bg-primary mb-8" />
                        <p className="text-neutral-700 font-light text-xl leading-relaxed">
                            {project.fullDescription}
                        </p>
                    </div>
                </div>

                {/* Gallery — full width images stacked */}
                <div className="space-y-3">
                    {project.images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full"
                        >
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100">
                                <Image
                                    src={img}
                                    alt={`${project.title} — ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                    sizes="100vw"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-32 text-center border-t border-neutral-100 pt-24">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">DesignOne Studio</p>
                    <h3 className="text-3xl font-serif mb-8">Ready to begin your project?</h3>
                    <Link href="/contact" className="inline-block px-12 py-4 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-700 transition-colors">
                        Get in Touch
                    </Link>
                </div>
            </Container>
        </main>
    );
}
