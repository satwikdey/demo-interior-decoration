import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { deleteProject, getProjectById, getProjectBySlug, updateProject } from "@/lib/firestore-data";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const project = await getProjectById(params.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// Special route for slug-based fetching (public)
export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const project = await getProjectBySlug(params.id); // id is slug in this case

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const mainImage = typeof body.mainImage === "string" ? body.mainImage.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const content = Array.isArray(body.content) ? body.content : [];

    if (!title || !location || !category || !mainImage || !slug || !description) {
      return NextResponse.json({ error: "Missing required project fields" }, { status: 400 });
    }

    // Update project metadata and replace content blocks
    const updatedProject = await updateProject(params.id, {
      title,
      location,
      category,
      mainImage,
      slug,
      description,
      content: content.map((block: { type: "IMAGE" | "TEXT"; content: string }) => ({
        type: block.type,
        content: block.content,
      })),
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error: any) {
    console.error("Update error:", error);
    if (error.code === "SLUG_EXISTS") {
      return NextResponse.json({ error: "Slug already exists. Please choose a unique URL slug." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update project", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const deleted = await deleteProject(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
