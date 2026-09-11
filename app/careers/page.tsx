import { Container } from "@/components/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Careers() {
    return (
        <main className="pt-36 pb-28 bg-[#DFD6CD] min-h-screen text-[#2A211B]">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#A67B48] mb-4">
                        Join Design One
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl mb-6 font-normal text-[#2A211B]">Join Our Team</h1>
                    <p className="text-[#4A3E34] font-normal text-lg md:text-xl leading-relaxed">
                        We are always looking for exceptional talent to join our studio.
                        If you share our passion for bespoke design, material intelligence, and craftsmanship, we would love to hear from you.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {[
                        {
                            title: "Senior Interior Designer",
                            location: "Mumbai / Kolkata",
                            type: "Full Time",
                        },
                        {
                            title: "FF&E & Styling Specialist",
                            location: "Mumbai",
                            type: "Full Time",
                        },
                        {
                            title: "Architectural Technician & Detailer",
                            location: "Kolkata",
                            type: "Full Time",
                        },
                    ].map((job) => (
                        <div
                            key={job.title}
                            className="bg-[#FAF7F2] p-8 md:p-10 rounded-2xl border border-[#5C4F44]/25 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:shadow-md transition-shadow"
                        >
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#2A211B] mb-2">{job.title}</h3>
                                <p className="text-[#5C4F44] font-medium text-sm">{job.location} &nbsp;•&nbsp; {job.type}</p>
                            </div>
                            <Link
                                href="mailto:careers@designone.studio"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A211B] group-hover:bg-[#A67B48] text-[#FAF7F2] rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                            >
                                Apply Now <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20 text-[#4A3E34] font-normal text-base">
                    <p>Please send your CV and portfolio to <a href="mailto:careers@designone.studio" className="underline font-semibold text-[#2A211B] hover:text-[#A67B48] transition-colors">careers@designone.studio</a></p>
                </div>
            </Container>
        </main>
    );
}
