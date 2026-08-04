"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/Container";

export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* 3-image collage background */}
            <motion.div
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
                className="absolute inset-0 z-0 grid grid-cols-1 grid-rows-[1fr_0.65fr] gap-2 bg-[#6A5A49] p-2 md:gap-3 md:p-3"
            >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                    <div className="relative overflow-hidden">
                        <Image
                            src="/projects/living-luxe-1.jpg"
                            alt="Modern kitchen interior"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                    </div>
                    <div className="relative overflow-hidden">
                        <Image
                            src="/projects/living-urban-1.jpg"
                            alt="Refined living room interior"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <Image
                        src="/projects/nahata-living.jpg"
                        alt="Elegant interior detailing"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6A5A49]/30 via-[#6A5A49]/30 to-[#6A5A49]/55" />
            </motion.div>

            {/* Hero Content */}
            <Container className="relative z-10 flex min-h-screen items-center justify-center text-center text-[#DFD6CD]">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-script text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight"
                    >
                        Timeless Elegance
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto text-[#DFD6CD]/90"
                    >
                        Crafting bespoke interiors that blend luxury, comfort, and individual story.
                    </motion.p>
                </div>
            </Container>
        </section>
    );
};
