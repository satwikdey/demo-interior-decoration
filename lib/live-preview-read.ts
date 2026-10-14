/** Optional local preview bridge. Public GET data only; no credentials or writes. */
export async function livePreviewRead(request: Request): Promise<Response | null> {
  const origin = process.env.V2_LIVE_READ_ORIGIN;
  if (!origin || request.method !== "GET") return null;
  const current = new URL(request.url);
  const upstream = new URL(origin);
  if (upstream.protocol !== "https:" || upstream.origin === current.origin) return null;
  if (!/^\/api\/(projects|collaborations)(\/by-slug\/[^/]+)?$/.test(current.pathname)) return null;

  try {
    const response = await fetch(new URL(current.pathname, upstream.origin), {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: "application/json" },
    });
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("The live read endpoint did not return JSON.");
    }
    return new Response(await response.text(), {
      status: response.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Mobile-V2-Live-Read": "true" },
    });
  } catch {
    return Response.json({ error: "Live preview data is temporarily unavailable" }, { status: 502 });
  }
}
