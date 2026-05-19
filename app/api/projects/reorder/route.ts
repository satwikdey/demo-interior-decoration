import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { countExistingProjectsByIds, reorderProjects } from "@/lib/firestore-data";

interface ReorderPayload {
  projectIds: string[];
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<ReorderPayload>;
    const projectIds = body.projectIds;

    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return NextResponse.json({ error: "projectIds must be a non-empty string array" }, { status: 400 });
    }

    if (!projectIds.every((id) => typeof id === "string" && id.trim().length > 0)) {
      return NextResponse.json({ error: "projectIds must contain valid ids" }, { status: 400 });
    }

    if (new Set(projectIds).size !== projectIds.length) {
      return NextResponse.json({ error: "Duplicate project ids are not allowed" }, { status: 400 });
    }

    const existingProjectCount = await countExistingProjectsByIds(projectIds);
    if (existingProjectCount !== projectIds.length) {
      return NextResponse.json({ error: "One or more projects do not exist" }, { status: 400 });
    }

    await reorderProjects(projectIds);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder error:", error);
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}
