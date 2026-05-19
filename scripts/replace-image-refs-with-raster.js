const fs = require("fs/promises");
const path = require("path");

const SOURCE_DIRS = ["app", "components", "lib"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);
const RASTER_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function listSourceFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) return listSourceFiles(fullPath);
      return SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
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

async function resolveRasterPublicPath(baseName) {
  for (const ext of RASTER_EXTENSIONS) {
    const diskPath = path.resolve(process.cwd(), "public", "projects", `${baseName}${ext}`);
    if (await fileExists(diskPath)) {
      return `/projects/${baseName}${ext}`;
    }
  }
  return null;
}

async function updateFile(filePath) {
  const original = await fs.readFile(filePath, "utf8");
  const regex = /\/projects\/([^"'`\s)]+?)\.svg/gi;
  const matches = [...original.matchAll(regex)];

  if (matches.length === 0) return false;

  let changed = false;
  let updated = original;

  for (const match of matches) {
    const currentPath = match[0];
    const baseName = match[1];
    const rasterPath = await resolveRasterPublicPath(baseName);
    if (rasterPath && rasterPath !== currentPath) {
      updated = updated.split(currentPath).join(rasterPath);
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(filePath, updated, "utf8");
  }

  return changed;
}

async function main() {
  const sourceFiles = (
    await Promise.all(SOURCE_DIRS.map((dir) => listSourceFiles(path.resolve(process.cwd(), dir))))
  ).flat();

  let changedFiles = 0;
  for (const sourceFile of sourceFiles) {
    const changed = await updateFile(sourceFile);
    if (changed) {
      changedFiles += 1;
      console.log(`updated: ${path.relative(process.cwd(), sourceFile)}`);
    }
  }

  console.log(`done: updated_files=${changedFiles}`);
}

main().catch((error) => {
  console.error("fatal:", error);
  process.exit(1);
});
