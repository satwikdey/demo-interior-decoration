"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/Container";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Ken Burns Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/projects/living-1.jpeg" // Using one of the living room shots
                    alt="Luxury Living Room"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
            </motion.div>

            {/* Hero Content */}
            <Container className="relative z-10 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
                >
                    Timeless Elegance
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto text-neutral-100"
                >
                    Crafting bespoke interiors that blend luxury, comfort, and individual story.
                </motion.p>
            </Container>
        </section>
    );
};
