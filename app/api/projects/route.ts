import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createProject, listProjects } from "@/lib/data-store";

interface ContentBlockInput {
  type: "IMAGE" | "TEXT";
  content: string;
}

interface CreateProjectPayload {
  title: string;
  location: string;
  category: string;
  mainImage: string;
  slug: string;
  description: string;
  content?: ContentBlockInput[];
}

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<CreateProjectPayload>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const mainImage = typeof body.mainImage === "string" ? body.mainImage.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const contentBlocks = Array.isArray(body.content) ? body.content : [];

    if (!title || !location || !category || !mainImage || !slug || !description) {
      return NextResponse.json({ error: "Missing required project fields" }, { status: 400 });
    }

    const project = await createProject({
      title,
      location,
      category,
      mainImage,
      slug,
      description,
      content: contentBlocks.map((block) => ({
        type: block.type,
        content: block.content,
      })),
    });

    return NextResponse.json(project);
  } catch (error) {
    const createError = error as {
      code?: string;
      message?: string;
    };

    console.error("Create error:", error);
    if (createError.code === "SLUG_EXISTS") {
      return NextResponse.json({ error: "Slug already exists. Please choose a unique URL slug." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project", details: createError.message || "Unknown error" }, { status: 500 });
  }
}
