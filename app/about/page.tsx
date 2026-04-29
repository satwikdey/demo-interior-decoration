import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <main className="bg-[#fff0db] min-h-screen">

            {/* Hero — Full Width, No Overlay Text */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <Image
                    src="/projects/about-hero-dark.jpg"
                    alt="DesignOne Studio"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Who We Are */}
            <section className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col justify-center px-12 md:px-20 lg:px-24 py-24">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6">Who We Are</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-8 leading-tight">
                        DesignOne — an independent studio creating timeless, well-executed environments.
                    </h2>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed mb-6">
                        We are committed to creating meaningful environments that raise standards while staying
                        grounded in core design principles. Every project is approached with an unwavering
                        commitment to craft, detail, and the lives of the people who inhabit these spaces.
                    </p>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed">
                        Our scope spans interior design and spatial planning, high-end residential projects,
                        hospitality interiors, and turnkey execution — from concept to commissioning.
                    </p>
                </div>
                <div className="relative h-[500px] lg:h-auto w-full">
                    <Image
                        src="/projects/living-1.jpeg"
                        alt="Studio interior"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Our Approach */}
            <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#F9F7F2]">
                <div className="relative h-[500px] lg:h-auto w-full order-last lg:order-first">
                    <Image
                        src="/projects/bikaner-1.jpg"
                        alt="Design approach"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center px-12 md:px-20 lg:px-24 py-24">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6">Our Direction</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-8 leading-tight">
                        Restrained. Purposeful. Enduring.
                    </h2>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed mb-6">
                        We believe that exceptional design is invisible — it simply feels right. Our process
                        begins with understanding the site, the client, and the life that will be lived within
                        the space. From that foundation, we build environments that are functional, refined,
                        and quietly extraordinary.
                    </p>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed">
                        Through our in-house manufacturing vertical, Raw Canvas, we ensure uncompromising
                        quality in every custom piece — from modular kitchens and wardrobes to bespoke
                        furniture and hospitality installations.
                    </p>
                    <Link href="/projects" className="inline-block mt-10 text-[11px] uppercase tracking-widest font-bold border-b border-neutral-900 pb-1 w-fit hover:text-primary hover:border-primary transition-colors">
                        View Our Work
                    </Link>
                </div>
            </section>

            {/* Principals */}
            <section className="py-16 px-0 bg-[#fff0db]">
                <div className="px-12 md:px-20 lg:px-24 mb-10">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">The Principals</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Yusuf */}
                    <div className="group flex flex-col">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src="/projects/living-luxe-1.jpg"
                                alt="Yusuf Hussain"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="px-12 md:px-20 lg:px-24 py-12">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Co-Founder & Principal</p>
                            <h3 className="font-serif text-3xl text-neutral-900 mb-4">Yusuf Hussain</h3>
                            <p className="text-neutral-600 font-light leading-relaxed">
                                Yusuf brings architectural structure, planning rigour, and deep site knowledge to every
                                project. His training grounds him in the technical — ensuring that design intent is
                                faithfully translated into built reality. He oversees coordination between manufacturing,
                                finishing, and on-site execution, ensuring quality and alignment across the full lifecycle
                                of each project.
                            </p>
                        </div>
                    </div>

                    {/* Vidhisha */}
                    <div className="group flex flex-col">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src="/projects/living-luxe-2.jpg"
                                alt="Vidhisha Nimuchwala"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="px-12 md:px-20 lg:px-24 py-12">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Co-Founder & Principal</p>
                            <h3 className="font-serif text-3xl text-neutral-900 mb-4">Vidhisha Nimuchwala</h3>
                            <p className="text-neutral-600 font-light leading-relaxed">
                                Vidhisha brings a refined sensibility to spatial harmony, detail, and user experience.
                                She oversees conceptual development and aesthetic direction — ensuring that every environment
                                is not only beautiful but deeply considered. Her work is rooted in the belief that great
                                design should feel effortless to inhabit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="bg-[#F9F7F2] py-24 px-12 md:px-20 lg:px-32">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-16 text-center">Capabilities</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div>
                        <h3 className="font-serif text-2xl text-neutral-900 mb-4 pb-3 border-b border-neutral-300">Architecture</h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-6">
                            Our architectural service establishes the foundation of every project. We begin by
                            understanding site conditions, context, climate, and client objectives to develop
                            a coherent spatial strategy that balances aesthetics, functionality, and long-term performance.
                        </p>
                        <ul className="space-y-2 text-neutral-600 font-light text-sm">
                            <li>— Concept development & master planning</li>
                            <li>— Spatial zoning & circulation planning</li>
                            <li>— Façade design & material strategy</li>
                            <li>— Technical drawings & statutory coordination</li>
                            <li>— Site supervision & execution oversight</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl text-neutral-900 mb-4 pb-3 border-b border-neutral-300">Interior Design</h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-6">
                            Comprehensive interior design guiding projects from concept to completion. We develop
                            cohesive environments that are functional, refined, and tailored to each client's
                            requirements — across residential, hospitality, and commercial contexts.
                        </p>
                        <ul className="space-y-2 text-neutral-600 font-light text-sm">
                            <li>— Space planning & layout development</li>
                            <li>— Material selection & finish palettes</li>
                            <li>— Furniture design & bespoke detailing</li>
                            <li>— Lighting concepts & electrical coordination</li>
                            <li>— BOQ preparation & budget alignment</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl text-neutral-900 mb-4 pb-3 border-b border-neutral-300">Turnkey Execution</h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-6">
                            We manage timelines, procurement, coordination, and on-site execution with structured
                            workflows and dedicated supervision. Our in-house manufacturing vertical, Raw Canvas,
                            ensures quality across all custom furniture and modular systems.
                        </p>
                        <ul className="space-y-2 text-neutral-600 font-light text-sm">
                            <li>— Project scheduling & planning</li>
                            <li>— Contractor & consultant coordination</li>
                            <li>— Procurement & material sourcing</li>
                            <li>— Cost monitoring & reporting</li>
                            <li>— Final commissioning & handover</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-8 bg-[#fff0db]">
                <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-8">Begin a Conversation</h2>
                <Link
                    href="/contact"
                    className="inline-block px-12 py-4 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-700 transition-colors"
                >
                    Get in Touch
                </Link>
            </section>
        </main>
    );
}
