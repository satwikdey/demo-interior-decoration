import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] text-white">
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <div className="relative h-8 w-32">
                            <Image
                                src="/logo.png"
                                alt="Studio Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-widest text-neutral-400">
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/projects" className="hover:text-white transition-colors">Portfolio</Link>
                        <Link href="/collaborations" className="hover:text-white transition-colors">Collaborations</Link>
                        <Link href="/press" className="hover:text-white transition-colors">Press</Link>
                        <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </nav>

                    {/* Social */}
                    <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest text-neutral-400 shrink-0">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-neutral-600 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} The Design Studio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
