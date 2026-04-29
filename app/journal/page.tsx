import Image from "next/image";
import Link from "next/link";

const articles = [
    {
        title: "Why This Style Continues to Grow",
        date: "April 2026",
        category: "Design Insights",
        image: "/projects/urbana-living.jpg",
        slug: "why-minimalism-grows",
        excerpt: "Clients today increasingly prefer interiors that are functional rather than decorative, offer discreet storage, develop personality subtly, and respond to long-term wellbeing."
    },
    {
        title: "Understanding Cost Before Execution",
        date: "March 2026",
        category: "Process",
        image: "/projects/living-luxe-5.jpg",
        slug: "understanding-cost",
        excerpt: "Understanding cost before execution begins allows better decisions and prevents costly corrections. The clarity and accountability of structured design management makes all the difference."
    },
    {
        title: "Not Planning Interiors Before Possession",
        date: "February 2026",
        category: "Client Guide",
        image: "/projects/living-1.jpeg",
        slug: "planning-before-possession",
        excerpt: "Many homeowners begin discussions only after receiving keys. Early planning allows electrical coordination to specify, mechanical corrections, site preparation, and optimised layouts."
    },
    {
        title: "The Quiet Luxury of Scandinavian Interiors",
        date: "January 2026",
        category: "Design Insights",
        image: "/projects/bedroom-modern-1.jpg",
        slug: "scandinavian-luxury",
        excerpt: "Scandinavian luxury, when interpreted with depth and precision, offers a refined alternative to trend-driven interiors. It emphasises clarity, disciplined finishing, and purposeful material selection."
    },
    {
        title: "Inside the Bikaner Heritage Commission",
        date: "December 2025",
        category: "Projects",
        image: "/projects/bikaner-1.jpg",
        slug: "bikaner-heritage",
        excerpt: "A contemporary interpretation of Rajasthani haveli architecture — repetitive arches, sandstone tones, carved railings, and a central courtyard pool that honours the building's heritage."
    },
    {
        title: "The High-Rise Problem: Spatial Innovation at Urbana",
        date: "November 2025",
        category: "Projects",
        image: "/projects/urbana-1.jpg",
        slug: "urbana-spatial-innovation",
        excerpt: "Extending the balcony into the hall area transforms a conventional element into a central experiential feature — maximising panoramic views while creating an outdoor living extension."
    },
    {
        title: "Raw Canvas: Design-Led Manufacturing",
        date: "October 2025",
        category: "Studio",
        image: "/projects/living-luxe-3.jpg",
        slug: "raw-canvas-manufacturing",
        excerpt: "Our in-house manufacturing vertical ensures uncompromising quality for custom furniture and modular systems — born from our architectural design intent for seamless integration."
    },
    {
        title: "Restoring a Legacy: Sinclairs Bayview, Port Blair",
        date: "September 2025",
        category: "Projects",
        image: "/projects/nahata-1.jpg",
        slug: "sinclairs-bayview",
        excerpt: "A landmark renovation of a legacy hospitality asset using a tropical contemporary palette and expansive glazing to maximise panoramic ocean views while enhancing climate resilience."
    },
    {
        title: "When Managed Thoughtfully: Clarity and Long-Term Value",
        date: "August 2025",
        category: "Process",
        image: "/projects/exhibition-1.jpg",
        slug: "design-management",
        excerpt: "When managed thoughtfully, design provides clarity, accountability, and long-term value. Starting early often reduces costs while improving outcomes across the full lifecycle of a project."
    },
];

export default function Journal() {
    return (
        <main className="bg-[#F9F7F2] min-h-screen">
            {/* Header */}
            <div className="pt-40 pb-14 text-center px-8">
                <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">The Journal</h1>
                <p className="text-neutral-500 font-light max-w-xl mx-auto">
                    Design thinking, project stories, and practical insight from the studio.
                </p>
            </div>

            {/* Featured first article — full width */}
            <div className="mb-3 px-0">
                <Link href={`/journal/${articles[0].slug}`} className="block group relative w-full h-[60vh] overflow-hidden">
                    <Image
                        src={articles[0].image}
                        alt={articles[0].title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">{articles[0].category} — {articles[0].date}</p>
                        <h2 className="text-white font-serif text-3xl md:text-5xl max-w-3xl leading-tight">{articles[0].title}</h2>
                        <p className="text-white/70 font-light mt-4 max-w-2xl hidden md:block">{articles[0].excerpt}</p>
                    </div>
                </Link>
            </div>

            {/* Grid — 3 columns, big images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-0">
                {articles.slice(1).map((article, index) => (
                    <Link
                        key={index}
                        href={`/journal/${article.slug}`}
                        className="block group relative overflow-hidden aspect-[3/4]"
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">{article.category}</p>
                            <h3 className="text-white font-serif text-xl leading-snug">{article.title}</h3>
                            <p className="text-white/50 text-xs mt-2">{article.date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
