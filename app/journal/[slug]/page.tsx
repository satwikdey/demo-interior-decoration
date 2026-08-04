import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalArticleBySlug, getJournalArticles } from "@/lib/journal-data";

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
    <main className="bg-[#DFD6CD] pt-28 text-[#6A5A49]">
      <article className="mx-auto max-w-[58rem] px-7 pb-24 pt-12 md:px-12 lg:px-0">
        <Link
          href="/journal"
          className="mb-10 inline-block text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-[#9A8E84]"
        >
          Interior Study
        </Link>

        <header className="mb-12 max-w-[45rem]">
          <h1 className="font-serif text-4xl font-medium leading-[1.02] tracking-[0.01em] text-[#6A5A49] md:text-5xl lg:text-6xl">
            {article.title}
          </h1>
        </header>

        <section className="max-w-[45rem] space-y-5 border-b border-[#9A8E84]/40 pb-11">
          {intro.map((paragraph) => (
            <p key={paragraph} className="font-sans text-[0.78rem] leading-relaxed text-[#6A5A49]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="max-w-[45rem]">
          {sections.map((section, index) => {
            const headingOnly = !section.heading && isStandaloneHeading(section.body);

            return (
              <div key={`${section.heading ?? section.body}-${index}`} className="border-b border-[#9A8E84]/40 py-7">
                {section.heading || headingOnly ? (
                  <h2 className="font-serif text-xl font-medium leading-tight text-[#9A8E84] md:text-2xl">
                    {section.heading ?? section.body}
                  </h2>
                ) : null}

                {!headingOnly && section.body ? (
                  <p
                    className={`font-sans text-[0.76rem] leading-relaxed text-[#6A5A49] ${
                      section.heading ? "mt-3" : ""
                    }`}
                  >
                    {section.body}
                  </p>
                ) : null}
              </div>
            );
          })}
        </section>

        <div className="max-w-[45rem] pt-10">
          <Link
            href="/journal"
            className="inline-block border-b border-[#9A8E84] pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6A5A49]"
          >
            Back to Journal
          </Link>
        </div>
      </article>
    </main>
  );
}
