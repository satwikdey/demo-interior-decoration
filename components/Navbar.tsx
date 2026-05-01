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
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Portfolio" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/press", label: "Press" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
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
                    <div className="relative h-10 w-40 md:h-12 md:w-48">
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
                <div className="hidden md:flex items-center space-x-8">
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
                    <Link
                        href="/contact"
                        className={cn(
                            "px-6 py-2 text-[11px] font-medium tracking-widest uppercase transition-all",
                            useLightText
                                ? "bg-white text-neutral-900 hover:bg-white/90"
                                : "bg-primary text-white hover:bg-primary/90"
                        )}
                    >
                        Inquire
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "md:hidden z-[60] relative p-2 transition-colors",
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[55] flex flex-col items-center justify-center space-y-6 md:hidden pt-20"
                    >
                        {navLinks.map((link) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-2xl font-serif transition-colors",
                                        pathname === link.href ? "text-primary" : "text-neutral-900 hover:text-primary"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="pt-4"
                        >
                            <Link
                                href="/contact"
                                className="px-8 py-3 bg-primary text-white text-[11px] font-medium tracking-widest uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Inquire
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
