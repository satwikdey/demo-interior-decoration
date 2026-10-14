import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "playwright";

await fs.mkdir("review/lighthouse", { recursive: true });
const results = [];
// Alternating runs limit bias from changes in host load. Both builds use the
// same browser and Lighthouse mobile simulated Slow 4G / 4x CPU settings.
for (let run = 1; run <= 3; run++) {
  for (const [version, port] of [["baseline", 3001], ["v2", 3002]]) {
    const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--disable-gpu", "--no-first-run"] });
    try {
      const result = await lighthouse(`http://localhost:${port}/`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"], formFactor: "mobile", throttlingMethod: "simulate" });
      const report = result.lhr;
      const liveReads = report.audits["network-requests"].details.items.filter(item => item.url.endsWith("/api/projects"));
      if (!liveReads.some(item => item.statusCode === 200)) throw new Error("Benchmark did not receive a successful live project read.");
      await fs.writeFile(`review/lighthouse/${version}-${run}.json`, JSON.stringify(report));
      const entry = {
        version, run, lcpMs: report.audits["largest-contentful-paint"].numericValue,
        cls: report.audits["cumulative-layout-shift"].numericValue,
        score: report.categories.performance.score,
        transferBytes: report.audits["total-byte-weight"].numericValue,
        settings: report.configSettings,
        liveReads,
        heroRequests: report.audits["network-requests"].details.items.filter(item => item.url.includes("hero-home")),
      };
      results.push(entry);
      console.log(JSON.stringify({ version, run, lcpMs: entry.lcpMs, cls: entry.cls, score: entry.score, transferBytes: entry.transferBytes }));
      await fs.writeFile("review/performance-results.json", JSON.stringify(results, null, 2));
    } finally {
      await chrome.kill();
    }
  }
}
