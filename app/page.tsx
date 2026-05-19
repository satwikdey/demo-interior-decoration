import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans">
      {/* Top Section / Hero */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center">
        {/* 3-image collage background */}
        <div className="absolute inset-0 z-0 grid grid-cols-1 grid-rows-[1fr_0.65fr] gap-2 bg-neutral-950 p-2 md:gap-3 md:p-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                <div className="relative overflow-hidden">
                    <Image src="/projects/living-luxe-1.jpg" alt="Modern kitchen interior" fill className="object-cover" priority quality={90} />
                </div>
                <div className="relative overflow-hidden">
                    <Image src="/projects/living-urban-1.jpg" alt="Refined living room interior" fill className="object-cover" priority quality={90} />
                </div>
            </div>
            <div className="relative overflow-hidden">
                <Image src="/projects/nahata-living.jpg" alt="Elegant interior detailing" fill className="object-cover" priority quality={90} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-black/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-16 flex flex-col justify-between h-full py-32">
            <div className="mt-auto md:mb-12">
                <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-wide max-w-4xl">
                    CRAFTING<br/>
                    EXPERIENCES<br/>
                    SINCE 1996
                </h1>
            </div>
            
            <div className="flex justify-end mt-12 md:mt-0 md:absolute md:bottom-24 md:right-16">
                <div className="text-white/90 text-right max-w-xs space-y-6">
                    <p className="text-sm font-light leading-relaxed">
                        Should guide your new experience, our step at a time, toward your dreamspace living.
                    </p>
                    <button className="bg-white/90 text-neutral-900 px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
                        Get My Feeling
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Bottom Section / Grid */}
      <section className="bg-[#f4f3f0] py-16 md:py-32">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column */}
            <div className="flex flex-col justify-between space-y-16">
                <div className="space-y-12">
                    <h2 className="text-sm tracking-widest uppercase text-neutral-500 flex items-center gap-4">
                        AT <span className="text-4xl font-serif text-neutral-900 normal-case tracking-normal">design one <span className="text-xs uppercase tracking-widest text-neutral-500 ml-1">STUDIO</span></span>
                    </h2>
                    <p className="text-neutral-600 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                        We believe interior design is more than just aesthetics — it's about creating spaces that inspire, function beautifully, and reflect the people who live or work in them.
                    </p>
                </div>

                <div className="relative h-[300px] md:h-[400px] w-full max-w-lg">
                    <Image src="/projects/exhibition-1.jpg" alt="Decor items" fill className="object-cover" />
                </div>
            </div>

            {/* Right Column / Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-300 border border-neutral-300">
                {/* Stats 1 -> Portfolio */}
                <Link href="/projects" className="bg-[#f4f3f0] p-8 md:p-12 flex flex-col justify-between h-[250px] group hover:bg-white transition-colors">
                    <div>
                        <p className="text-sm text-neutral-600 leading-relaxed font-light mb-4">View our extensive portfolio of meticulously crafted residential and commercial spaces.</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">Explore Portfolio →</span>
                    </div>
                    <span className="text-6xl font-serif text-neutral-900 text-right block mt-auto group-hover:scale-105 transition-transform origin-right">4</span>
                </Link>
                {/* Stats 2 -> About Us */}
                <Link href="/about" className="bg-[#f4f3f0] p-8 md:p-12 flex flex-col justify-between h-[250px] group hover:bg-white transition-colors">
                    <div>
                        <p className="text-sm text-neutral-600 leading-relaxed font-light mb-4">Learn more about our studio and the visionaries who know their craft inside and out.</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">About Us →</span>
                    </div>
                    <span className="text-6xl font-serif text-neutral-900 text-right block mt-auto group-hover:scale-105 transition-transform origin-right">20</span>
                </Link>
                {/* Stats 3 -> Collaboration */}
                <Link href="/collaborations" className="bg-[#f4f3f0] p-8 md:p-12 flex flex-col justify-between h-[250px] md:col-span-1 group hover:bg-white transition-colors">
                    <div>
                        <p className="text-sm text-neutral-600 leading-relaxed font-light mb-4">Discover our manufacturing vertical and collaborative projects that redefine luxury.</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">Collaborations →</span>
                    </div>
                    <span className="text-6xl font-serif text-neutral-900 text-right block mt-auto group-hover:scale-105 transition-transform origin-right">62</span>
                </Link>
                {/* Dark Block -> Contact Us */}
                <Link href="/contact" className="bg-[#3a2f26] text-[#e0cfbb] p-8 md:p-12 flex flex-col justify-between h-[250px] md:col-span-1 group hover:bg-[#2c231c] transition-colors">
                    <p className="text-lg md:text-xl font-serif leading-relaxed">
                        Design isn't just what you see — it's how a space feels with you. Let's create together.
                    </p>
                    <span className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-white transition-colors mt-auto">
                        Contact Us <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
