import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const latestProjects = [
  {
    title: "Viareggio Logica Superyacht",
    category: "Marine & Aviation",
    image: "/projects/living-1.jpeg", // Placeholder
    slug: "viareggio-logica",
  },
  {
    title: "London Clarges Mayfair",
    category: "Residential Development",
    image: "/projects/bedroom-luxe.jpg", // Placeholder
    slug: "london-clarges",
  },
  {
    title: "New York Central Park Penthouse",
    category: "Private Residential",
    image: "/projects/urbana-living.jpg", // Placeholder
    slug: "ny-penthouse",
  },
];

const pressItems = [
  { title: "The 50 Finest Interior Designers 2021", publication: "Country & Town House" },
  { title: "Words of Wisdom", publication: "The Rake" },
  { title: "Design for Living", publication: "Vogue" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 2. Introduction Section */}
      <section className="py-24 bg-white text-center">
        <Container>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-tight max-w-4xl mx-auto mb-6">
            The Studio is an independent design practice – creators of some of the world’s most sophisticated spaces.
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto"></div>
        </Container>
      </section>

      {/* 3. Latest Projects */}
      <section className="pb-24 bg-white">
        <Container>
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">Latest Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

          {/* 4. View Portfolio Button */}
          <div className="text-center">
            <Link href="/projects" className="px-10 py-4 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors uppercase">
              View Portfolio
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. About Us Overview */}
      <section className="py-24 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif">A Bespoke Philosophy</h2>
            <p className="text-neutral-600 font-light text-xl leading-relaxed">
              We serve both private and commercial clients, delivering grandeur with understated elegance.
              From classic restoration to modern minimalism, our work is defined by a meticulous attention
              to detail and a commitment to creating spaces that enhance the lives of those who inhabit them.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. Craftsmanship Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] w-full bg-neutral-100">
              <Image src="/projects/bikaner-1.jpg" alt="Craftsmanship" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-serif">Exquisite Craftsmanship</h2>
              <p className="text-neutral-600 font-light text-lg leading-relaxed">
                We believe that true luxury lies in the details. That is why we collaborate with the
                world's finest artisans, joiners, and stone masons to create bespoke solutions
                that are unique to every project. Every texture, every joint, and every finish
                is considered with the utmost care.
              </p>
              <Link href="/about" className="inline-block text-sm uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-primary hover:border-primary transition-colors">
                Read More
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Press Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-4xl font-serif mb-8">In The Press</h2>
              <div className="space-y-6">
                {pressItems.map((item, idx) => (
                  <div key={idx} className="border-b border-neutral-800 pb-6 group cursor-pointer hover:border-white transition-colors">
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 group-hover:text-white transition-colors">{item.publication}</p>
                    <h3 className="text-xl font-serif">{item.title}</h3>
                  </div>
                ))}
              </div>
              <Link href="/press" className="inline-block mt-8 text-sm uppercase tracking-widest font-bold text-neutral-400 hover:text-white transition-colors">
                View More Press
              </Link>
            </div>
            <div className="relative h-[400px] w-full hidden md:block">
              <Image src="/projects/exhibition-1.jpg" alt="Press Feature" fill className="object-cover opacity-50" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
