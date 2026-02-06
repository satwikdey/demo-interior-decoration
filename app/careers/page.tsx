import { Container } from "@/components/Container";

export default function Careers() {
    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="font-serif text-5xl mb-6">Join Our Team</h1>
                    <p className="text-neutral-500 font-light text-lg">
                        We are always looking for exceptional talent to join our studios in London and New York.
                        If you share our passion for bespoke design and craftsmanship, we would love to hear from you.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="border-t border-b border-neutral-200 py-8 flex flex-col md:flex-row justify-between items-baseline">
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Senior Interior Designer</h3>
                            <p className="text-neutral-500 font-light">London, UK &nbsp;|&nbsp; Full Time</p>
                        </div>
                        <button className="mt-4 md:mt-0 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors">Apply Now</button>
                    </div>

                    <div className="border-b border-neutral-200 py-8 flex flex-col md:flex-row justify-between items-baseline">
                        <div>
                            <h3 className="font-serif text-2xl mb-2">FF&E Designer</h3>
                            <p className="text-neutral-500 font-light">New York, USA &nbsp;|&nbsp; Full Time</p>
                        </div>
                        <button className="mt-4 md:mt-0 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors">Apply Now</button>
                    </div>

                    <div className="border-b border-neutral-200 py-8 flex flex-col md:flex-row justify-between items-baseline">
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Architectural Technician</h3>
                            <p className="text-neutral-500 font-light">London, UK &nbsp;|&nbsp; Contract</p>
                        </div>
                        <button className="mt-4 md:mt-0 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors">Apply Now</button>
                    </div>
                </div>

                <div className="text-center mt-16 text-neutral-500 font-light text-sm">
                    <p>Please send CV and Portfolio to <a href="mailto:careers@designstudio.com" className="underline hover:text-primary">careers@designstudio.com</a></p>
                </div>
            </Container>
        </main>
    );
}
