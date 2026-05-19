const fs = require("fs/promises");
const path = require("path");

const SOURCE_DIRS = ["app", "components", "lib"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);

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

async function updateFile(filePath) {
  const original = await fs.readFile(filePath, "utf8");
  const regex = /\/projects\/([^"'`\s)]+?)\.(jpg|jpeg|png|webp)/gi;

  let changed = false;
  let updated = original;
  const matches = [...original.matchAll(regex)];

  for (const match of matches) {
    const baseName = match[1];
    const currentPath = match[0];
    const svgPublicPath = `/projects/${baseName}.svg`;
    const svgDiskPath = path.resolve(process.cwd(), "public", "projects", `${baseName}.svg`);

    if (await fileExists(svgDiskPath) && currentPath !== svgPublicPath) {
      updated = updated.split(currentPath).join(svgPublicPath);
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
