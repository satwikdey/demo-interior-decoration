import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  deleteCollaboration,
  getCollaborationById,
  updateCollaboration,
} from "@/lib/data-store";

interface CollaborationPayload {
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

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const collaboration = await getCollaborationById(params.id);

    if (!collaboration) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    return NextResponse.json(collaboration);
  } catch {
    return NextResponse.json({ error: "Failed to fetch collaboration" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const body = (await request.json()) as Partial<CollaborationPayload>;
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

    const updatedCollaboration = await updateCollaboration(params.id, {
      name,
      category,
      description,
      fullDescription,
      image,
      slug,
      gallery,
    });

    if (!updatedCollaboration) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCollaboration);
  } catch (error) {
    const updateError = error as { code?: string; message?: string };
    console.error("Update collaboration error:", error);
    if (updateError.code === "SLUG_EXISTS") {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a unique URL slug." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update collaboration",
        details: updateError.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const deleted = await deleteCollaboration(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Collaboration deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete collaboration" }, { status: 500 });
  }
}
