import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

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
        <main className="pt-32 pb-24 bg-neutral-50 min-h-screen">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl mb-4">Press</h1>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto">
                        Features, accolades, and editorial coverage from around the globe.
                    </p>
                </div>
            </Container>

            <div className="px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {pressMap.map((item, index) => (
                        <Link href={`/press/${item.slug}`} key={index} className="block group">
                            <article className="bg-white p-10 h-full flex flex-col justify-between">
                                <div className="relative h-[450px] md:h-[600px] w-full mb-8 overflow-hidden bg-neutral-100">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.publication}</p>
                                    <h3 className="font-serif text-2xl leading-tight group-hover:underline decoration-1">{item.title}</h3>
                                    <p className="text-neutral-400 text-sm font-light">{item.date}</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
