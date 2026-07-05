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
    role: "Principal Designer & Founder",
    title: "Concept Director · Material Curator · Lead Stylist",
    bio: "Arjun specialises in translating client aspirations into cohesive spatial narratives. His mastery of material language and light transforms every room into an understated statement of intent.",
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
    role: "Senior Principal · Execution",
    title: "Project Director · Site Supervisor · BOQ Lead",
    bio: "Rahul oversees the full lifecycle of execution — from procurement and contractor briefing to on-site quality assurance. His attention to detail ensures every design vision is realised faithfully.",
  },
  {
    id: 6,
    image: "/founders/founder-6.jpg",
    name: "Aziz Nimuchwala",
    role: "Design Associate · Co-Principal",
    title: "Styling Director · Textiles Lead · Final Review",
    bio: "Ananya leads the studio's styling and finishing direction. Her editorial eye for textiles, art and accessory curation brings the final layer of personality to each completed space.",
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
      style={{ background: "#1e1e1b" }}
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
              style={{ objectPosition: "center top" }}
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, #1e1e1b 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, #1e1e1b 0%, transparent 30%)",
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
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-white/70 hover:text-white transition-all duration-300"
              style={{ fontSize: "var(--text-body)", background: "rgba(0,0,0,0.35)" }}
            >
              ←
            </button>
            <span
              className="text-white/40 font-mono"
              style={{ fontSize: "var(--text-sm)", letterSpacing: "0.2em" }}
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next member"
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-white/70 hover:text-white transition-all duration-300"
              style={{ fontSize: "var(--text-body)", background: "rgba(0,0,0,0.35)" }}
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
                      ? "rgba(196,184,154,0.9)"
                      : "rgba(255,255,255,0.25)",
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
            className="uppercase text-[#8a8a7a] mb-8"
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
              className="block text-[#e8e0d0] font-light"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              Guided by
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 300,
                color: "#c4b89a",
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
              className="text-[#9a9488] font-light leading-relaxed"
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
              borderColor: "rgba(255,255,255,0.08)",
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
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="flex-shrink-0 text-[#5a5a52] uppercase"
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
                  className="text-[#c4b89a] font-light"
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
    <main className="bg-[#181818] min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — "Designing spaces that feel personal."
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "90vh", background: "#181818" }}
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
          <div className="absolute inset-0 bg-[#181818]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/80 to-[#181818]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-[#181818]/30" />
        </div>

        {/* Left: headline area */}
        <div className="site-container relative z-10 flex min-h-[90vh] flex-col justify-end lg:justify-center pt-36 pb-16 lg:py-28">
          {/* Small label */}
          <p
            className="uppercase text-[#a08060] mb-6"
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
              className="block text-[#e8e0d0] font-light"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              Designing
            </span>
            <span
              className="block text-[#e8e0d0] font-light"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              spaces
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                fontWeight: 300,
                color: "#c4a052",
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
                color: "#c4a052",
                fontFamily: "var(--font-serif)",
              }}
            >
              personal.
            </span>
          </h1>

          {/* Body columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 max-w-xl">
            <p
              className="text-[#6e6e62] font-light leading-relaxed"
              style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
            >
              Design One is an interior studio focused on creating spaces that feel elegant, comfortable and deeply personal. We start by understanding the family — its rhythms, aspirations, preferences, and passions.
            </p>
            <p
              className="text-[#6e6e62] font-light leading-relaxed"
              style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
            >
              Our commitment is to complete a design language and find what makes your space uniquely personal — making your home feel intimate and complete.
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
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-white/50 uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.25em", fontFamily: "var(--font-sans)", marginBottom: "4px" }}
              >
                Interior Studio
              </p>
              <p
                className="text-white font-light"
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
        style={{ background: "#181818" }}
      >
        <div className="site-container">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end mb-14 gap-8">
            <div className="lg:w-1/3">
              <p
                className="uppercase text-[#a08060] mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
              >
                Our Process
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
                <span
                  className="block text-[#e8e0d0] font-light"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
                >
                  How We
                </span>
                <span
                  className="block italic"
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                    fontWeight: 300,
                    color: "#c4a052",
                  }}
                >
                  Work
                </span>
              </h2>
            </div>
            <div className="lg:w-2/3 lg:pl-16">
              <p
                className="text-[#6e6e62] font-light leading-relaxed"
                style={{ fontSize: "var(--text-md)", maxWidth: "31rem", fontFamily: "var(--font-sans)" }}
              >
                We process a dream, every time we are invisible. We move from understanding the client&apos;s life to creating a complete design language and final execution process.
              </p>
            </div>
          </div>

          {/* 4-column process grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 overflow-hidden"
            style={{
              background: "#1b1b18",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              {
                num: "01",
                title: "Understand",
                description:
                  "We begin by understanding the family, lifestyle, requirements, preferences, the big dreams, and the smallest details.",
              },
              {
                num: "02",
                title: "Conceptualise",
                description:
                  "We create a design template through reflection, location, nature. Deliberately. Fully, step by step, and small moments.",
              },
              {
                num: "03",
                title: "Detail",
                description:
                  "We execute the design at blueprint, at little nuance to every corner, to every surface, and material choices.",
              },
              {
                num: "04",
                title: "Execute & Style",
                description:
                  "We coordinate the full execution, all tradespeople, manufacturers and contractors, and bring quality. We make it final.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className={[
                  "flex flex-col p-8 md:p-10",
                  i >= 1 ? "border-t border-white/[0.06] sm:border-t-0" : "",
                  i >= 2 ? "sm:border-t sm:border-white/[0.06] lg:border-t-0" : "",
                  i % 2 === 1 ? "sm:border-l sm:border-white/[0.06]" : "",
                  i > 0 ? "lg:border-l lg:border-white/[0.06]" : "",
                ].join(" ")}
              >
                <p
                  className="text-[#c4a052] font-mono mb-6"
                  style={{ fontSize: "var(--text-sm)", letterSpacing: "0.2em" }}
                >
                  {step.num}
                </p>
                <h3
                  className="text-[#e8e0d0] mb-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 400,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[#6e6e62] font-light leading-relaxed"
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
        style={{ background: "#181818" }}
      >
        <div className="site-container">

          {/* Header */}
          <div className="mb-14">
            <p
              className="uppercase text-[#a08060] mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
            >
              Studio Gallery
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
              <span
                className="block text-[#e8e0d0] font-light"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                Our Journey
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                  fontWeight: 300,
                  color: "#c4a052",
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
                value: "48+",
                label: "Projects Designed",
                desc: "Across residential, hospitality, and institutional categories — each project designed with a bespoke design story.",
              },
              {
                value: "12+",
                label: "Cities Reached",
                desc: "Our portfolio spans multiple cities across diverse climates, urban contexts and design locations.",
              },
              {
                value: "7+",
                label: "Years Practice",
                desc: "A decade of studio practice, developing strong and focused, disciplined and very clear design solutions.",
              },
              {
                value: "360°",
                label: "Design Support",
                desc: "A proven and trained team of project and honest design planning, and final fitting and styling.",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col p-8 md:p-10"
                style={{
                  background: "#242424",
                  borderRadius: "2px",
                }}
              >
                <p
                  className="text-[#e8e0d0] mb-2"
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
                  className="text-[#c4b89a] mb-3"
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
                  className="text-[#6e6e62] font-light leading-relaxed"
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
        style={{ background: "#1e1e1b", minHeight: "420px" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/living-luxe-4.jpg"
            alt="DesignOne luxury interior"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div
          className="site-container relative z-10 flex flex-col justify-center py-24 md:py-32"
        >
          <p
            className="uppercase text-[#a08060] mb-8"
            style={{ fontSize: "var(--text-xs)", letterSpacing: "0.35em", fontFamily: "var(--font-sans)" }}
          >
            Philosophy
          </p>
          <h2
            className="text-[#e8e0d0] font-light leading-[1.05] mb-10 max-w-2xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
              fontWeight: 300,
            }}
          >
            Luxury is not about excess. It is about{" "}
            <span className="italic" style={{ color: "#c4b89a" }}>
              balance.
            </span>
          </h2>
          <p
            className="text-[#9a9488] font-light leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "var(--text-body)", fontFamily: "var(--font-sans)" }}
          >
            We believe that the most enduring spaces are those that respect proportion, living, and restraint. Design One creates environments for the way people actually live — with comfort, curiosity, and quiet luxury.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 self-start px-8 py-4 text-[#1e1e1b] hover:bg-[#c4b89a]/90 transition-all duration-300"
            style={{
              background: "#c4b89a",
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
