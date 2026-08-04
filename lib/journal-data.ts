import fs from "fs";
import path from "path";

export type JournalArticle = {
  articleNumber: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  detailImages: string[];
  color: string;
  body: string[];
};

const titlesByNumber: Record<number, string> = {
  1: "10 Interior Design Mistakes Kolkata Homeowners Make Before Moving Into a New Flat",
  2: "Luxury Interior Design Cost in Kolkata: Complete 2026 Guide for 2BHK, 3BHK & Villas",
  3: "Scandinavian Luxury Interiors in India: Why Darker Minimalism Is Redefining Modern Homes",
  4: "Turnkey Interior Design Explained for Homeowners in Kolkata",
  5: "Why Finishing Defines Luxury Interiors",
  6: "Modular Kitchens vs Bespoke Kitchens: What Actually Lasts?",
  7: "How to Choose the Right Interior Designer in Kolkata",
  8: "Office Interior Design That Improves Productivity and Brand Identity",
  9: "Designing Boutique Hotels and Hospitality Spaces That Guests Remember",
  10: "How We Minimise Material Wastage Without Compromising Luxury",
};

const presentationByNumber: Record<
  number,
  { category: string; color: string; image: string; detailImages: string[] }
> = {
  1: {
    category: "Client Guide",
    color: "#6A5A49",
      image: "/journal/covers/cover-1.png",
    detailImages: ["/projects/living-luxe-4.jpg", "/projects/living-luxe-11.jpg", "/projects/urbana-living.jpg"],
  },
  2: {
    category: "Cost Guide",
    color: "#9A8E84",
      image: "/journal/covers/cover-2.png",
    detailImages: ["/projects/bedroom-luxe.jpg", "/projects/living-luxe-5.jpg", "/projects/nahata-living.jpg"],
  },
  3: {
    category: "Design Insight",
    color: "#6A5A49",
      image: "/journal/covers/cover-3.png",
    detailImages: ["/projects/bedroom-modern-1.jpg", "/projects/bedroom-modern-8.jpg", "/projects/living-urban-8.jpg"],
  },
  4: {
    category: "Process",
    color: "#DFD6CD",
      image: "/journal/covers/cover-4.png",
    detailImages: ["/raw-canvas/moodboard.png", "/raw-canvas/action_1.png", "/raw-canvas/completed_1.png"],
  },
  5: {
    category: "Craft",
    color: "#9A8E84",
      image: "/journal/covers/cover-5.png",
    detailImages: ["/raw-canvas/cat_custom.png", "/projects/living-luxe-13.jpg", "/raw-canvas/completed_2.png"],
  },
  6: {
    category: "Kitchen Design",
    color: "#6A5A49",
      image: "/journal/covers/cover-6.png",
    detailImages: ["/raw-canvas/cat_kitchen.png", "/projects/urbana-18.jpg", "/projects/pappu-living.jpg"],
  },
  7: {
    category: "Client Guide",
    color: "#6A5A49",
      image: "/journal/covers/cover-7.png",
    detailImages: ["/projects/about-team-new.jpeg", "/projects/living-concept-1.jpeg", "/projects/urbana-7.jpg"],
  },
  8: {
    category: "Workplace",
    color: "#9A8E84",
      image: "/journal/covers/cover-8.png",
    detailImages: ["/projects/exhibition-1.jpg", "/projects/exhibition-2.jpg", "/raw-canvas/cat_study.png"],
  },
  9: {
    category: "Hospitality",
    color: "#6A5A49",
      image: "/journal/covers/cover-9.png",
    detailImages: ["/projects/hospitality-3.jpg", "/projects/sinclairs-1.jpg", "/projects/bikaner-3.jpg"],
  },
  10: {
    category: "Sustainability",
    color: "#9A8E84",
      image: "/journal/covers/cover-10.png",
    detailImages: ["/raw-canvas/bg_workshop.png", "/raw-canvas/action_2.png", "/raw-canvas/cat_wardrobes.png"],
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseCsvRows(csv: string) {
  return csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1)
    .map((line) => {
      const unquoted = line.startsWith("\"") && line.endsWith("\"") ? line.slice(1, -1) : line;
      return unquoted.replace(/""/g, "\"").replace(/\s+/g, " ").trim();
    });
}

function articleBody(articleNumber: number, text: string) {
  const title = titlesByNumber[articleNumber];
  return text
    .replace(new RegExp(`^ARTICLE\\s+${articleNumber}\\s+`, "i"), "")
    .replace(title, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?=\s(?:\d+\.|What |Why |How |Where |When |The |Final |Turnkey |Materiality |Lighting |Balancing |Adapting |Durability|Climate |Cost |So Which|Choosing|Execution|Communication|Hidden|Documentation|Flexibility|Long-Term|Factory|Installation|Better|How We))/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 24);
}

export function getJournalArticles(): JournalArticle[] {
  const csvPath = path.join(process.cwd(), "data", "journal-articles.csv");
  const rows = parseCsvRows(fs.readFileSync(csvPath, "utf8"));
  const textsByArticle = new Map<number, string>();
  const order: number[] = [];

  for (const row of rows) {
    const articleMatch = row.match(/^ARTICLE\s+(\d+)\s+/i);

    if (!articleMatch) {
      const existing = textsByArticle.get(1) ?? "";
      textsByArticle.set(1, `${existing} ${row}`.trim());
      continue;
    }

    const articleNumber = Number(articleMatch[1]);
    textsByArticle.set(articleNumber, row);
    order.push(articleNumber);
  }

  return order
    .filter((articleNumber, index, all) => all.indexOf(articleNumber) === index)
    .map((articleNumber) => {
      const title = titlesByNumber[articleNumber];
      const presentation = presentationByNumber[articleNumber];

      return {
        articleNumber,
        title,
        slug: slugify(title),
        category: presentation.category,
        image: presentation.image,
        detailImages: presentation.detailImages,
        color: presentation.color,
        body: articleBody(articleNumber, textsByArticle.get(articleNumber) ?? ""),
      };
    });
}

export function getJournalArticleBySlug(slug: string) {
  return getJournalArticles().find((article) => article.slug === slug);
}
