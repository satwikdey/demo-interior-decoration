import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  DraftingCompass,
  Hammer,
  Instagram,
  Linkedin,
  PenTool,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Portfolio" },
  { href: "/raw-canvas", label: "Raw Canvas" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const processSteps = [
  {
    number: "01",
    title: "Concept & Design",
    description: "We study the brief, proportions, finishes, and user routines before translating intent into a refined design direction.",
    icon: DraftingCompass,
  },
  {
    number: "02",
    title: "Detailed Drawings",
    description: "Shop drawings, hardware mapping, service clearances, and finish schedules are documented for precision execution.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "Manufacturing & Production",
    description: "Our production floor brings cabinetry, metal, veneer, paint, and assembly into one closely supervised workflow.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Quality Inspection",
    description: "Each piece is checked for alignment, finish consistency, edge detailing, and long-term functional performance.",
    icon: ClipboardCheck,
  },
  {
    number: "05",
    title: "Delivery & Installation",
    description: "Protected dispatch, measured installation, and final handover complete the journey from raw material to lived space.",
    icon: Truck,
  },
];

const solutionCards = [
  { title: "Modular Kitchens", image: "/raw-canvas/raw-canvas-kitchen.png" },
  { title: "Wardrobes & Dressing Rooms", image: "/raw-canvas/raw-canvas-wardrobes.png" },
  { title: "Entertainment Units", image: "/raw-canvas/raw-canvas-entertainment.png" },
  { title: "Study & Home Office Furniture", image: "/raw-canvas/raw-canvas-study.png" },
  { title: "Mandir & Sacred Spaces", image: "/raw-canvas/raw-canvas-mandir.png" },
  { title: "Custom Furniture & Storage", image: "/raw-canvas/raw-canvas-storage.jpg" },
];

const values = [
  {
    title: "Design Integrity",
    description: "We protect the original design language through drawings, mockups, sampling, and measured execution.",
    icon: PenTool,
  },
  {
    title: "Quality Control",
    description: "Every stage is reviewed for structure, finish, hardware performance, and installation readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Tailor Made",
    description: "Each unit is built around the site, storage needs, proportions, and the way the client lives.",
    icon: Sparkles,
  },
];

const partnerLogos = ["Silver Spring", "Tata Housing 88 East", "Swarnamani", "Turning Point"];

function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] transition-colors ${
        light ? "text-[#FAF7F2] hover:text-[#D4A373]" : "text-[#2A211B] hover:text-[#A67B48]"
      }`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} />
    </Link>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.26em] ${light ? "text-[#D4A373]" : "text-[#A67B48]"}`}>
      {children}
    </p>
  );
}

export default function RawCanvasPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#DFD6CD] font-sans text-[#2A211B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1E1712] text-[#FAF7F2]">
        <div className="mx-auto flex min-h-[42rem] w-full max-w-[120rem] flex-col px-6 py-6 sm:px-10 lg:min-h-[38rem] lg:px-16 lg:py-8">
          <header className="relative z-20 flex items-center justify-between border-b border-[#FAF7F2]/15 pb-6">
            <Link href="/" className="relative block h-10 w-44">
              <Image
                src="/raw-canvas-logo.png"
                alt="Raw Canvas"
                fill
                className="object-contain object-left brightness-200"
                priority
              />
            </Link>

            <nav className="hidden items-center space-x-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                    link.href === "/raw-canvas" ? "text-[#FAF7F2] border-b-2 border-[#A67B48] pb-1" : "text-[#FAF7F2]/80 hover:text-[#FAF7F2]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="flex min-h-[35rem] flex-1 items-start py-14 lg:min-h-[39rem] lg:py-24">
            <div className="relative z-10 max-w-[36rem]">
              <h1 className="font-serif text-[4rem] font-light leading-[0.9] tracking-normal text-[#FAF7F2] sm:text-[5.25rem] lg:text-[5.6rem] xl:text-[6.25rem] text-scrim-dark">
                Design.
                <br />
                Manufacture.
                <br />
                <em className="font-normal italic text-[#D4A373]">Deliver.</em>
              </h1>
              <p className="mt-6 max-w-[30rem] text-base md:text-lg font-normal leading-relaxed text-[#FAF7F2]/90 text-scrim-subtle">
                Raw Canvas is the manufacturing arm of Design One Studio, where highly engineered interiors are shaped through material intelligence,
                technical detailing, and an uncompromising eye for finish.
              </p>
              <div className="mt-10">
                <TextLink href="#process" light>
                  Discover Raw Canvas
                </TextLink>
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden bg-[#1E1712]">
              <Image
                src="/raw-canvas/raw-canvas-hero.png"
                alt="Raw Canvas workshop and manufacturing facility"
                fill
                className="object-cover object-center opacity-70"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E1712]/95 via-[#1E1712]/75 to-[#1E1712]/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-[#DFD6CD] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-14">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="mt-4 max-w-[19rem] font-serif text-4xl font-light leading-[0.96] tracking-normal sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem] text-[#2A211B]">
              A seamless end-to-end process.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#5C4F44]/25 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-2xl font-bold italic text-[#A67B48]">{step.number}</span>
                    <Icon className="h-6 w-6 text-[#A67B48]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 min-h-10 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-[#2A211B]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-[#4A3E34]">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do Grid */}
      <section className="bg-[#1E1712] px-6 py-20 text-[#FAF7F2] sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[120rem]">
          <div className="text-center mb-14">
            <SectionLabel light>What We Do</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-[50rem] font-serif text-4xl font-light leading-none tracking-normal text-[#FAF7F2] sm:text-5xl lg:text-[3.8rem] xl:text-[4.25rem]">
              <span className="text-[#D4A373] italic font-normal">Tailor-made</span> solutions for every space.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {solutionCards.map((card) => (
              <article key={card.title} className="group flex flex-col bg-[#2A211B] rounded-2xl overflow-hidden shadow-lg border border-[#FAF7F2]/10">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1712]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/80 via-transparent to-transparent" />
                </div>
                <h3 className="p-4 min-h-14 text-xs font-bold uppercase leading-5 tracking-[0.15em] text-[#FAF7F2] group-hover:text-[#D4A373] transition-colors">
                  {card.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Finishes */}
      <section className="bg-[#DFD6CD] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="max-w-[32rem]">
              <SectionLabel>Materials & Finishes</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[0.92] tracking-normal sm:text-5xl lg:text-[3.45rem] xl:text-[3.85rem] text-[#2A211B]">
                Curated materials. Timeless finishes.
              </h2>
              <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[#4A3E34]">
                We work with richly grained woods, honed stone, precision hardware, textured laminates, and refined metal accents to create pieces that
                feel composed, tactile, and enduring.
              </p>
              <div className="mt-8">
                <TextLink href="/contact">Explore Materials</TextLink>
              </div>
            </div>

            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-[#1E1712] shadow-2xl">
              <Image
                src="/raw-canvas/raw-canvas-materials.png"
                alt="Curated wood, stone, hardware, and natural material samples"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Raw Canvas */}
      <section className="bg-[#1E1712] px-6 py-20 text-[#FAF7F2] sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[120rem]">
          <div className="mx-auto text-center">
            <SectionLabel light>Why Raw Canvas</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-[88rem] font-serif text-4xl font-light leading-[0.92] tracking-normal text-[#FAF7F2] sm:text-5xl lg:text-[3.35rem] xl:text-[3.7rem]">
              Where design intent meets craftsmanship.
            </h2>

            <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="bg-[#2A211B] p-8 rounded-2xl border border-[#FAF7F2]/10 shadow-lg">
                    <Icon className="h-8 w-8 text-[#D4A373]" strokeWidth={1.5} />
                    <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#FAF7F2]">{value.title}</h3>
                    <p className="mt-3 text-sm font-normal leading-relaxed text-[#FAF7F2]/85">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Experience */}
      <section className="bg-[#DFD6CD] px-6 py-16 sm:px-10 lg:px-16 lg:py-16 border-t border-[#5C4F44]/25">
        <div className="mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-[0.27fr_0.73fr]">
          <div className="border-b border-[#5C4F44]/25 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
            <SectionLabel>Selected Experience</SectionLabel>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#5C4F44]">Trusted By</p>
            <p className="mt-2 font-serif text-3xl uppercase tracking-[0.08em] text-[#2A211B] font-medium">ITC Hotels</p>
          </div>

          <div>
            <SectionLabel>Projects Located At</SectionLabel>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {partnerLogos.map((logo) => (
                <div key={logo} className="flex min-h-16 items-center border-l-2 border-[#A67B48] px-5 bg-[#FAF7F2] rounded-r-xl shadow-sm">
                  <span className="font-serif text-sm uppercase tracking-[0.14em] text-[#2A211B] font-semibold">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Raw Canvas Footer */}
      <footer className="bg-[#1E1712] px-6 py-16 text-[#FAF7F2] sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.8fr_0.7fr]">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/raw-canvas-logo.png"
                  alt="Raw Canvas"
                  width={280}
                  height={72}
                  className="h-auto w-60 object-contain object-left brightness-200"
                />
              </Link>
              <p className="mt-8 max-w-[28rem] text-sm font-normal leading-relaxed text-[#FAF7F2]/85">
                Interior architecture, custom manufacturing, and installation for finely detailed residential, hospitality, and commercial spaces.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67B48]">Contact</h3>
              <p className="mt-5 text-sm font-normal leading-relaxed text-[#FAF7F2]/85">
                Raw Canvas Facility
                <br />
                Design One Studio
                <br />
                Kolkata, India
                <br />
                <a href="tel:+919831823527" className="transition-colors hover:text-[#D4A373] font-semibold text-[#FAF7F2]">+91 9831823527</a>
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67B48]">Quick Links</h3>
              <div className="mt-5 grid gap-3 text-sm font-normal text-[#FAF7F2]/85">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-[#FAF7F2]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-[#FAF7F2]/15 pt-8 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF7F2]/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <span>Follow Us</span>
              <Instagram className="h-5 w-5 hover:text-[#D4A373] cursor-pointer transition-colors" strokeWidth={1.6} />
              <Linkedin className="h-5 w-5 hover:text-[#D4A373] cursor-pointer transition-colors" strokeWidth={1.6} />
            </div>
            <p>Copyright © {new Date().getFullYear()} Design One Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
