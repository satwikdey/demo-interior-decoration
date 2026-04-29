import { Container } from "@/components/Container";
import Image from "next/image";

export default function Contact() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero Image — full bleed, no text overlay */}
            <div className="relative w-full h-[55vh] overflow-hidden">
                <Image
                    src="/projects/living-luxe-5.jpg"
                    alt="Studio interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Page Header */}
            <div className="pt-20 pb-12 text-center">
                <h1 className="font-serif text-5xl text-neutral-900 mb-4">Get in Touch</h1>
                <p className="text-neutral-500 font-light text-lg max-w-xl mx-auto">
                    We are currently accepting new projects for 2026. Please fill out the form below
                    or email us directly to discuss your vision.
                </p>
            </div>

            {/* Form + Info */}
            <Container className="pb-28">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-[11px] uppercase tracking-widest mb-3 text-neutral-400">Studio</h3>
                            <p className="text-neutral-700 font-light leading-relaxed">
                                123 Design Avenue<br />London, UK SW1A 1AA
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-[11px] uppercase tracking-widest mb-3 text-neutral-400">Email</h3>
                            <a href="mailto:hello@designstudio.com" className="text-neutral-700 font-light hover:text-primary transition-colors">
                                hello@designstudio.com
                            </a>
                        </div>
                        <div>
                            <h3 className="font-bold text-[11px] uppercase tracking-widest mb-3 text-neutral-400">Phone</h3>
                            <p className="text-neutral-700 font-light">+44 (0) 20 7123 4567</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-[11px] uppercase tracking-widest mb-3 text-neutral-400">Follow</h3>
                            <div className="flex gap-6 text-neutral-700 font-light">
                                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">First Name</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Email</label>
                            <input
                                type="email"
                                className="w-full border-b border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Website</label>
                            <input
                                type="url"
                                className="w-full border-b border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Message</label>
                            <textarea
                                rows={4}
                                className="w-full border-b border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors resize-none text-neutral-900"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-10 py-4 bg-primary text-white text-[11px] font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
                        >
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </Container>
        </main>
    );
}
