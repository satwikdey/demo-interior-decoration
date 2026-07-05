import { NextResponse } from "next/server";
import { getCollaborationBySlug } from "@/lib/data-store";

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> }
) {
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
