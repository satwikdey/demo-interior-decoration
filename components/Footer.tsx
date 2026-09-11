"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/raw-canvas") return null;

    return (
        <footer className="bg-[#1E1712] text-[#FAF7F2] font-sans border-t border-[#5C4F44]/30">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 items-start">
                    
                    {/* Column 1: Logo and Contact Info (Mobile and Desktop) */}
                    <div className="flex flex-col space-y-12 md:space-y-16 col-span-1 md:col-span-3">
                        {/* Logo Text */}
                        <Link href="/" className="inline-block group">
                            <span className="font-serif text-3xl md:text-4xl tracking-wide text-[#FAF7F2] group-hover:text-[#A67B48] transition-colors">
                                design one <span className="text-xl md:text-2xl uppercase tracking-widest block md:inline mt-1 md:mt-0 md:ml-2 text-[#A67B48]">studio</span>
                            </span>
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-xs uppercase tracking-[0.2em]">
                            <div className="space-y-2">
                                <p className="font-bold text-[#A67B48] mb-3 text-[11px] tracking-[0.25em]">Address</p>
                                <p className="leading-relaxed text-[#FAF7F2]/90 font-normal">123 Design Avenue<br/>Mumbai, India</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-[#A67B48] mb-3 text-[11px] tracking-[0.25em]">Phone</p>
                                <p className="leading-relaxed text-[#FAF7F2]/90 font-normal">+91 98765 43210</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-[#A67B48] mb-3 text-[11px] tracking-[0.25em]">Email</p>
                                <p className="leading-relaxed lowercase tracking-normal text-[#FAF7F2]/90 font-normal">hello@designone.studio</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Nav Links */}
                    <div className="flex flex-col space-y-4 text-sm tracking-wide md:col-start-5 font-medium">
                        <Link href="/" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Home</Link>
                        <Link href="/about" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">About Us</Link>
                        <Link href="/collaborations" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Collaboration</Link>
                        <Link href="/projects" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Portfolio</Link>
                        <Link href="/raw-canvas" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Raw Canvas</Link>
                    </div>

                    {/* Column 3: Social Links */}
                    <div className="flex flex-col space-y-4 text-sm tracking-wide md:col-start-6 md:justify-self-end font-medium">
                        <a href="#" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Instagram</a>
                        <a href="#" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Pinterest</a>
                        <a href="#" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">Facebook</a>
                        <a href="#" className="text-[#FAF7F2]/85 hover:text-[#A67B48] transition-colors">LinkedIn</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-20 pt-8 border-t border-[#FAF7F2]/15 text-xs tracking-widest uppercase text-[#FAF7F2]/70 text-right">
                    <p>© {new Date().getFullYear()} design one studio — all rights reserved</p>
                </div>
            </div>
        </footer>
    );
};
