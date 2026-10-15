"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   FOUNDING MEMBERS DATA
───────────────────────────────────────────────────────────────────────────── */
const founders = [
  {
    id: 1,
    image: "/founders/founder-1.jpg",
    name: "Yusuf Hussain & Vidhisha Nimuchwala",
    role: "Principal Designer & Founder",
    title: "Architect · Material Expert · Site Director",
    bio: "Yusuf brings architectural structure, planning rigour, and deep site knowledge to every project. He oversees coordination between manufacturing, finishing, and on-site execution — ensuring quality across the full lifecycle.",
  },
  {
    id: 2,
    image: "/founders/founder-2.jpg",
    name: "Yusuf Hussain & Vidhisha Nimuchwala & Aziz Nimuchwala",
    role: "Creative Director · Co-Founder",
    title: "Concept Lead · Aesthetic Director · Visual Approval",
    bio: "Vidhisha brings a refined sensibility to spatial harmony, detail, and user experience. She oversees conceptual development and aesthetic direction — ensuring every environment is deeply considered.",
  },
  {
    id: 3,
    image: "/founders/founder-3.jpg",
    name: "Yusuf Hussain",
    statement: "CLARITY IN EVERY LINE.",
    role: "Principal Designer & Co-Founder",
    title: "Spatial Planning · Material Expertise · Construction Precision",
    bio: "Yusuf Hussain is the Principal Designer and Co-Founder of Design One Studio. With nearly three decades of experience, he brings clarity to complex spaces through thoughtful planning, material understanding and construction precision. His approach balances creative vision with practical execution, shaping interiors that feel refined, purposeful and enduring. From the first idea to the final detail, he ensures every project remains coherent, buildable and true to its original design intent.",
  },
  {
    id: 4,
    image: "/founders/founder-4.jpg",
    name: "Yusuf Hussain & Vidhisha Nimuchwala",
    role: "Head of Architecture",
    title: "Structural Lead · Planning Expert · Quality Control",
    bio: "Priya brings precision and clarity to every structural brief. Her background in heritage architecture and modern residential work gives the studio its grounding in proportional discipline.",
  },
  {
    id: 5,
    image: "/founders/founder-5.jpg",
    name: "Vidhisha Nimuchwala",
    statement: "CARE IN EVERY DETAIL.",
    role: "Operations Director & Co-Founder",
    title: "Client Experience · Material Selection · Studio Operations",
    bio: "Vidhisha Nimuchwala is the Operations Director and Co-Founder of Design One Studio. She leads client experience, material selection and the studio's day-to-day coordination with an intuitive understanding of finishes, lifestyles and individual needs. Her approach brings warmth and order to every project, transforming design intent into a seamless journey. Through attentive communication and precise coordination, she ensures each interior feels personal, considered and beautifully resolved from selection through completion throughout.",
  },
  {
    id: 6,
    image: "/founders/founder-aziz.jpg",
    name: "Aziz Nimuchwala",
    statement: "PROGRESS WITH PURPOSE.",
    role: "Architect · Business Development & Marketing",
    title: "Architecture · Digital Strategy · Brand Development",
    bio: "Aziz Nimuchwala is an Architect leading Business Development and Marketing at Design One Studio. Representing the studio's next generation, he brings a contemporary perspective to brand development, digital presence and internal systems. His technology-led approach introduces clearer workflows, stronger communication and greater operational efficiency. By connecting design thinking with modern tools and client expectations, he helps the practice grow purposefully while preserving the values and design rigour that define it.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FOUNDING MEMBERS CAROUSEL COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const featuredFounders = founders.filter(({ id }) => [3, 5, 6].includes(id));

function FoundingMembersCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartRef = useRef<number>(0);

  const total = featuredFounders.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      setTimeout(() => {
        setDisplayed(index);
        setTimeout(() => {
          setCurrent(index);
          setIsAnimating(false);
        }, 50);
      }, 400);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    const idx = (current + 1) % total;
    goTo(idx);
  }, [current, total, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next, isPaused]);

  const handlePointerDown = () => {
    pressStartRef.current = Date.now();
    setIsPaused(true);
  };

  const handlePointerUp = () => {
    setIsPaused(false);
  };

  const handlePointerCancel = () => {
    setIsPaused(false);
  };

  const handleCardClick = () => {
    const elapsed = Date.now() - pressStartRef.current;
    if (elapsed < 250) {
      next();
    }
  };

  const member = featuredFounders[displayed]!;
  const isEntering = displayed === current;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1E1712] py-20 md:py-28"
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerCancel}
        onPointerCancel={handlePointerCancel}
        className="site-container flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Image Card */}
        <div className="relative w-full lg:w-auto flex-shrink-0 flex justify-center lg:justify-start">
          <div
            onClick={handleCardClick}
            className="relative mx-auto lg:mx-0 w-full max-w-[320px] sm:max-w-[350px] md:max-w-[375px] h-auto md:h-[500px] aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#2A211B] shadow-2xl border border-[#FAF7F2]/10 cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Next founder"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") next();
            }}
          >
            <div
              className={`relative h-full w-full transition-all duration-500 ease-out ${isAnimating
                ? "opacity-0 scale-95"
                : isEntering
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
                }`}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/30 to-transparent"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-7 md:p-8 text-[#FAF7F2]"
              >
                <p
                  className="uppercase text-[#A67B48] font-bold text-xs tracking-[0.25em] mb-2"
                >
                  {member.role}
                </p>
                <h3
                  className="font-serif text-2xl md:text-3xl font-medium text-[#FAF7F2] text-scrim-dark"
                >
                  {member.name}
                </h3>
              </div>
            </div>

            {/* Slide counter pill at top-left */}
            <div className="absolute top-5 left-5 md:top-6 md:left-6 z-10 pointer-events-none">
              <span className="text-[#FAF7F2]/80 font-mono text-xs tracking-[0.2em] bg-[#1E1712]/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FAF7F2]/15">
                0{displayed + 1} / 0{total}
              </span>
            </div>

            {/* Dot indicators at top-right */}
            <div className="absolute top-5 right-5 md:top-6 md:right-6 flex items-center gap-2 z-10 bg-[#1E1712]/50 backdrop-blur-md px-3 py-2 rounded-full border border-[#FAF7F2]/15">
              {featuredFounders.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  aria-label={`Go to member ${i + 1}`}
                  className="transition-all duration-300 h-1.5 rounded-full cursor-pointer"
                  style={{
                    width: i === displayed ? "24px" : "6px",
                    background:
                      i === displayed
                        ? "#A67B48"
                        : "rgba(250,247,242,0.4)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bio Details */}
        <div className="w-full lg:flex-1 text-[#FAF7F2]">
          <p
            className="uppercase text-[#A67B48] font-bold text-xs tracking-[0.3em] mb-4"
          >
            The Principals
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#FAF7F2] leading-tight mb-6 text-scrim-dark"
          >
            Guided by{" "}
            <span className="italic text-[#D4A373] font-normal">
              design clarity
            </span>
          </h2>
          <div
            key={`bio-${displayed}`}
            className="transition-all duration-500"
            style={{
              opacity: isEntering ? 1 : 0,
              transform: isEntering ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A373] mb-5"
            >
              {member.statement}
            </p>
            <p
              className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#A67B48] mb-2"
            >
              Role
            </p>
            <p
              className="text-sm font-semibold text-[#FAF7F2] mb-6"
            >
              {member.role}
            </p>
            <p
              className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#A67B48] mb-2"
            >
              Expertise
            </p>
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#FAF7F2] mb-7 md:mb-8"
            >
              {member.title}
            </p>
            <p
              className="font-sans text-sm md:text-base text-[#FAF7F2]/90 leading-relaxed max-w-xl text-scrim-subtle text-justify"
            >
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function About() {
  return (
    <main className="bg-[#DFD6CD] min-h-screen text-[#2A211B]">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — "Designing spaces that feel personal."
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#1E1712] min-h-[85vh] flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/about-hero-dark.jpg"
            alt="DesignOne Studio interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1712]/95 via-[#1E1712]/75 to-[#1E1712]/45 opacity-70" />
        </div>

        <div className="site-container relative z-10 py-32 md:py-40">
          <p
            className="uppercase text-[#A67B48] font-bold mb-4 text-xs tracking-[0.3em]"
          >
            About Design One
          </p>
          <h1
            className="leading-[0.95] mb-8 max-w-3xl text-scrim-dark font-serif"
          >
            <span
              className="block text-[#FAF7F2] font-light"
              style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)" }}
            >
              Designing spaces that feel{" "}
            </span>
            <span
              className="block italic text-[#D4A373] font-normal"
              style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)" }}
            >
              personal.
            </span>
          </h1>

          <div className="max-w-2xl">
            <p
              className="text-[#FAF7F2]/90 font-normal leading-relaxed text-base md:text-lg text-scrim-subtle"
            >
              Founded on the belief that good design begins with understanding people, Design One has spent three decades creating spaces that are thoughtful, enduring and distinctly personal.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW WE WORK
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 md:py-28 bg-[#DFD6CD]"
      >
        <div className="site-container">

          {/* Header row */}
          <div className="mb-14">
            <p
              className="uppercase text-[#5C4F44] font-bold mb-4 text-xs tracking-[0.3em]"
            >
              Our Process
            </p>
            <h2 className="whitespace-nowrap" style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
              <span
                className="inline text-[#2A211B] font-light"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                How We{" "}
              </span>
              <span
                className="inline italic text-[#A67B48] font-normal"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                }}
              >
                Work
              </span>
            </h2>
          </div>

          {/* 5-column process grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
          >
            {[
              {
                num: "01",
                title: "Understand",
                description:
                  "Every successful project begins with listening. We take time to understand your lifestyle, aspirations, routines and functional requirements before a single design decision is made.",
              },
              {
                num: "02",
                title: "Conceptualise",
                description:
                  "Ideas are translated into clear design concepts through layouts, material palettes and spatial planning, creating a strong foundation for every project.",
              },
              {
                num: "03",
                title: "Detail",
                description:
                  "Every junction, finish and material is carefully resolved before execution begins, ensuring precision and consistency throughout the project.",
              },
              {
                num: "04",
                title: "Execute",
                description:
                  "Working closely with craftsmen, consultants and contractors, we oversee the transformation of design into reality with uncompromising quality and attention to detail.",
              },
              {
                num: "05",
                title: "Deliver",
                description:
                  "The final stage is more than handover. Every space is carefully inspected, styled and refined, ensuring it is ready to be experienced exactly as it was envisioned.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col bg-[#FAF7F2] p-8 md:p-9 border border-[#5C4F44]/25 shadow-sm rounded-2xl"
              >
                <h3
                  className="text-[#2A211B] mb-4 flex items-baseline gap-3 font-serif text-xl font-medium"
                >
                  <span
                    className="text-[#A67B48] font-mono font-bold text-sm"
                  >
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <p
                  className="text-[#4A3E34] font-normal leading-relaxed text-sm"
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GUIDED BY DESIGN CLARITY — DARK SECTION with CAROUSEL
      ══════════════════════════════════════════════════════════════════════ */}
      <FoundingMembersCarousel />

      {/* ══════════════════════════════════════════════════════════════════════
          OUR JOURNEY SO FAR — STATS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 md:py-28 bg-[#DFD6CD]"
      >
        <div className="site-container">

          {/* Header */}
          <div className="mb-14">
            <p
              className="uppercase text-[#5C4F44] font-bold mb-4 text-xs tracking-[0.3em]"
            >
              Studio Practice
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
              <span
                className="block text-[#2A211B] font-light"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                Our Journey
              </span>
              <span
                className="block italic text-[#A67B48] font-normal"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                }}
              >
                So Far
              </span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                value: "1000+",
                label: "Projects Designed",
                desc: "Across residential, hospitality, commercial and retail sectors, each project is tailored to its context with a commitment to timeless design and meticulous execution.",
              },
              {
                value: "25+",
                label: "Cities Reached",
                desc: "Our work extends across South-East Asia, delivering thoughtful design solutions while adapting to diverse cultures, locations and project requirements.",
              },
              {
                value: "30+",
                label: "Years of Practice",
                desc: "Three decades of experience have shaped our design philosophy, combining creativity, technical expertise and craftsmanship into every project.",
              },
              {
                value: "360°",
                label: "Design Support",
                desc: "From concept development and material selection to execution and final handover, we provide a complete, end-to-end design experience.",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col px-7 pb-8 pt-5 md:px-8 md:pb-9 md:pt-6 bg-[#FAF7F2] border border-[#5C4F44]/25 shadow-sm rounded-2xl"
              >
                <p
                  className="mb-5 md:mb-6 text-[#A67B48] font-serif text-4xl md:text-5xl font-medium leading-tight"
                >
                  {stat.value}
                </p>
                <p
                  className="text-[#2A211B] mb-3 font-bold uppercase text-xs tracking-wider"
                >
                  {stat.label}
                </p>
                <p
                  className="text-[#4A3E34] font-normal leading-relaxed text-sm"
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          LUXURY PHILOSOPHY — DARK CTA SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#1E1712] min-h-[440px]"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/about-philosophy-bg.jpeg"
            alt="DesignOne luxury interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1712]/95 via-[#1E1712]/75 to-[#1E1712]/50" />
        </div>

        <div
          className="site-container relative z-10 flex flex-col justify-center py-24 md:py-32"
        >
          <p
            className="uppercase text-[#A67B48] font-bold mb-6 text-xs tracking-[0.35em]"
          >
            Philosophy
          </p>
          <h2
            className="text-[#FAF7F2] font-light leading-[1.05] mb-8 max-w-2xl text-scrim-dark font-serif"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            }}
          >
            Luxury is not about excess. It is about{" "}
            <span className="italic text-[#D4A373] font-normal">
              balance.
            </span>
          </h2>
          <p
            className="text-[#FAF7F2]/90 font-normal leading-relaxed mb-10 max-w-xl text-scrim-subtle text-base md:text-lg"
          >
            We believe that the most enduring spaces are those that respect proportion, living, and restraint. Design One creates environments for the way people actually live — with comfort, curiosity, and quiet luxury.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 self-start rounded-full px-8 py-4 bg-[#A67B48] hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2A211B] transition-all duration-300 shadow-xl uppercase font-semibold text-xs tracking-[0.2em]"
          >
            Contact the Studio
            <span className="text-sm">→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
