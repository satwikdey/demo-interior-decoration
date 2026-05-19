"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/projects", label: "Portfolio" },
    { href: "/collaborations", label: "Collaboration" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
];

// Pages that start with a dark full-bleed hero image — navbar should be transparent/white text
const darkHeroPages = ["/", "/about", "/contact"];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const hasDarkHero = darkHeroPages.includes(pathname);
    // If no dark hero (e.g. /projects, /journal), start dark regardless of scroll
    // Force dark text when mobile menu is open (white bg)
    const useLightText = hasDarkHero && !isScrolled && !isMobileMenuOpen;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
                    : hasDarkHero
                        ? "bg-transparent py-6"
                        : "bg-white/95 backdrop-blur-md py-5 border-b border-neutral-100"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="relative z-50">
                    <div className="relative h-10 w-40 lg:h-12 lg:w-48">
                        <Image
                            src="/logo.png"
                            alt="Interior Designer Logo"
                            fill
                            className={cn(
                                "object-contain transition-all duration-500",
                                useLightText ? "brightness-0 invert" : "brightness-100"
                            )}
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-medium tracking-widest uppercase transition-colors",
                                useLightText
                                    ? "text-white/90 hover:text-white"
                                    : "text-neutral-700 hover:text-primary"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

            {/* Mobile Menu Toggle */}
            <button
                className={cn(
                    "lg:hidden z-[1000] relative p-2 transition-colors",
                    isMobileMenuOpen ? "text-neutral-900" : useLightText ? "text-white" : "text-neutral-800"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 w-screen h-screen bg-white !opacity-100 z-[999] flex flex-col lg:hidden"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 bg-white">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="relative h-10 w-32">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Mobile Menu Links */}
                        <div className="flex-1 flex flex-col px-10 py-12 space-y-8 overflow-y-auto bg-white">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-4xl font-serif transition-colors block",
                                            pathname === link.href ? "text-primary" : "text-neutral-900 hover:text-primary"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-10"
                            >
                                <Link
                                    href="/contact"
                                    className="block w-full text-center py-5 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Inquire Now
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
