import { livePreviewRead } from "@/lib/live-preview-read";
import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/data-store";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const liveResponse = await livePreviewRead(request);
  if (liveResponse) return liveResponse;
  try {
    const params = await props.params;
    const project = await getProjectBySlug(params.slug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
