import { Container } from "@/components/Container";

export default function Contact() {
    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl text-center mb-6">Get in Touch</h1>
                    <p className="text-center text-neutral-500 font-light text-lg mb-16 max-w-xl mx-auto">
                        We are currently accepting new projects for 2026. Please fill out the form below
                        or email us directly to discuss your vision.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Studio</h3>
                                <p className="text-neutral-600 font-light">123 Design Avenue<br />London, UK SW1A 1AA</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Email</h3>
                                <p className="text-neutral-600 font-light">hello@designstudio.com</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Phone</h3>
                                <p className="text-neutral-600 font-light">+44 (0) 20 7123 4567</p>
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest">First Name</label>
                                    <input type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest">Last Name</label>
                                    <input type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-widest">Email</label>
                                <input type="email" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-widest">Message</label>
                                <textarea rows={4} className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                            </div>
                            <button className="px-8 py-3 bg-primary text-white text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors uppercase w-full md:w-auto">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </main>
    );
}
