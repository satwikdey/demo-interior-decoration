import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pressMap = [
    {
        publication: "The Rake",
        title: "Words of Wisdom: Design Philosophy",
        date: "October 2025",
        image: "/projects/living-1.jpeg",
        slug: "words-of-wisdom"
    },
    {
        publication: "Architectural Digest",
        title: "The 50 Finest Interior Designers 2025",
        date: "September 2025",
        image: "/projects/bedroom-luxe.jpg",
        slug: "finest-interior-designers"
    },
    {
        publication: "Vogue Living",
        title: "London's Newest Masterpiece",
        date: "July 2025",
        image: "/projects/urbana-living.jpg",
        slug: "londons-newest-masterpiece"
    },
    {
        publication: "Elle Decor",
        title: "Restoring History in Bikaner",
        date: "May 2025",
        image: "/projects/bikaner-1.jpg",
        slug: "restoring-history"
    }
];

export default function Press() {
    return (
        <main className="min-h-screen bg-[#DFD6CD] text-[#2A211B]">
            {/* Hero */}
            <section className="bg-[#1E1712] pt-36 pb-16 text-[#FAF7F2]">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#A67B48] mb-4">
                            Global Coverage
                        </p>
                        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#FAF7F2] font-light text-scrim-dark">Press & Features</h1>
                        <p className="text-[#FAF7F2]/90 font-normal text-lg md:text-xl leading-relaxed text-scrim-subtle">
                            Features, accolades, and editorial coverage from leading architectural and design publications.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Press Grid */}
            <section className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pressMap.map((item, index) => (
                        <Link href={`/press/${item.slug}`} key={index} className="block group">
                            <article className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#5C4F44]/25 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col justify-between">
                                <div className="relative h-[360px] md:h-[420px] w-full overflow-hidden bg-[#1E1712]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/60 via-transparent to-transparent" />
                                </div>
                                <div className="space-y-4 p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A67B48]">{item.publication}</span>
                                            <ArrowUpRight size={18} className="text-[#A67B48] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                        <h3 className="font-serif text-2xl leading-snug text-[#2A211B] font-medium group-hover:text-[#A67B48] transition-colors">{item.title}</h3>
                                    </div>
                                    <p className="text-[#5C4F44] text-xs uppercase tracking-widest font-semibold pt-4 border-t border-[#5C4F44]/20">{item.date}</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
