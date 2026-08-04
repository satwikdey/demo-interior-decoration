"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/raw-canvas") return null;

    return (
        <footer className="bg-brand-red text-[#DFD6CD]/80 font-sans">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 items-start">
                    
                    {/* Column 1: Logo and Contact Info (Mobile and Desktop) */}
                    <div className="flex flex-col space-y-12 md:space-y-16 col-span-1 md:col-span-3">
                        {/* Logo Text instead of Image */}
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-3xl md:text-4xl tracking-wide text-[#DFD6CD]">
                                design one <span className="text-xl md:text-2xl uppercase tracking-widest block md:inline mt-1 md:mt-0 md:ml-2">studio</span>
                            </span>
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-xs uppercase tracking-[0.2em]">
                            <div className="space-y-2">
                                <p className="font-bold text-[#DFD6CD] mb-4">Address</p>
                                <p className="leading-relaxed">123 Design Avenue<br/>Mumbai, India</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-[#DFD6CD] mb-4">Phone</p>
                                <p className="leading-relaxed">+91 98765 43210</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-[#DFD6CD] mb-4">Email</p>
                                <p className="leading-relaxed lowercase tracking-normal">hello@designone.studio</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Nav Links */}
                    <div className="flex flex-col space-y-4 text-sm tracking-wide md:col-start-5">
                        <Link href="/" className="hover:text-[#DFD6CD] transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-[#DFD6CD] transition-colors">About Us</Link>
                        <Link href="/collaborations" className="hover:text-[#DFD6CD] transition-colors">Collaboration</Link>
                        <Link href="/projects" className="hover:text-[#DFD6CD] transition-colors">Portfolio</Link>
                        <Link href="/raw-canvas" className="hover:text-[#DFD6CD] transition-colors">Raw Canvas</Link>
                    </div>

                    {/* Column 3: Social Links */}
                    <div className="flex flex-col space-y-4 text-sm tracking-wide md:col-start-6 md:justify-self-end">
                        <a href="#" className="hover:text-[#DFD6CD] transition-colors">Instagram</a>
                        <a href="#" className="hover:text-[#DFD6CD] transition-colors">Pinterest</a>
                        <a href="#" className="hover:text-[#DFD6CD] transition-colors">Facebook</a>
                        <a href="#" className="hover:text-[#DFD6CD] transition-colors">LinkedIn</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-24 pt-8 border-t border-[#DFD6CD]/20 text-xs tracking-widest uppercase text-[#DFD6CD]/50 text-right">
                    <p>© {new Date().getFullYear()} design one studio</p>
                </div>
            </div>
        </footer>
    );
};
