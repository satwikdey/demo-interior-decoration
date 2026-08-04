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
      className={`group inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
        light ? "text-[#DFD6CD] hover:text-[#B08E68]" : "text-[#B08E68] hover:text-[#6A5A49]"
      }`}
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.6} />
    </Link>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.26em] ${light ? "text-[#DFD6CD]/55" : "text-[#9A8E84]"}`}>
      {children}
    </p>
  );
}

export default function RawCanvasPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#DFD6CD] font-sans text-[#6A5A49] selection:bg-[#6A5A49] selection:text-[#DFD6CD]">
      <section className="relative overflow-hidden bg-[#6A5A49] text-[#DFD6CD]">
        <div className="mx-auto flex min-h-[40rem] w-full max-w-[120rem] flex-col px-5 py-5 sm:px-8 lg:min-h-[34rem] lg:px-12 lg:py-6">
          <header className="relative z-20 flex items-center justify-between border-b border-[#DFD6CD]/10 pb-4">
            <Link href="/" className="relative block h-10 w-40">
              <Image
                src="/raw-canvas-logo.png"
                alt="Raw Canvas"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            <nav className="hidden items-center space-x-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] font-medium uppercase tracking-widest transition-colors ${
                    link.href === "/raw-canvas" ? "text-[#DFD6CD]" : "text-[#DFD6CD]/90 hover:text-[#DFD6CD]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="flex min-h-[35rem] flex-1 items-start py-12 lg:min-h-[39rem] lg:py-24">
            <div className="relative z-10 max-w-[34rem]">
              <h1 className="font-serif text-[4rem] font-light leading-[0.86] tracking-normal text-[#DFD6CD] sm:text-[5.25rem] lg:text-[5.6rem] xl:text-[6.25rem]">
                Design.
                <br />
                Manufacture.
                <br />
                <em className="font-light italic text-[#B08E68]">Deliver.</em>
              </h1>
              <p className="mt-6 max-w-[27rem] text-[0.78rem] font-light leading-6 text-[#DFD6CD]/72">
                Raw Canvas is the manufacturing arm of Design One Studio, where highly engineered interiors are shaped through material intelligence,
                technical detailing, and an uncompromising eye for finish.
              </p>
              <div className="mt-8">
                <TextLink href="#process" light>
                  Discover Raw Canvas
                </TextLink>
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden bg-[#372E24]">
              <Image
                src="/raw-canvas/raw-canvas-hero.png"
                alt="Raw Canvas workshop and manufacturing facility"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#372E24]/95 via-[#372E24]/62 to-[#372E24]/18" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#372E24]/72 via-transparent to-[#372E24]/10" />
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#DFD6CD] px-5 py-12 sm:px-8 lg:px-12 lg:py-11">
        <div className="mx-auto grid max-w-[120rem] gap-9 lg:grid-cols-[0.3fr_1fr] lg:gap-12">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="mt-4 max-w-[17rem] font-serif text-4xl font-light leading-[0.96] tracking-normal sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem]">
              A seamless end-to-end process.
            </h2>
          </div>

          <div className="grid gap-px bg-[#6A5A49]/12 md:grid-cols-5">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="bg-[#DFD6CD] px-5 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-2xl italic text-[#B08E68]">{step.number}</span>
                    <Icon className="h-5 w-5 text-[#B08E68]" strokeWidth={1.35} />
                  </div>
                  <h3 className="mt-7 min-h-10 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.14em] text-[#6A5A49]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.68rem] font-light leading-5 text-[#6A5A49]/62">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#6A5A49] px-5 py-10 text-[#DFD6CD] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <SectionLabel light>What We Do</SectionLabel>
          <h2 className="mx-auto mt-3 max-w-[45rem] text-center font-serif text-4xl font-light leading-none tracking-normal text-[#DFD6CD] sm:text-5xl lg:text-[3.8rem] xl:text-[4.25rem]">
            <span className="text-[#B08E68]">Tailor-made</span> solutions for every space.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {solutionCards.map((card) => (
              <article key={card.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#6A5A49]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[#6A5A49]/10 transition-colors duration-500 group-hover:bg-[#6A5A49]/0" />
                </div>
                <h3 className="mt-4 min-h-10 text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.18em] text-[#DFD6CD]">
                  {card.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DFD6CD] px-5 py-12 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12">
            <div className="max-w-[30rem]">
              <SectionLabel>Materials & Finishes</SectionLabel>
            </div>
            <div className="hidden lg:block" />
          </div>

          <div className="mt-5 grid items-start gap-9 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12">
            <div className="max-w-[30rem]">
              <h2 className="font-serif text-4xl font-light leading-[0.92] tracking-normal sm:text-5xl lg:text-[3.45rem] xl:text-[3.85rem]">
                Curated materials. Timeless finishes.
              </h2>
              <p className="mt-5 text-[0.78rem] font-light leading-6 text-[#6A5A49]/66">
                We work with richly grained woods, honed stone, precision hardware, textured laminates, and refined metal accents to create pieces that
                feel composed, tactile, and enduring.
              </p>
              <div className="mt-7">
                <TextLink href="/contact">Explore Materials</TextLink>
              </div>
            </div>

          <div className="relative aspect-[16/7] overflow-hidden bg-[#DFD6CD] shadow-[0_2rem_5rem_rgba(106,90,73,0.16)]">
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

      <section className="bg-[#6A5A49] px-5 py-12 text-[#DFD6CD] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <div className="mx-auto text-center">
            <SectionLabel light>Why Raw Canvas</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-[88rem] whitespace-nowrap font-serif text-4xl font-light leading-[0.92] tracking-normal text-[#DFD6CD] sm:text-5xl lg:text-[3.35rem] xl:text-[3.7rem]">
              Where design intent meets craftsmanship.
            </h2>

            <div className="mt-10 grid gap-px bg-[#DFD6CD]/12 text-left md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="bg-[#6A5A49] px-6 py-6">
                    <Icon className="h-5 w-5 text-[#DFD6CD]/70" strokeWidth={1.35} />
                    <h3 className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#DFD6CD]">{value.title}</h3>
                    <p className="mt-3 text-[0.68rem] font-light leading-5 text-[#DFD6CD]/58">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#DFD6CD] px-5 py-10 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto grid max-w-[120rem] gap-8 lg:grid-cols-[0.27fr_0.73fr] lg:gap-10">
          <div className="border-b border-[#9A8E84]/30 pb-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <SectionLabel>Selected Experience</SectionLabel>
            <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#9A8E84]">Trusted By</p>
            <p className="mt-2 font-serif text-2xl uppercase tracking-[0.08em] text-[#6A5A49]">ITC Hotels</p>
          </div>

          <div>
            <SectionLabel>Projects Located At</SectionLabel>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4">
              {partnerLogos.map((logo) => (
                <div key={logo} className="flex min-h-16 items-center border-l border-[#9A8E84]/30 px-5 first:border-l-0 md:px-8">
                  <span className="font-serif text-[0.82rem] uppercase tracking-[0.16em] text-[#6A5A49]">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#372E24] px-5 py-10 text-[#DFD6CD] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.8fr_0.7fr] lg:gap-16">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/raw-canvas-logo.png"
                  alt="Raw Canvas"
                  width={280}
                  height={72}
                  className="h-auto w-56 object-contain object-left"
                />
              </Link>
              <p className="mt-8 max-w-[26rem] text-sm font-light leading-7 text-[#DFD6CD]/62">
                Interior architecture, custom manufacturing, and installation for finely detailed residential, hospitality, and commercial spaces.
              </p>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#DFD6CD]">Contact</h3>
              <p className="mt-5 text-[0.76rem] font-light leading-7 text-[#DFD6CD]/62">
                Raw Canvas Facility
                <br />
                Design One Studio
                <br />
                Kolkata, India
                <br />
                <a href="tel:+919831823527" className="transition-colors hover:text-[#B08E68]">+91 9831823527</a>
              </p>
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-[#B08E68]">Instagram -</p>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#DFD6CD]">Quick Links</h3>
              <div className="mt-5 grid gap-3 text-[0.72rem] font-light text-[#DFD6CD]/62">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-[#DFD6CD]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-[#DFD6CD]/12 pt-6 text-[0.66rem] font-light uppercase tracking-[0.18em] text-[#DFD6CD]/42 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <span>Instagram -</span>
              <Instagram className="h-4 w-4" strokeWidth={1.4} />
              <Linkedin className="h-4 w-4" strokeWidth={1.4} />
            </div>
            <p>Copyright {new Date().getFullYear()} Design One Studio</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
