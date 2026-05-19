const fs = require("fs/promises");
const path = require("path");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const RASTER_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function getDb() {
  if (getApps().length === 0) {
    const projectId = getEnv("FIREBASE_PROJECT_ID") || getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
    const clientEmail = getEnv("FIREBASE_CLIENT_EMAIL");
    const privateKey = getEnv("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "Missing Firebase credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
      );
    }

    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  return getFirestore();
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function toRasterPathIfAvailable(publicPath) {
  if (typeof publicPath !== "string") return publicPath;
  const match = publicPath.match(/^\/projects\/(.+)\.svg$/i);
  if (!match) return publicPath;

  const baseName = match[1];
  for (const ext of RASTER_EXTENSIONS) {
    const diskPath = path.resolve(process.cwd(), "public", "projects", `${baseName}${ext}`);
    if (await fileExists(diskPath)) {
      return `/projects/${baseName}${ext}`;
    }
  }

  return publicPath;
}

async function main() {
  const db = getDb();
  const projectsSnap = await db.collection("projects").get();
  const batch = db.batch();

  let updatedProjects = 0;
  for (const doc of projectsSnap.docs) {
    const data = doc.data();
    const nextMainImage = await toRasterPathIfAvailable(data.mainImage);
    const contentBlocks = Array.isArray(data.content) ? data.content : [];

    let changed = nextMainImage !== data.mainImage;
    const nextContent = [];

    for (const block of contentBlocks) {
      if (!block || typeof block !== "object") {
        nextContent.push(block);
        continue;
      }

      if (block.type === "IMAGE") {
        const nextContentPath = await toRasterPathIfAvailable(block.content);
        if (nextContentPath !== block.content) changed = true;
        nextContent.push({ ...block, content: nextContentPath });
      } else {
        nextContent.push(block);
      }
    }

    if (changed) {
      updatedProjects += 1;
      batch.update(doc.ref, {
        mainImage: nextMainImage,
        content: nextContent,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  if (updatedProjects > 0) {
    await batch.commit();
  }

  console.log(`done: updated_projects=${updatedProjects}`);
}

main().catch((error) => {
  console.error("fatal:", error);
  process.exit(1);
});
