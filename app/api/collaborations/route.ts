import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCollaboration, listCollaborations } from "@/lib/data-store";

interface CreateCollaborationPayload {
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  slug: string;
  gallery?: string[];
}

function normalizeGallery(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

export async function GET() {
  try {
    const collaborations = await listCollaborations();
    return NextResponse.json(collaborations);
  } catch (error) {
    console.error("Fetch collaborations error:", error);
    return NextResponse.json({ error: "Failed to fetch collaborations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<CreateCollaborationPayload>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const fullDescription =
      typeof body.fullDescription === "string" ? body.fullDescription.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const gallery = normalizeGallery(body.gallery);

    if (!name || !category || !description || !fullDescription || !image || !slug) {
      return NextResponse.json(
        { error: "Missing required collaboration fields" },
        { status: 400 }
      );
    }

    const collaboration = await createCollaboration({
      name,
      category,
      description,
      fullDescription,
      image,
      slug,
      gallery,
    });

    return NextResponse.json(collaboration);
  } catch (error) {
    const createError = error as {
      code?: string;
      message?: string;
    };

    console.error("Create collaboration error:", error);
    if (createError.code === "SLUG_EXISTS") {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a unique URL slug." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create collaboration",
        details: createError.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
