import Link from "next/link";
import { Container } from "@/components/Container";

export const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-serif text-2xl mb-6">The Studio</h3>
                        <p className="text-neutral-400 max-w-sm font-thin leading-relaxed mb-8">
                            Creators of some of the world's most sophisticated spaces.
                            From private residences to marine and aviation, we deliver
                            bespoke luxury with understated elegance.
                        </p>
                        <div className="text-neutral-400 font-light text-sm space-y-2">
                            <p><strong className="text-white uppercase tracking-widest text-xs">London</strong><br />123 Design Street, London SW1A 1AA</p>
                            <p><strong className="text-white uppercase tracking-widest text-xs">New York</strong><br />456 5th Avenue, New York, NY 10018</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-secondary">Explore</h4>
                        <div className="flex flex-col space-y-4 text-neutral-300 font-light">
                            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                            <Link href="/projects" className="hover:text-white transition-colors">Portfolio</Link>
                            <Link href="/collaborations" className="hover:text-white transition-colors">Collaborations</Link>
                            <Link href="/press" className="hover:text-white transition-colors">Press</Link>
                            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-secondary">Contact</h4>
                        <div className="flex flex-col space-y-4 text-neutral-300 font-light">
                            <p>T: +44 (0) 20 7123 4567 (LDN)</p>
                            <p>T: +1 212 555 0199 (NY)</p>
                            <a href="mailto:info@designstudio.com" className="hover:text-white transition-colors">info@designstudio.com</a>
                            <div className="flex space-x-4 pt-4">
                                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>© {new Date().getFullYear()} Interior Design Studio. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
