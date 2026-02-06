import { Container } from "@/components/Container";
import Image from "next/image";

export default function About() {
    return (
        <main className="pt-32 pb-24 bg-white">
            <Container>
                {/* Intro */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h1 className="font-serif text-5xl md:text-6xl mb-8">The Studio</h1>
                    <p className="text-neutral-500 font-light text-xl leading-relaxed">
                        Based in London and New York, Martin Kemp Design is a highly exclusive design studio
                        producing some of the world's most sophisticated interiors. We are known for our
                        exceptional attention to detail and our ability to create spaces that are both
                        impressive and inviting.
                    </p>
                </div>

                {/* Founder / Bio */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative h-[600px] w-full bg-neutral-100">
                        <Image
                            src="/projects/living-1.jpeg" // Using a project image as placeholder for founder
                            alt="Martin Kemp"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">The Principal</p>
                        <h2 className="font-serif text-4xl text-neutral-900">Principal Designer</h2>
                        <p className="text-lg font-light text-neutral-600 leading-relaxed">
                            With over 20 years of experience in the luxury design sector, our Principal has established
                            a reputation for creating bespoke interiors that transcend trends. The studio's approach is highly
                            collaborative, working closely with clients to understand their needs and aspirations.
                        </p>
                        <p className="text-lg font-light text-neutral-600 leading-relaxed">
                            "Design is about problem solving, but it is also about creating a feeling.
                            We want our clients to feel a sense of wonder when they enter their homes."
                        </p>
                    </div>
                </div>

                {/* Services & Workmanship */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24">
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl">Services</h2>
                        <ul className="space-y-4 text-neutral-600 font-light">
                            <li className="flex items-baseline space-x-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span>Complete Interior Architecture & Design</span>
                            </li>
                            <li className="flex items-baseline space-x-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span>Development Management</span>
                            </li>
                            <li className="flex items-baseline space-x-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span>Bespoke Furniture Design</span>
                            </li>
                            <li className="flex items-baseline space-x-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span>Art Curation & Acquisition</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl">Workmanship</h2>
                        <p className="text-neutral-600 font-light leading-relaxed">
                            We work with a trusted network of the world's finest artisans, from
                            Italian stonemasons to British cabinet makers. We oversee every
                            element of production to ensure that the finished result meets our
                            exacting standards.
                        </p>
                        <p className="text-neutral-600 font-light leading-relaxed">
                            This dedication to craftsmanship ensures that every Martin Kemp Design
                            project is a unique masterpiece, built to stand the test of time.
                        </p>
                    </div>
                </div>

                {/* Team Photo / Culture */}
                <div className="relative h-[500px] w-full mb-16 bg-neutral-100">
                    <Image
                        src="/projects/urbana-living.jpg"
                        alt="Studio Team"
                        fill
                        className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white font-serif text-5xl">Our Team</h2>
                    </div>
                </div>
            </Container>
        </main>
    );
}
