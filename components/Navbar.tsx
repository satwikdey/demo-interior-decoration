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
    { href: "/projects", label: "Portfolio" },
    { href: "/raw-canvas", label: "Raw Canvas" },
    { href: "/collaborations", label: "Collaboration" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
];

// Pages where the navbar starts fully transparent (dark hero behind it)
const darkHeroPages = ["/", "/about", "/contact"];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const hasDarkHero = darkHeroPages.includes(pathname);

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

    if (pathname === "/raw-canvas") return null;

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "bg-[#1E1712]/90 backdrop-blur-2xl border-b border-[#FAF7F2]/15 py-3.5 shadow-xl"
                    : hasDarkHero
                        ? "bg-transparent py-6"
                        : "bg-[#1E1712]/85 backdrop-blur-2xl border-b border-[#FAF7F2]/15 py-4 shadow-lg"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="relative z-50 flex items-center">
                    {/* Logo is oversized vertically but uses -my margins to stay within navbar flow */}
                    <div className="relative h-16 w-52 lg:h-20 lg:w-64 -my-4">
                        <Image
                            src="/logo.png"
                            alt="Interior Designer Logo"
                            fill
                            className="object-contain object-left brightness-0 invert"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-9">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200",
                                    isActive
                                        ? "text-[#A67B48] font-semibold"
                                        : "text-[#FAF7F2] hover:text-[#A67B48]"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden z-[1000] relative p-2 text-[#FAF7F2] hover:text-[#A67B48] transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
                        className="fixed inset-0 w-screen h-screen bg-[#DFD6CD] !opacity-100 z-[999] flex flex-col lg:hidden"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-[#5C4F44]/25 bg-[#DFD6CD]">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="relative h-12 w-36">
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
                        <div className="flex-1 flex flex-col px-10 py-12 space-y-8 overflow-y-auto bg-[#DFD6CD]">
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
                                            "text-3xl sm:text-4xl font-serif transition-colors block tracking-wide",
                                            pathname === link.href ? "text-[#A67B48] font-medium" : "text-[#2A211B] hover:text-[#A67B48]"
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
                                className="pt-8"
                            >
                                <Link
                                    href="/contact"
                                    className="block w-full text-center py-4 bg-[#2A211B] hover:bg-[#A67B48] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.25em] rounded-full transition-colors shadow-md"
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
