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
            <section className="relative w-full overflow-hidden" style={{ minHeight: "55vh" }}>
                <Image
                    src="/projects/living-luxe-5.jpg"
                    alt="DesignOne Studio — Contact"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(0.45)" }}
                    priority
                />
                {/* Gradient fade to page bg at bottom */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(106,90,73,0.3) 0%, rgba(106,90,73,0.95) 100%)",
                    }}
                />

                {/* Hero text */}
                <div className="relative z-10 site-container h-full flex flex-col justify-end pb-14 pt-36">
                    <p
                        className="uppercase text-[#9A8E84] mb-5"
                        style={{ fontSize: "var(--text-xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                    >
                        Let&apos;s Talk
                    </p>
                    <h1 style={{ fontFamily: "var(--font-serif)", lineHeight: "0.92" }}>
                        <span
                            className="block text-[#DFD6CD] font-light"
                            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
                        >
                            Get in
                        </span>
                        <span
                            className="block italic"
                            style={{
                                fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
                                fontWeight: 300,
                                color: "#9A8E84",
                            }}
                        >
                            Touch.
                        </span>
                    </h1>
                    <p
                        className="text-[#DFD6CD]/70 font-light leading-relaxed mt-8 max-w-lg"
                        style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                    >
                        We are currently accepting new projects for 2026. Fill out the form below
                        or email us directly to discuss your vision.
                    </p>
                </div>
            </section>

            {/* ── FORM + INFO GRID ────────────────────────────────── */}
            <section style={{ background: "#DFD6CD" }}>
                <Container className="py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">

                        {/* ── Contact Info ── */}
                        <div className="space-y-10">
                            <div>
                                <p
                                    className="uppercase text-[#9A8E84] mb-6"
                                    style={{ fontSize: "var(--text-xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                                >
                                    Studio Information
                                </p>
                                <h2
                                    className="text-[#6A5A49] font-light leading-[0.95] mb-6"
                                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)" }}
                                >
                                    Design One<br />
                                    <span className="italic" style={{ color: "#9A8E84" }}>Studio</span>
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
                                    className="py-5"
                                >
                                    <p
                                        className="uppercase text-[#6A5A49]/65 mb-2"
                                        style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                    >
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="text-[#6A5A49] font-light hover:text-[#9A8E84] transition-colors duration-300"
                                            style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p
                                            className="text-[#6A5A49]/70 font-light leading-relaxed whitespace-pre-line"
                                            style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                                        >
                                            {value}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Socials */}
                            <div
                                className="py-5"
                            >
                                <p
                                    className="uppercase text-[#6A5A49]/65 mb-4"
                                    style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                >
                                    Follow
                                </p>
                                <div className="flex gap-6">
                                    {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
                                        <a
                                            key={s}
                                            href="#"
                                            className="text-[#6A5A49]/70 hover:text-[#9A8E84] transition-colors duration-300 font-light"
                                            style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                                        >
                                            {s}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Inquiry Form ── */}
                        <div>
                            <p
                                className="uppercase text-[#9A8E84] mb-8"
                                style={{ fontSize: "var(--text-xs)", letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
                            >
                                Inquiry Form
                            </p>

                            {submitted ? (
                                <div
                                    className="flex flex-col items-start justify-center py-16"
                                    style={{ borderTop: "1px solid rgba(154,142,132,0.35)" }}
                                >
                                    <p
                                        className="text-[#9A8E84] mb-3"
                                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontStyle: "italic" }}
                                    >
                                        Thank you.
                                    </p>
                                    <p
                                        className="text-[#6A5A49]/70 font-light"
                                        style={{ fontSize: "var(--text-md)", fontFamily: "var(--font-sans)" }}
                                    >
                                        Your inquiry has been received. We will be in touch within 48 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-0">
                                    {/* Name row */}
                                    <div
                                        className="grid grid-cols-1 gap-6 border-b border-[#9A8E84]/35 pb-6 md:grid-cols-2 md:gap-8"
                                        style={{ minHeight: "6.25rem" }}
                                    >
                                        {["First Name", "Last Name"].map((field) => (
                                            <div key={field} className="flex flex-col justify-between">
                                                <label
                                                    className="block uppercase text-[#6A5A49]/65"
                                                    style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                                >
                                                    {field}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-transparent py-3 transition-colors focus:outline-none"
                                                    style={{
                                                        color: "#6A5A49",
                                                        fontSize: "var(--text-md)",
                                                        fontFamily: "var(--font-sans)",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Email */}
                                    <div
                                        className="flex flex-col justify-between border-b border-[#9A8E84]/35 py-6"
                                        style={{ minHeight: "6.25rem" }}
                                    >
                                        <label
                                            className="block uppercase text-[#6A5A49]/65"
                                            style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-transparent py-3 transition-colors focus:outline-none"
                                            style={{
                                                color: "#6A5A49",
                                                fontSize: "var(--text-md)",
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        />
                                    </div>

                                    {/* Project type */}
                                    <div
                                        className="flex flex-col justify-between border-b border-[#9A8E84]/35 py-6"
                                        style={{ minHeight: "6.25rem" }}
                                    >
                                        <label
                                            className="block uppercase text-[#6A5A49]/65"
                                            style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                        >
                                            Project Type
                                        </label>
                                        <select
                                            className="w-full cursor-pointer appearance-none bg-transparent py-3 transition-colors focus:outline-none"
                                            style={{
                                                color: "#6A5A49",
                                                fontSize: "var(--text-md)",
                                                fontFamily: "var(--font-sans)",
                                                background: "transparent",
                                            }}
                                        >
                                            <option value="" style={{ background: "#DFD6CD" }}>Select a category</option>
                                            <option value="residential" style={{ background: "#DFD6CD" }}>Residential Interior</option>
                                            <option value="commercial" style={{ background: "#DFD6CD" }}>Commercial Space</option>
                                            <option value="hospitality" style={{ background: "#DFD6CD" }}>Hospitality</option>
                                            <option value="styling" style={{ background: "#DFD6CD" }}>Styling & Decoration</option>
                                            <option value="other" style={{ background: "#DFD6CD" }}>Other</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col justify-between border-b border-[#9A8E84]/35 py-6">
                                        <label
                                            className="block uppercase text-[#6A5A49]/65"
                                            style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.25em", fontFamily: "var(--font-sans)" }}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            placeholder="Tell us about your project..."
                                            className="w-full resize-none bg-transparent py-3 transition-colors focus:outline-none"
                                            style={{
                                                color: "#6A5A49",
                                                fontSize: "var(--text-md)",
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="mt-10 inline-flex items-center gap-3 px-10 py-4 font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                                        style={{
                                            background: "#B08E68",
                                            color: "#6A5A49",
                                            fontSize: "var(--text-sm)",
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Send Inquiry
                                        <span>→</span>
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
