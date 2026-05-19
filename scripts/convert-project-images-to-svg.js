const fs = require("fs/promises");
const path = require("path");
const { ImageTracerNodejs } = require("@image-tracer-ts/nodejs");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function listImageFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) return listImageFiles(fullPath);
      return IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    })
  );

  return files.flat();
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const projectsDir = path.resolve(process.cwd(), "public", "projects");
  const force = process.argv.includes("--force");
  const files = await listImageFiles(projectsDir);

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const imagePath of files) {
    const svgPath = imagePath.replace(/\.(jpg|jpeg|png|webp)$/i, ".svg");
    if (!force && (await fileExists(svgPath))) {
      skipped += 1;
      continue;
    }

    try {
      await ImageTracerNodejs.fromFileName(imagePath, {
        out: svgPath,
        output: "svg",
        preset: "posterized2",
        numberOfColors: 4,
        minShapeOutline: 40,
        lineFilter: true,
        decimalPlaces: 1,
        blurRadius: 3,
        strokeWidth: 0,
      });
      converted += 1;
      console.log(`converted: ${path.relative(process.cwd(), svgPath)}`);
    } catch (error) {
      failed += 1;
      console.error(`failed: ${path.relative(process.cwd(), imagePath)}\n`, error);
    }
  }

  console.log(`done: converted=${converted} skipped=${skipped} failed=${failed}`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("fatal:", error);
  process.exit(1);
});
