import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const latestProjects = [
  {
    title: "5 Ballygunge",
    category: "Private Residential — Kolkata",
    image: "/projects/living-1.jpeg",
    slug: "ballygunge",
  },
  {
    title: "Bikaner House",
    category: "Heritage & Commercial — Rajasthan",
    image: "/projects/bikaner-1.jpg",
    slug: "heritage-palace",
  },
  {
    title: "Urbana",
    category: "Private Residential — Kolkata",
    image: "/projects/urbana-living.jpg",
    slug: "city-modern",
  },
];

const pressItems = [
  { title: "Why This Style Continues to Grow", publication: "The Journal" },
  { title: "Understanding Cost Before Execution", publication: "The Journal" },
  { title: "Not Planning Interiors Before Possession", publication: "The Journal" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 2. Introduction Section */}
      <section className="py-20 bg-white text-center">
        <div className="px-8">
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-tight max-w-4xl mx-auto mb-6">
            DesignOne is an independent design studio committed to creating timeless, well-executed, and meaningful environments.
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto"></div>
        </div>
      </section>

      {/* 3. Latest Projects */}
      <section className="pb-16 bg-white">
        <div className="px-2">
          <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6 px-6">Latest Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
            {latestProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                category={project.category}
                image={project.image}
                slug={project.slug}
                index={index}
              />
            ))}
          </div>
        </div>

          {/* 4. View Portfolio Button */}
          <div className="text-center">
            <Link href="/projects" className="px-10 py-4 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors uppercase">
              View Portfolio
            </Link>
          </div>
      </section>

      {/* 5. About Us Overview */}
      <section className="py-24 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif">Restrained. Purposeful. Enduring.</h2>
            <p className="text-neutral-600 font-light text-xl leading-relaxed">
              Led by Yusuf Hussain and Vidhisha Nimuchwala, DesignOne works across high-end residential, hospitality,
              and heritage contexts — always raising standards while remaining grounded in core design principles.
              Every project is approached with an unwavering commitment to craft, detail, and the lives of the
              people who inhabit these spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. Raw Canvas / Craftsmanship Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative h-[500px] md:h-[700px] lg:h-[800px] w-full bg-neutral-100">
            <Image src="/projects/bikaner-1.jpg" alt="Raw Canvas Manufacturing" fill className="object-cover" />
          </div>
          <div className="px-12 md:px-20 lg:px-32 py-24 space-y-8">
            <p className="text-[10px] uppercase tracking-widest text-neutral-400">In-house Manufacturing</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Raw Canvas</h2>
            <p className="text-neutral-600 font-light text-xl leading-relaxed">
              Our manufacturing vertical, Raw Canvas, ensures uncompromising quality for every custom
              piece — from modular kitchens and wardrobes to bespoke beds, headboards, and hospitality
              furniture. Every piece is born from the studio's architectural design intent, ensuring
              seamless integration between the space and its furnishings.
            </p>
            <Link href="/about" className="inline-block text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-primary hover:border-primary transition-colors">
              About the Studio
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Journal Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-4xl font-serif mb-8">From the Journal</h2>
              <div className="space-y-6">
                {pressItems.map((item, idx) => (
                  <div key={idx} className="border-b border-neutral-800 pb-6 group cursor-pointer hover:border-white transition-colors">
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 group-hover:text-white transition-colors">{item.publication}</p>
                    <h3 className="text-xl font-serif">{item.title}</h3>
                  </div>
                ))}
              </div>
              <Link href="/journal" className="inline-block mt-8 text-[11px] uppercase tracking-widest font-bold text-neutral-400 hover:text-white transition-colors">
                Read the Journal
              </Link>
            </div>
            <div className="relative h-[400px] w-full hidden md:block">
              <Image src="/projects/exhibition-1.jpg" alt="Journal" fill className="object-cover opacity-50" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
