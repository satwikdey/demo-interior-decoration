import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { join } from "path";
import { getDataBackendMode, shouldFallbackFromFirebase } from "@/lib/backend-mode";
import { getFirebaseStorageBucket } from "@/lib/firebase-admin";

type UploadStorageBackend = "firebase" | "supabase" | "local";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for Supabase Storage uploads.`);
  }
  return value;
}

function getUploadStorageBackend(): UploadStorageBackend | null {
  const configured = process.env.UPLOAD_STORAGE_BACKEND?.toLowerCase();
  if (!configured) {
    if (
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.SUPABASE_STORAGE_BUCKET
    ) {
      return "supabase";
    }

    return null;
  }

  if (configured === "firebase" || configured === "supabase" || configured === "local") {
    return configured;
  }

  throw new Error("UPLOAD_STORAGE_BACKEND must be firebase, supabase, or local.");
}

function buildFirebaseUrl(bucketName: string, objectPath: string, token: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}

function buildSupabasePublicUrl(supabaseUrl: string, bucketName: string, objectPath: string): string {
  const baseUrl = supabaseUrl.replace(/\/+$/, "");
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  return `${baseUrl}/storage/v1/object/public/${encodeURIComponent(bucketName)}/${encodedPath}`;
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

async function uploadToSupabaseStorage(file: File): Promise<string> {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const bucketName = getRequiredEnv("SUPABASE_STORAGE_BUCKET");
  const filename = `${Date.now()}-${randomUUID()}-${sanitizeFileName(file.name)}`;
  const objectPath = `uploads/${filename}`;
  const bytes = await file.arrayBuffer();
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const uploadUrl = `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/object/${encodeURIComponent(bucketName)}/${encodedPath}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "cache-control": "max-age=31536000",
      "content-type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: bytes,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase Storage upload failed: ${response.status} ${errorText}`);
  }

  return buildSupabasePublicUrl(supabaseUrl, bucketName, objectPath);
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

export async function uploadProjectImage(file: File): Promise<{ url: string; storage: UploadStorageBackend }> {
  const storageBackend = getUploadStorageBackend();

  if (storageBackend === "local") {
    const url = await uploadToLocalStorage(file);
    return { url, storage: "local" };
  }

  if (storageBackend === "supabase") {
    const url = await uploadToSupabaseStorage(file);
    return { url, storage: "supabase" };
  }

  if (storageBackend === "firebase") {
    const url = await uploadToFirebaseStorage(file);
    return { url, storage: "firebase" };
  }

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
