import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalArticleBySlug, getJournalArticles } from "@/lib/journal-data";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ArticleSection = {
  heading?: string;
  body: string;
};

const headingStarts = [
  "One ",
  "Many ",
  "Modern ",
  "Materials ",
  "Luxury ",
  "Homeowners ",
  "Attempting ",
  "Lighting ",
  "Interior ",
  "Every ",
  "The ",
  "Planning ",
  "Without ",
  "Selecting ",
  "A ",
  "In ",
  "For ",
  "When ",
  "If ",
  "This ",
  "Clients ",
  "Guests ",
  "Hotels ",
  "Restaurants ",
  "Boutique ",
  "Clear ",
  "Factory ",
  "Low-quality ",
  "Clean ",
  "Cost ",
  "Durability ",
  "Choosing ",
  "Finishing ",
  "Design ",
  "Wastage ",
];

function formatArticleSection(paragraph: string): ArticleSection {
  const numbered = paragraph.match(/^(\d+\.\s+)/);

  if (!numbered) {
    return { body: paragraph };
  }

  const startIndex = numbered[0].length;
  const rest = paragraph.slice(startIndex);
  const splitIndex = headingStarts
    .map((start) => rest.indexOf(` ${start}`))
    .filter((index) => index > 12)
    .sort((a, b) => a - b)[0];

  if (!splitIndex) {
    return { heading: paragraph, body: "" };
  }

  return {
    heading: `${numbered[0]}${rest.slice(0, splitIndex).trim()}`,
    body: rest.slice(splitIndex).trim(),
  };
}

function isStandaloneHeading(text: string) {
  return text.length < 90 && !/[.!?]/.test(text);
}

export function generateStaticParams() {
  return getJournalArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);

  return {
    title: article ? `${article.title} | DesignOne Journal` : "Journal | DesignOne Studio",
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);

  if (!article) notFound();

  const firstNumberedIndex = article.body.findIndex((paragraph) => /^\d+\.\s/.test(paragraph));
  const introEnd = firstNumberedIndex === -1 ? Math.min(article.body.length, 3) : firstNumberedIndex;
  const intro = article.body.slice(0, introEnd);
  const sections = article.body.slice(introEnd).map(formatArticleSection);

  return (
    <main className="bg-[#DFD6CD] pt-28 text-[#2A211B] min-h-screen">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-12 md:px-12">
        <Link
          href="/journal"
          className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#5C4F44] hover:text-[#2A211B] mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Journal
        </Link>

        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#A67B48] mb-4">
            Interior Study
          </p>
          <h1 className="font-serif text-4xl font-normal leading-tight text-[#2A211B] md:text-5xl lg:text-6xl">
            {article.title}
          </h1>
        </header>

        <section className="space-y-6 border-b border-[#5C4F44]/25 pb-12">
          {intro.map((paragraph) => (
            <p key={paragraph} className="font-sans text-lg md:text-xl leading-relaxed text-[#2A211B] font-normal">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          {sections.map((section, index) => {
            const headingOnly = !section.heading && isStandaloneHeading(section.body);

            return (
              <div key={`${section.heading ?? section.body}-${index}`} className="border-b border-[#5C4F44]/20 py-8">
                {section.heading || headingOnly ? (
                  <h2 className="font-serif text-2xl md:text-3xl font-medium leading-tight text-[#2A211B]">
                    {section.heading ?? section.body}
                  </h2>
                ) : null}

                {!headingOnly && section.body ? (
                  <p
                    className={`font-sans text-base md:text-lg leading-relaxed text-[#4A3E34] font-normal ${
                      section.heading ? "mt-4" : ""
                    }`}
                  >
                    {section.body}
                  </p>
                ) : null}
              </div>
            );
          })}
        </section>

        <div className="pt-14">
          <Link
            href="/journal"
            className="inline-block px-8 py-3.5 bg-[#2A211B] hover:bg-[#A67B48] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-colors shadow-md"
          >
            Back to Journal
          </Link>
        </div>
      </article>
    </main>
  );
}
