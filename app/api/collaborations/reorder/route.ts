import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  countExistingCollaborationsByIds,
  reorderCollaborations,
} from "@/lib/data-store";

interface ReorderPayload {
  collaborationIds: string[];
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<ReorderPayload>;
    const collaborationIds = body.collaborationIds;

    if (!Array.isArray(collaborationIds) || collaborationIds.length === 0) {
      return NextResponse.json(
        { error: "collaborationIds must be a non-empty string array" },
        { status: 400 }
      );
    }

    if (!collaborationIds.every((id) => typeof id === "string" && id.trim().length > 0)) {
      return NextResponse.json(
        { error: "collaborationIds must contain valid ids" },
        { status: 400 }
      );
    }

    if (new Set(collaborationIds).size !== collaborationIds.length) {
      return NextResponse.json(
        { error: "Duplicate collaboration ids are not allowed" },
        { status: 400 }
      );
    }

    const existingCollaborationCount = await countExistingCollaborationsByIds(collaborationIds);
    if (existingCollaborationCount !== collaborationIds.length) {
      return NextResponse.json(
        { error: "One or more collaborations do not exist" },
        { status: 400 }
      );
    }

    await reorderCollaborations(collaborationIds);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder collaborations error:", error);
    return NextResponse.json({ error: "Failed to reorder collaborations" }, { status: 500 });
  }
}
