import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { join } from "path";
import { getDataBackendMode, shouldFallbackFromFirebase } from "@/lib/backend-mode";
import { getFirebaseStorageBucket } from "@/lib/firebase-admin";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function buildFirebaseUrl(bucketName: string, objectPath: string, token: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}

async function uploadToFirebaseStorage(file: File): Promise<string> {
  const bucket = getFirebaseStorageBucket();
  const token = randomUUID();
  const filename = `${Date.now()}-${randomUUID()}-${sanitizeFileName(file.name)}`;
  const objectPath = `uploads/${filename}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await bucket.file(objectPath).save(buffer, {
    resumable: false,
    metadata: {
      contentType: file.type || "application/octet-stream",
      cacheControl: "public, max-age=31536000, immutable",
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return buildFirebaseUrl(bucket.name, objectPath, token);
}

async function uploadToLocalStorage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}-${sanitizeFileName(file.name)}`;
  const uploadDir = join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

export async function uploadProjectImage(file: File): Promise<{ url: string; storage: "firebase" | "local" }> {
  const mode = getDataBackendMode();

  if (mode === "sqlite") {
    const url = await uploadToLocalStorage(file);
    return { url, storage: "local" };
  }

  try {
    const url = await uploadToFirebaseStorage(file);
    return { url, storage: "firebase" };
  } catch (error) {
    if (mode === "firestore" || !shouldFallbackFromFirebase(error)) {
      throw error;
    }

    console.warn("[upload-storage] Falling back to local uploads:", error);
    const url = await uploadToLocalStorage(file);
    return { url, storage: "local" };
  }
}
