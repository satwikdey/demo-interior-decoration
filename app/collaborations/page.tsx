import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

const collaborations = [
    {
        name: "THG Paris",
        category: "Bathroom Fittings",
        image: "/projects/living-1.jpeg", // Placeholder
        slug: "thg-paris"
    },
    {
        name: "Vero Fabrics",
        category: "Textiles",
        image: "/projects/bedroom-luxe.jpg", // Placeholder
        slug: "vero-fabrics"
    },
    {
        name: "SA Baxter",
        category: "Hardware",
        image: "/projects/urbana-living.jpg", // Placeholder
        slug: "sa-baxter"
    }
];

export default function Collaborations() {
    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl mb-4">Collaborations</h1>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto text-lg">
                        Partnering with the world's finest artisans and brands to create specific collections that embody our design ethos.
                    </p>
                </div>
            </Container>

            <div className="px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {collaborations.map((collab, index) => (
                        <Link href={`/collaborations/${collab.slug}`} key={index} className="group text-center cursor-pointer block">
                            <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden bg-neutral-100">
                                <Image
                                    src={collab.image}
                                    alt={collab.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                            </div>
                            <div className="py-8 bg-white">
                                <h2 className="font-serif text-2xl mb-2">{collab.name}</h2>
                                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{collab.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
