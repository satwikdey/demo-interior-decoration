import Link from "next/link";
import Image from "next/image";
import { getJournalArticles } from "@/lib/journal-data";

export default function Journal() {
  const articles = getJournalArticles();

  return (
    <main className="min-h-screen bg-[#DFD6CD] text-[#6A5A49]">
      <section className="border-b border-[#DFD6CD]/15 bg-[#6A5A49] px-6 pb-10 pt-32 text-[#DFD6CD] md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-7">
          <h1 className="font-serif text-5xl font-light tracking-[0.04em] text-[#DFD6CD] md:text-7xl">
            Journal
          </h1>
          <nav aria-label="Journal categories" className="flex flex-wrap justify-center gap-7">
            {["All", "Client Guide", "Process", "Design Insight", "Craft", "Hospitality"].map((item, index) => (
              <span
                key={item}
                className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#DFD6CD]/75"
              >
                {index === 0 ? "* " : ""}
                {item}
              </span>
            ))}
          </nav>
        </div>
      </section>

      <section className="grid w-full grid-cols-1 border-l border-[#9A8E84]/40 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            href={`/journal/${article.slug}`}
            key={article.slug}
            aria-label={`Read ${article.title}`}
            className="group relative block aspect-[4/5] overflow-hidden border-b border-r border-[#9A8E84]/40 bg-[#372E24] outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#B08E68]"
          >
            <Image
              src={article.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
            />

            <div className="absolute inset-0 flex items-end bg-[#372E24]/65 p-7 opacity-100 transition-opacity duration-500 md:p-9 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <h2 className="max-w-md font-serif text-3xl font-light leading-[1.08] text-[#DFD6CD] md:text-4xl">
                {article.title}
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
