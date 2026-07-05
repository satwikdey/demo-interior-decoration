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
  { title: "Modular Kitchens", image: "/raw-canvas/cat_kitchen.png" },
  { title: "Wardrobes & Dressing Rooms", image: "/raw-canvas/cat_wardrobes.png" },
  { title: "Entertainment Units", image: "/raw-canvas/cat_entertainment.png" },
  { title: "Bars & Display Systems", image: "/raw-canvas/cat_bars.png" },
  { title: "Study & Home Office Furniture", image: "/raw-canvas/cat_study.png" },
  { title: "Custom Furniture & Storage", image: "/raw-canvas/cat_custom.png" },
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

const portfolioImages = [
  { src: "/raw-canvas/completed_1.png", alt: "Warm luxury kitchen crafted by Raw Canvas" },
  { src: "/raw-canvas/cat_wardrobes.png", alt: "Walk-in wardrobe with custom storage" },
  { src: "/raw-canvas/cat_bars.png", alt: "Bespoke bar and display system" },
  { src: "/raw-canvas/cat_study.png", alt: "Study and home office furniture" },
  { src: "/raw-canvas/completed_2.png", alt: "Ambient bedroom with custom furniture" },
];

const teamImages = [
  { src: "/raw-canvas/action_1.png", alt: "Artisan sanding a custom furniture component" },
  { src: "/raw-canvas/action_2.png", alt: "Workshop team assembling custom joinery" },
  { src: "/raw-canvas/bg_workshop.png", alt: "Craftsman working at a large workshop table" },
  { src: "/raw-canvas/bg_craftsman.png", alt: "Craftsman detailing material by hand" },
];

const partnerLogos = ["ITC Hotels", "Sinclairs", "Vesta", "RCGC", "Ambuja Neotia"];

function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
        light ? "text-[#EAE5DE] hover:text-white" : "text-[#2C2523] hover:text-[#8C827A]"
      }`}
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.6} />
    </Link>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.26em] ${light ? "text-[#EAE5DE]/55" : "text-[#8C827A]"}`}>
      {children}
    </p>
  );
}

export default function RawCanvasPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#EAE5DE] font-sans text-[#2C2523] selection:bg-[#2C2523] selection:text-[#EAE5DE]">
      <section className="bg-[#2C2523] text-[#EAE5DE]">
        <div className="mx-auto flex min-h-[40rem] w-full max-w-[120rem] flex-col px-5 py-5 sm:px-8 lg:min-h-[34rem] lg:px-12 lg:py-6">
          <header className="flex items-center justify-between border-b border-white/10 pb-4">
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
                    link.href === "/raw-canvas" ? "text-white" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-9 py-9 lg:grid-cols-[0.68fr_1fr] lg:gap-12 lg:py-7">
            <div className="max-w-[34rem]">
              <SectionLabel light>Raw Canvas</SectionLabel>
              <h1 className="mt-5 font-serif text-[4rem] font-light leading-[0.86] tracking-normal text-white sm:text-[5.25rem] lg:text-[5.6rem] xl:text-[6.25rem]">
                Design.
                <br />
                Manufacture.
                <br />
                <em className="font-light italic text-[#EAE5DE]">Deliver.</em>
              </h1>
              <p className="mt-6 max-w-[27rem] text-[0.78rem] font-light leading-6 text-[#EAE5DE]/72">
                Raw Canvas is the manufacturing arm of Design One Studio, where highly engineered interiors are shaped through material intelligence,
                technical detailing, and an uncompromising eye for finish.
              </p>
              <div className="mt-8">
                <TextLink href="#process" light>
                  Discover Raw Canvas
                </TextLink>
              </div>
            </div>

            <div className="relative min-h-[21rem] overflow-hidden bg-[#1f1917] shadow-2xl lg:h-[27rem] xl:h-[28rem]">
              <Image
                src="/raw-canvas/bg_workshop.png"
                alt="Craftsman working at a large wooden workshop table"
                fill
                className="object-cover object-center"
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C2523]/30 via-transparent to-black/15" />
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#EAE5DE] px-5 py-12 sm:px-8 lg:px-12 lg:py-11">
        <div className="mx-auto grid max-w-[120rem] gap-9 lg:grid-cols-[0.3fr_1fr] lg:gap-12">
          <div>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="mt-4 max-w-[17rem] font-serif text-4xl font-light leading-[0.96] tracking-normal sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem]">
              A seamless end-to-end process.
            </h2>
          </div>

          <div className="grid gap-px bg-[#2C2523]/12 md:grid-cols-5">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="bg-[#EAE5DE] px-5 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-2xl italic text-[#8C827A]">{step.number}</span>
                    <Icon className="h-5 w-5 text-[#8C827A]" strokeWidth={1.35} />
                  </div>
                  <h3 className="mt-7 min-h-10 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.14em] text-[#2C2523]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.68rem] font-light leading-5 text-[#2C2523]/62">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#8C827A] px-5 py-10 text-[#EAE5DE] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <SectionLabel light>What We Do</SectionLabel>
          <h2 className="mx-auto mt-3 max-w-[45rem] text-center font-serif text-4xl font-light leading-none tracking-normal text-white sm:text-5xl lg:text-[3.8rem] xl:text-[4.25rem]">
            Tailor-made solutions for every space.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {solutionCards.map((card) => (
              <article key={card.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#2C2523]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
                </div>
                <h3 className="mt-4 min-h-10 text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.18em] text-white">
                  {card.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAE5DE] px-5 py-12 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto grid max-w-[120rem] items-center gap-9 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12">
          <div className="max-w-[28rem]">
            <SectionLabel>Materials & Finishes</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[0.92] tracking-normal sm:text-5xl lg:text-[3.45rem] xl:text-[3.85rem]">
              Curated materials. Timeless finishes.
            </h2>
            <p className="mt-5 text-[0.78rem] font-light leading-6 text-[#2C2523]/66">
              We work with richly grained woods, honed stone, precision hardware, textured laminates, and refined metal accents to create pieces that
              feel composed, tactile, and enduring.
            </p>
            <div className="mt-7">
              <TextLink href="/contact">Explore Materials</TextLink>
            </div>
          </div>

          <div className="relative aspect-[16/7] overflow-hidden bg-[#d8d0c6] shadow-[0_2rem_5rem_rgba(44,37,35,0.16)]">
            <Image
              src="/raw-canvas/moodboard.png"
              alt="Flat-lay grid of wood, marble, brass hardware, and leaves"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#2C2523] px-5 py-12 text-[#EAE5DE] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto grid max-w-[120rem] items-center gap-9 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#1f1917]">
            <Image
              src="/raw-canvas/bg_craftsman.png"
              alt="Craftsman meticulously working on material"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/14" />
          </div>

          <div>
            <SectionLabel light>Why Raw Canvas</SectionLabel>
            <h2 className="mt-4 max-w-[40rem] font-serif text-4xl font-light leading-[0.92] tracking-normal text-white sm:text-5xl lg:text-[3.5rem] xl:text-[3.95rem]">
              Where design intent meets craftsmanship.
            </h2>

            <div className="mt-8 grid gap-px bg-white/12 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="bg-[#2C2523] px-6 py-6">
                    <Icon className="h-5 w-5 text-[#EAE5DE]/70" strokeWidth={1.35} />
                    <h3 className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white">{value.title}</h3>
                    <p className="mt-3 text-[0.68rem] font-light leading-5 text-[#EAE5DE]/58">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAE5DE] px-5 py-12 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem] text-center">
          <SectionLabel>Built By Raw Canvas</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-light leading-none tracking-normal sm:text-5xl lg:text-[3.7rem] xl:text-[4.1rem]">
            Crafted for living. Built to last.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {portfolioImages.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden bg-[#d8d0c6]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <TextLink href="/projects">Explore Our Work</TextLink>
          </div>
        </div>
      </section>

      <section className="bg-[#8C827A] px-5 py-12 text-[#EAE5DE] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto grid max-w-[120rem] items-center gap-9 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12">
          <div className="max-w-[26rem]">
            <SectionLabel light>The Team</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[0.92] tracking-normal text-white sm:text-5xl lg:text-[3.45rem] xl:text-[3.85rem]">
              Skilled hands. Passionate minds.
            </h2>
            <p className="mt-5 text-[0.78rem] font-light leading-6 text-[#EAE5DE]/72">
              Designers, detailers, machinists, polishers, and site teams work as one studio floor, aligning technical ambition with the sensitivity of hand-finished craft.
            </p>
            <div className="mt-7">
              <TextLink href="/about" light>
                Meet The Team
              </TextLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamImages.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden bg-[#2C2523]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAE5DE] px-5 py-10 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-[120rem] text-center">
          <h2 className="font-serif text-3xl font-light leading-tight tracking-normal sm:text-4xl lg:text-[2.5rem]">
            We collaborate with brands who trust our craftsmanship.
          </h2>

          <div className="mt-7 grid gap-px bg-[#2C2523]/12 sm:grid-cols-2 lg:grid-cols-5">
            {partnerLogos.map((logo) => (
              <div key={logo} className="flex min-h-20 items-center justify-center bg-[#EAE5DE] px-6 py-5">
                <span className="font-serif text-lg font-semibold uppercase tracking-[0.14em] text-[#2C2523]">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#2C2523] px-5 py-10 text-[#EAE5DE] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.18fr_0.18fr_0.3fr] lg:gap-12">
            <div>
              <Link href="/" className="font-serif text-3xl font-light leading-none tracking-wide text-white">
                design one
                <span className="mt-2 block font-sans text-[0.58rem] font-medium uppercase tracking-[0.36em] text-white/50">raw canvas</span>
              </Link>
              <p className="mt-8 max-w-[23rem] text-sm font-light leading-7 text-[#EAE5DE]/62">
                Interior architecture, custom manufacturing, and installation for finely detailed residential, hospitality, and commercial spaces.
              </p>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white">Studio</h3>
              <p className="mt-5 text-[0.76rem] font-light leading-7 text-[#EAE5DE]/62">
                Raw Canvas Facility
                <br />
                Design One Studio
                <br />
                Kolkata, India
                <br />
                hello@designone.studio
              </p>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white">Quick Links</h3>
              <div className="mt-5 grid gap-3 text-[0.72rem] font-light text-[#EAE5DE]/62">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/projects" className="group block">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#1f1917]">
                <Image
                  src="/raw-canvas/collab_room.png"
                  alt="Beautifully lit interior project preview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
              <p className="mt-4 inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/62 transition-colors group-hover:text-white">
                Latest Project <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </p>
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-6 text-[0.66rem] font-light uppercase tracking-[0.18em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <Link href="#" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Instagram
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                LinkedIn
              </Link>
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
