import Link from "next/link";
import Image from "next/image";
import { getJournalArticles } from "@/lib/journal-data";

export default function Journal() {
  const articles = getJournalArticles();

  return (
    <main className="min-h-screen bg-[#DFD6CD] text-[#2A211B]">
      <section className="bg-[#1E1712] px-6 pb-12 pt-36 text-[#FAF7F2] md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-7">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#A67B48]">
            Articles & Case Studies
          </p>
          <h1 className="font-serif text-5xl font-light tracking-[0.04em] text-[#FAF7F2] md:text-7xl text-scrim-dark">
            Journal
          </h1>
          <nav aria-label="Journal categories" className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2">
            {["All", "Client Guide", "Process", "Design Insight", "Craft", "Hospitality"].map((item, index) => (
              <span
                key={item}
                className={`text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors ${
                  index === 0
                    ? "bg-[#A67B48] border-[#A67B48] text-[#FAF7F2]"
                    : "border-[#FAF7F2]/20 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/40"
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
      </section>

      <section className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 bg-[#DFD6CD] p-2">
        {articles.map((article) => (
          <Link
            href={`/journal/${article.slug}`}
            key={article.slug}
            aria-label={`Read ${article.title}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#1E1712] shadow-sm hover:shadow-2xl transition-all duration-500 outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#A67B48]"
          >
            <Image
              src={article.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Permanent bottom gradient overlay so title is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712]/95 via-[#1E1712]/40 to-transparent flex flex-col justify-end p-7 md:p-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A67B48] font-bold mb-2">
                Design Editorial
              </span>
              <h2 className="max-w-md font-serif text-2xl md:text-3xl font-normal leading-tight text-[#FAF7F2] text-scrim-dark group-hover:text-[#D4A373] transition-colors">
                {article.title}
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
