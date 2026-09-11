"use client";

import { Container } from "@/components/Container";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <main className="min-h-screen bg-[#DFD6CD]">

            {/* ── HERO — Full bleed image with heading overlay ────── */}
            <section className="relative w-full overflow-hidden bg-[#1E1712]" style={{ minHeight: "55vh" }}>
                <Image
                    src="/projects/contact-hero.jpg"
                    alt="DesignOne Studio — Contact"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient fade overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/75 to-[#1E1712]/40"
                />

                {/* Hero text */}
                <div className="relative z-10 site-container h-full flex flex-col justify-end pb-16 pt-36">
                    <p
                        className="uppercase text-[#A67B48] font-bold mb-4 text-xs tracking-[0.3em]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Let&apos;s Talk
                    </p>
                    <h1 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }} className="text-scrim-dark">
                        <span
                            className="block text-[#FAF7F2] font-light"
                            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
                        >
                            Get in
                        </span>
                        <span
                            className="block italic text-[#D4A373] font-normal"
                            style={{
                                fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
                            }}
                        >
                            Touch.
                        </span>
                    </h1>
                    <p
                        className="text-[#FAF7F2]/90 font-normal leading-relaxed mt-6 max-w-lg text-base md:text-lg text-scrim-subtle"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        We are currently accepting new projects. Fill out the form below
                        or email us directly to discuss your spatial vision.
                    </p>
                </div>
            </section>

            {/* ── FORM + INFO GRID ────────────────────────────────── */}
            <section className="bg-[#DFD6CD]">
                <Container className="py-20 md:py-28">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-20">

                        {/* ── Contact Info ── */}
                        <div className="max-w-sm space-y-0">
                            <div>
                                <p
                                    className="uppercase text-[#5C4F44] font-bold mb-4 text-xs tracking-[0.3em]"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Studio Information
                                </p>
                                <h2
                                    className="text-[#2A211B] font-light leading-[0.95] mb-8 font-serif"
                                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                                >
                                    Design One<br />
                                    <span className="italic text-[#A67B48] font-normal">Studio</span>
                                </h2>
                            </div>

                            {/* Info rows */}
                            {[
                                {
                                    label: "Studio Address",
                                    value: "123 Design Avenue\nMumbai, India — 400001",
                                },
                                {
                                    label: "Email",
                                    value: "hello@designone.studio",
                                    href: "mailto:hello@designone.studio",
                                },
                                {
                                    label: "Phone",
                                    value: "+91 98765 43210",
                                    href: "tel:+919876543210",
                                },
                            ].map(({ label, value, href }) => (
                                <div
                                    key={label}
                                    className="flex min-h-[6.25rem] flex-col justify-between border-b border-[#5C4F44]/30 py-5"
                                >
                                    <p
                                        className="uppercase text-[#5C4F44] font-bold mb-2 text-xs tracking-[0.2em]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="font-medium text-[#2A211B] hover:text-[#A67B48] transition-colors duration-300 text-base md:text-lg"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p
                                            className="whitespace-pre-line font-normal leading-relaxed text-[#2A211B] text-base md:text-lg"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {value}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Socials */}
                            <div className="py-6">
                                <p
                                    className="uppercase text-[#5C4F44] font-bold mb-4 text-xs tracking-[0.2em]"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Follow
                                </p>
                                <div className="flex gap-6">
                                    {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
                                        <a
                                            key={s}
                                            href="#"
                                            className="text-[#2A211B] hover:text-[#A67B48] font-medium transition-colors duration-300 text-base"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {s}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Inquiry Form ── */}
                        <div className="bg-[#FAF7F2] p-8 md:p-12 rounded-3xl border border-[#5C4F44]/25 shadow-sm">
                            <p
                                className="uppercase text-[#A67B48] font-bold mb-8 text-xs tracking-[0.3em]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Inquiry Form
                            </p>

                            {submitted ? (
                                <div
                                    className="flex flex-col items-start justify-center py-16"
                                >
                                    <p
                                        className="text-[#A67B48] mb-3 font-serif italic text-3xl font-medium"
                                    >
                                        Thank you.
                                    </p>
                                    <p
                                        className="text-[#2A211B] font-normal text-lg"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        Your inquiry has been received. We will be in touch within 48 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name row */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {["First Name", "Last Name"].map((field) => (
                                            <div key={field} className="flex flex-col">
                                                <label
                                                    className="block uppercase text-[#2A211B] font-bold text-xs tracking-[0.2em] mb-2"
                                                    style={{ fontFamily: "var(--font-sans)" }}
                                                >
                                                    {field}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-transparent py-3 border-b-2 border-[#5C4F44]/30 text-[#2A211B] font-medium transition-colors focus:border-[#2A211B] focus:outline-none placeholder-[#5C4F44]/50"
                                                    style={{
                                                        fontFamily: "var(--font-sans)",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col">
                                        <label
                                            className="block uppercase text-[#2A211B] font-bold text-xs tracking-[0.2em] mb-2"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-transparent py-3 border-b-2 border-[#5C4F44]/30 text-[#2A211B] font-medium transition-colors focus:border-[#2A211B] focus:outline-none placeholder-[#5C4F44]/50"
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        />
                                    </div>

                                    {/* Project type */}
                                    <div className="flex flex-col">
                                        <label
                                            className="block uppercase text-[#2A211B] font-bold text-xs tracking-[0.2em] mb-2"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            Project Type
                                        </label>
                                        <select
                                            className="w-full cursor-pointer appearance-none bg-transparent py-3 border-b-2 border-[#5C4F44]/30 text-[#2A211B] font-medium transition-colors focus:border-[#2A211B] focus:outline-none"
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        >
                                            <option value="" className="bg-[#FAF7F2] text-[#2A211B]">Select a category</option>
                                            <option value="residential" className="bg-[#FAF7F2] text-[#2A211B]">Residential Interior</option>
                                            <option value="commercial" className="bg-[#FAF7F2] text-[#2A211B]">Commercial Space</option>
                                            <option value="hospitality" className="bg-[#FAF7F2] text-[#2A211B]">Hospitality</option>
                                            <option value="styling" className="bg-[#FAF7F2] text-[#2A211B]">Styling & Decoration</option>
                                            <option value="other" className="bg-[#FAF7F2] text-[#2A211B]">Other</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col">
                                        <label
                                            className="block uppercase text-[#2A211B] font-bold text-xs tracking-[0.2em] mb-2"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            placeholder="Tell us about your project, timeline, and location..."
                                            className="w-full resize-none bg-transparent py-3 border-b-2 border-[#5C4F44]/30 text-[#2A211B] font-medium transition-colors focus:border-[#2A211B] focus:outline-none placeholder-[#5C4F44]/50"
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="mt-6 inline-flex items-center gap-3 px-10 py-4 bg-[#2A211B] hover:bg-[#A67B48] text-[#FAF7F2] font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98]"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                        }}
                                    >
                                        Send Inquiry
                                        <span className="text-sm">→</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

        </main>
    );
}
