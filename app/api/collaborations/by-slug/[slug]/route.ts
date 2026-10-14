import { livePreviewRead } from "@/lib/live-preview-read";
import { NextResponse } from "next/server";
import { getCollaborationBySlug } from "@/lib/data-store";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const liveResponse = await livePreviewRead(request);
  if (liveResponse) return liveResponse;
  try {
    const params = await props.params;
    const collaboration = await getCollaborationBySlug(params.slug);

    if (!collaboration) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    return NextResponse.json(collaboration);
  } catch {
    return NextResponse.json({ error: "Failed to fetch collaboration" }, { status: 500 });
  }
}
