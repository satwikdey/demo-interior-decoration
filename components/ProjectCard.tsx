"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    slug: string; // simpler than full href
    index: number;
}

export const ProjectCard = ({ title, category, image, slug, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[400px] md:h-[500px] w-full overflow-hidden cursor-pointer"
        >
            <Link href={`/projects/${slug}`}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 w-full translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-bold">{category}</p>
                    <h3 className="text-white font-serif text-2xl md:text-3xl">{title}</h3>
                </div>
            </Link>
        </motion.div>
    );
};
