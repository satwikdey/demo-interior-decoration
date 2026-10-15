"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    slug: string;
    index: number;
    className?: string;
}

export const ProjectCard = ({ title, category, image, slug, index, className }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("group relative overflow-hidden cursor-pointer w-full", className)}
        >
            <Link href={`/projects/${slug}`}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Desktop: reveal on hover | Mobile/Tablet: always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6A5A49]/50 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:bg-[#6A5A49]/0 lg:group-hover:bg-[#6A5A49]/20 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 w-full translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-bold">{category}</p>
                    <h3 className="text-[#DFD6CD] font-serif text-2xl lg:text-3xl">{title}</h3>
                </div>
            </Link>
        </motion.div>
    );
};
