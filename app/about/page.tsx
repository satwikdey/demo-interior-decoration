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
    role: "Principal Designer & Co-Founder",
    title: "Spatial Planning · Material Expertise · Construction Precision",
    bio: "Yusuf Hussain is the Principal Designer and Co-Founder of Design One Studio. With nearly three decades of experience, he leads every project with a strong emphasis on spatial planning, material understanding and construction precision. His approach balances creative vision with practical execution, ensuring every design is thoughtful, buildable and refined to the finest detail.",
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
    role: "Operations Director & Co-Founder",
    title: "Client Experience · Material Selection · Studio Operations",
    bio: "As Co-Founder of Design One Studio, Vidhisha Nimuchwala leads the client experience, material selection and operational management of the practice. Her intuitive understanding of materials, finishes and lifestyle requirements allows her to curate interiors that are both timeless and deeply personal. By seamlessly coordinating client interactions and studio operations, she ensures every project progresses with clarity, precision and exceptional attention to detail.",
  },
  {
    id: 6,
    image: "/founders/founder-6.jpg",
    name: "Aziz Nimuchwala",
    role: "Business Development & Marketing",
    title: "Architecture · Digital Presence · Brand Development",
    bio: "Aziz Nimuchwala is an Architect and represents the next generation of Design One Studio. He leads the firm's marketing initiatives, digital presence and brand development while supporting internal operations through technology-driven systems and process optimisation. By introducing efficient workflows and modern tools, he helps the studio enhance productivity, strengthen communication and continuously evolve the way projects are delivered.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FOUNDING MEMBERS CAROUSEL COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const featuredFounders = founders.filter(({ id }) => [3, 5, 6].includes(id));

const founderPortraitPositions: Record<number, string> = {
  3: "center 22%",
  5: "center 41%",
  6: "center top",
};

function FoundingMembersCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = featuredFounders.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      // After exit animation, swap displayed and re-enter
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

  const prev = useCallback(() => {
    const idx = (current - 1 + total) % total;
    goTo(idx);
  }, [current, total, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  const member = featuredFounders[displayed]!;
  const isEntering = displayed === current;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#6A5A49" }}
    >
      <div
        className="max-w-screen-xl mx-auto flex flex-col lg:flex-row"
        style={{ minHeight: "640px" }}
      >
        {/* ── LEFT: Image Panel ── */}
        <div
          className="relative lg:w-[42%] w-full overflow-hidden flex-shrink-0"
          style={{ minHeight: "500px" }}
        >
          {/* Background image (always shown) */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: isEntering ? 1 : 0 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              style={{
                objectPosition:
                  founderPortraitPositions[member.id] ?? "center top",
              }}
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, #6A5A49 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, #6A5A49 0%, transparent 30%)",
              }}
            />
          </div>

          {/* Slide number + navigation at bottom-left */}
          <div
            className="absolute bottom-8 left-8 flex items-center gap-5 z-10"
            style={{ zIndex: 10 }}
          >
            <button
              onClick={prev}
              aria-label="Previous member"
              className="w-10 h-10 flex items-center justify-center border border-[#DFD6CD]/20 text-[#DFD6CD]/60 hover:border-[#DFD6CD]/70 hover:text-[#DFD6CD] transition-all duration-300"
              style={{ fontSize: "var(--text-body)", background: "rgba(106,90,73,0.55)" }}
            >
              ←
            </button>
            <span
              className="text-[#DFD6CD]/40 font-mono"
              style={{ fontSize: "var(--text-sm)", letterSpacing: "0.2em" }}
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next member"
              className="w-10 h-10 flex items-center justify-center border border-[#DFD6CD]/20 text-[#DFD6CD]/60 hover:border-[#DFD6CD]/70 hover:text-[#DFD6CD] transition-all duration-300"
              style={{ fontSize: "var(--text-body)", background: "rgba(106,90,73,0.55)" }}
            >
              →
            </button>
          </div>

          {/* Dot indicators */}
          <div
            className="absolute bottom-8 right-8 flex gap-2 z-10"
            style={{ zIndex: 10 }}
          >
            {featuredFounders.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to member ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background:
                    i === current
                      ? "rgba(154,142,132,0.9)"
                      : "rgba(223,214,205,0.25)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Text Panel ── */}
        <div
          className="relative lg:w-[58%] w-full flex flex-col justify-center px-10 md:px-14 lg:px-16 py-16 lg:py-20"
          style={{ zIndex: 5 }}
        >
          {/* Section label */}
          <p
            className="uppercase text-[#9A8E84] mb-8"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-sans)",
            }}
          >
            Founding Members
          </p>

          {/* Main headline */}
          <h2
            className="leading-[0.92] mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span
              className="block text-[#DFD6CD] font-light"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              Guided by
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 300,
                color: "#9A8E84",
              }}
            >
              design clarity.
            </span>
          </h2>

          {/* Bio paragraph */}
          <div
            key={`bio-${displayed}`}
            className="mb-10"
            style={{
              opacity: isEntering ? 1 : 0,
              transform: isEntering ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <p
              className="text-[#DFD6CD]/68 font-light leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                maxWidth: "30rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              {member.bio}
            </p>
          </div>

          {/* Metadata rows */}
          <div
            key={`meta-${displayed}`}
            className="border-t"
            style={{
              borderColor: "rgba(223,214,205,0.14)",
              opacity: isEntering ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}
          >
            {[
              { label: "NAME", value: member.name },
              { label: "ROLE", value: member.role },
              { label: "TITLE", value: member.title },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 py-4"
                style={{
                  borderBottom: "1px solid rgba(223,214,205,0.12)",
                }}
              >
                <span
                  className="flex-shrink-0 text-[#DFD6CD]/68 uppercase"
                  style={{
                    fontSize: "var(--text-2xs)",
                    letterSpacing: "0.25em",
                    fontFamily: "var(--font-sans)",
                    width: "2.75rem",
                    paddingTop: "2px",
                  }}
                >
                  {label}
                </span>
                <span
                  className="text-[#9A8E84] font-light"
                  style={{
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-sans)",
                    textTransform: "uppercase",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
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
    <main className="bg-[#6A5A49] min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — "Designing spaces that feel personal."
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "90vh", background: "#6A5A49" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/about-hero-dark.jpg"
            alt="DesignOne Studio interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Left: headline area */}
        <div className="site-container relative z-10 flex min-h-[90vh] flex-col justify-end lg:justify-center pt-36 pb-16 lg:py-28">
          {/* Small label */}
          <p
            className="uppercase text-[#9A8E84] mb-6"
            style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
          >
            About Design One
          </p>

          {/* Hero heading */}
          <h1
            className="leading-[0.9] mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span
              className="block text-[#DFD6CD] font-light"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              Designing
            </span>
            <span
              className="block text-[#DFD6CD] font-light"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              spaces
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                fontWeight: 300,
                color: "#DFD6CD",
                fontFamily: "var(--font-serif)",
              }}
            >
              that feel
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                fontWeight: 300,
                color: "#B08E68",
                fontFamily: "var(--font-serif)",
              }}
            >
              personal.
            </span>
          </h1>

          {/* Body columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 max-w-xl">
            <p
              className="text-[#DFD6CD]/68 font-light leading-relaxed"
              style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
            >
              Design One Studio is a multidisciplinary design practice creating refined residential, hospitality and commercial environments. Every project begins with understanding the people who will experience the space, shaping interiors that are timeless, functional and deeply personal.
            </p>
            <p
              className="text-[#DFD6CD]/68 font-light leading-relaxed"
              style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
            >
              For over three decades, we have combined thoughtful planning, material expertise and meticulous execution to deliver spaces with lasting value. Our work is guided by design clarity, craftsmanship and an uncompromising attention to detail.
            </p>
          </div>
        </div>

        {/* Right: image box with caption */}
        <div className="hidden">
          <div className="relative w-full max-w-sm lg:max-w-none rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/projects/about-hero-dark.jpg"
              alt="DesignOne Studio interior — refined design, guided by real living"
              fill
              className="object-cover"
              priority
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{
                background: "linear-gradient(to top, rgba(106,90,73,0.82) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-[#DFD6CD]/50 uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.25em", fontFamily: "var(--font-sans)", marginBottom: "4px" }}
              >
                Interior Studio
              </p>
              <p
                className="text-[#DFD6CD] font-light"
                style={{ fontSize: "13px", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
              >
                Refined design, guided by real living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW WE WORK
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 md:py-28"
        style={{ background: "#DFD6CD" }}
      >
        <div className="site-container">

          {/* Header row */}
          <div className="grid gap-8 lg:grid-cols-5 mb-14">
            <div className="lg:col-span-3">
              <p
                className="uppercase text-[#9A8E84] mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
              >
                Our Process
              </p>
              <h2 className="whitespace-nowrap" style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
                <span
                  className="inline text-[#6A5A49] font-light"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
                >
                  How We{" "}
                </span>
                <span
                  className="inline italic"
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                    fontWeight: 300,
                    color: "#B08E68",
                  }}
                >
                  Work
                </span>
              </h2>
            </div>
            <div className="lg:col-start-4 lg:col-span-2 lg:pt-5">
              <p
                className="w-full text-justify text-[#6A5A49]/68 font-light leading-relaxed"
                style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
              >
                Every project follows a carefully considered journey. From understanding your lifestyle to the final installation, each stage is designed to ensure clarity, precision and a seamless execution experience.
              </p>
            </div>
          </div>

          {/* 4-column process grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 overflow-hidden"
            style={{
              background: "rgba(106,90,73,0.16)",
              border: "1px solid rgba(154,142,132,0.35)",
            }}
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
            ].map((step, i) => (
              <div
                key={step.num}
                className={[
                  "flex flex-col bg-[#DFD6CD] p-8 md:p-10",
                  i >= 1 ? "border-t border-[#9A8E84]/35 sm:border-t-0" : "",
                  i >= 2 ? "sm:border-t sm:border-[#9A8E84]/35 lg:border-t-0" : "",
                  i % 2 === 1 ? "sm:border-l sm:border-[#9A8E84]/35" : "",
                  i > 0 ? "lg:border-l lg:border-[#9A8E84]/35" : "",
                ].join(" ")}
              >
                <h3
                  className="text-[#6A5A49] mb-4 flex items-baseline gap-3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 400,
                  }}
                >
                  <span
                    className="text-[#9A8E84] font-mono"
                    style={{ fontSize: "var(--text-sm)", letterSpacing: "0.12em" }}
                  >
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <p
                  className="text-[#6A5A49]/68 font-light leading-relaxed"
                  style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
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
        className="w-full py-20 md:py-28"
        style={{ background: "#DFD6CD" }}
      >
        <div className="site-container">

          {/* Header */}
          <div className="mb-14">
            <p
              className="uppercase text-[#9A8E84] mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
            >
              Studio Gallery
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
              <span
                className="block text-[#6A5A49] font-light"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                Our Journey
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                  fontWeight: 300,
                  color: "#B08E68",
                }}
              >
                So Far
              </span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="flex flex-col p-8 md:p-10"
                style={{
                  background: "#DFD6CD",
                  border: "1px solid rgba(154,142,132,0.28)",
                  borderRadius: "2px",
                }}
              >
                <p
                  className="text-[#6A5A49] mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[#9A8E84] mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-[#6A5A49]/68 font-light leading-relaxed"
                  style={{ fontSize: "var(--text-base)", fontFamily: "var(--font-sans)" }}
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
        className="relative w-full overflow-hidden"
        style={{ background: "#9A8E84", minHeight: "420px" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/living-luxe-4.jpg"
            alt="DesignOne luxury interior"
            fill
            className="object-cover"
          />
        </div>

        <div
          className="site-container relative z-10 flex flex-col justify-center py-24 md:py-32"
        >
          <p
            className="uppercase text-[#DFD6CD]/70 mb-8"
            style={{ fontSize: "var(--text-xs)", letterSpacing: "0.35em", fontFamily: "var(--font-sans)" }}
          >
            Philosophy
          </p>
          <h2
            className="text-[#1F4A3E] font-light leading-[1.05] mb-10 max-w-2xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
              fontWeight: 300,
            }}
          >
            Luxury is not about excess. It is about{" "}
            <span className="italic" style={{ color: "#B08E68" }}>
              balance.
            </span>
          </h2>
          <p
            className="text-[#1F4A3E] font-light leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "var(--text-body)", fontFamily: "var(--font-sans)" }}
          >
            We believe that the most enduring spaces are those that respect proportion, living, and restraint. Design One creates environments for the way people actually live — with comfort, curiosity, and quiet luxury.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 self-start rounded-full px-8 py-4 text-[#DFD6CD] hover:bg-[#9A8E84] transition-all duration-300"
            style={{
              background: "#B08E68",
              fontSize: "var(--text-sm)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
            }}
          >
            Contact the Studio
            <span>→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
