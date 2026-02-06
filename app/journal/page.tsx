import { Container } from "@/components/Container";
import Image from "next/image";

const articles = [
    {
        title: "The Art of Layering: How to Create Depth in Neutral Spaces",
        date: "February 2, 2026",
        category: "Design Insights",
        image: "/projects/living-1.jpeg",
        excerpt: "Why beige doesn't have to be boring. We explore the use of texture, light, and patina to bring life to monochrome interiors."
    },
    {
        title: "Featured in Architectural Digest: The Kensington Project",
        date: "January 15, 2026",
        category: "Press",
        image: "/projects/bedroom-luxe.jpg",
        excerpt: "Our recent renovation of a historic Kensington townhouse has been featured in the latest issue of AD. Read the full story."
    },
    {
        title: "Sustainable Luxury: Sourcing Materials for the Future",
        date: "December 10, 2025",
        category: "Sustainability",
        image: "/projects/urbana-living.jpg",
        excerpt: "How we are reducing our carbon footprint without compromising on the high-end finish our clients expect."
    }
];

export default function Journal() {
    return (
        <main className="pt-32 pb-24 bg-neutral-50 min-h-screen">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">The Journal</h1>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto">
                        News, insights, and behind-the-scenes stories from our studio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article, index) => (
                        <article key={index} className="group cursor-pointer">
                            <div className="relative h-64 w-full overflow-hidden mb-6">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-4 text-xs uppercase tracking-widest text-neutral-400 font-bold">
                                    <span className="text-secondary">{article.category}</span>
                                    <span>{article.date}</span>
                                </div>
                                <h2 className="font-serif text-2xl group-hover:text-primary transition-colors">{article.title}</h2>
                                <p className="text-neutral-500 font-light leading-relaxed">{article.excerpt}</p>
                                <p className="text-xs uppercase tracking-widest font-bold border-b border-transparent group-hover:border-black inline-block pt-2 transition-all">Read More</p>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </main>
    );
}
