import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";

const workspace = process.argv[2];
if (!workspace) throw new Error("Pass the absolute path of the original checkout.");
const liveOrigin = process.env.V2_LIVE_READ_ORIGIN || "https://demointeriordecoration.netlify.app";
const child = spawn(process.execPath, [path.join(workspace, "node_modules/next/dist/bin/next"), "start", "-p", "3004"], {
  cwd: workspace, stdio: "inherit", windowsHide: true,
});

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost:3001").pathname;
  if (request.method === "GET" && /^\/api\/(projects|collaborations)(\/by-slug\/[^/]+)?$/.test(pathname)) {
    try {
      const upstream = await fetch(new URL(pathname, liveOrigin), { signal: AbortSignal.timeout(10_000), headers: { Accept: "application/json" } });
      response.writeHead(upstream.status, { "content-type": upstream.headers.get("content-type") || "application/json", "cache-control": "no-store" });
      response.end(await upstream.text());
    } catch {
      response.writeHead(502, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: "Live preview data unavailable" }));
    }
    return;
  }
  const forwarded = http.request({ hostname: "127.0.0.1", port: 3004, path: request.url, method: request.method, headers: request.headers }, upstream => {
    response.writeHead(upstream.statusCode, upstream.headers);
    upstream.pipe(response);
  });
  forwarded.on("error", () => { response.writeHead(503); response.end("Original preview is starting. Refresh shortly."); });
  request.pipe(forwarded);
});
server.listen(3001, () => console.log("Original comparison preview: http://localhost:3001 (live public reads; source unchanged)"));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => { server.close(); child.kill(); process.exit(); });
child.on("exit", code => { server.close(); process.exit(code ?? 0); });
