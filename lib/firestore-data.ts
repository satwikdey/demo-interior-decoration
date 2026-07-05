import { randomUUID } from "crypto";
import { getFirebaseDb } from "@/lib/firebase-admin";

export type ContentType = "IMAGE" | "TEXT";

export interface ProjectContentBlock {
  id: string;
  type: ContentType;
  content: string;
  order: number;
}

export interface ProjectRecord {
  id: string;
  title: string;
  location: string;
  category: string;
  mainImage: string;
  slug: string;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  content: ProjectContentBlock[];
}

export interface CollaborationRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  slug: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  gallery: string[];
}

export interface CreateProjectInput {
  title: string;
  location: string;
  category: string;
  mainImage: string;
  slug: string;
  description: string;
  content?: Array<{ type: ContentType; content: string }>;
}

export type UpdateProjectInput = CreateProjectInput;

export interface CreateCollaborationInput {
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  slug: string;
  gallery?: string[];
}

export type UpdateCollaborationInput = CreateCollaborationInput;

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

function toContentBlocks(value: unknown): ProjectContentBlock[] {
  if (!Array.isArray(value)) return [];

  const blocks = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const block = item as Partial<ProjectContentBlock>;

      const type = block.type === "IMAGE" ? "IMAGE" : block.type === "TEXT" ? "TEXT" : null;
      if (!type || typeof block.content !== "string") return null;

      return {
        id: typeof block.id === "string" && block.id.trim().length > 0 ? block.id : randomUUID(),
        type,
        content: block.content,
        order: typeof block.order === "number" ? block.order : index,
      } satisfies ProjectContentBlock;
    })
    .filter((block): block is ProjectContentBlock => block !== null);

  return blocks.sort((a, b) => a.order - b.order);
}

function toGalleryImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      if (typeof item === "string") {
        return { image: item, order: index };
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const galleryItem = item as { image?: unknown; content?: unknown; order?: unknown };
      const image =
        typeof galleryItem.image === "string"
          ? galleryItem.image
          : typeof galleryItem.content === "string"
            ? galleryItem.content
            : "";

      if (!image) {
        return null;
      }

      return {
        image,
        order: typeof galleryItem.order === "number" ? galleryItem.order : index,
      };
    })
    .filter((item): item is { image: string; order: number } => item !== null)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.image);
}

function toProjectRecord(id: string, data: Record<string, unknown>): ProjectRecord {
  const createdAt = typeof data.createdAt === "string" ? data.createdAt : new Date(0).toISOString();
  const updatedAt = typeof data.updatedAt === "string" ? data.updatedAt : createdAt;

  return {
    id,
    title: String(data.title ?? ""),
    location: String(data.location ?? ""),
    category: String(data.category ?? ""),
    mainImage: String(data.mainImage ?? ""),
    slug: String(data.slug ?? ""),
    description: String(data.description ?? ""),
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
    createdAt,
    updatedAt,
    content: toContentBlocks(data.content),
  };
}

function toCollaborationRecord(id: string, data: Record<string, unknown>): CollaborationRecord {
  const createdAt = typeof data.createdAt === "string" ? data.createdAt : new Date(0).toISOString();
  const updatedAt = typeof data.updatedAt === "string" ? data.updatedAt : createdAt;

  return {
    id,
    name: String(data.name ?? ""),
    category: String(data.category ?? ""),
    description: String(data.description ?? ""),
    fullDescription: String(data.fullDescription ?? ""),
    image: String(data.image ?? ""),
    slug: String(data.slug ?? ""),
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
    createdAt,
    updatedAt,
    gallery: toGalleryImages(data.gallery),
  };
}

async function listProjectsRaw(): Promise<ProjectRecord[]> {
  const db = getFirebaseDb();
  const snap = await db.collection("projects").get();

  return snap.docs.map((doc) => toProjectRecord(doc.id, doc.data()));
}

async function listCollaborationsRaw(): Promise<CollaborationRecord[]> {
  const db = getFirebaseDb();
  const snap = await db.collection("collaborations").get();

  return snap.docs.map((doc) => toCollaborationRecord(doc.id, doc.data()));
}

async function getProjectBySlugInternal(slug: string): Promise<ProjectRecord | null> {
  const db = getFirebaseDb();
  const snap = await db.collection("projects").where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;

  const doc = snap.docs[0]!;
  return toProjectRecord(doc.id, doc.data());
}

async function getCollaborationBySlugInternal(slug: string): Promise<CollaborationRecord | null> {
  const db = getFirebaseDb();
  const snap = await db.collection("collaborations").where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;

  const doc = snap.docs[0]!;
  return toCollaborationRecord(doc.id, doc.data());
}

async function ensureUniqueSlug(slug: string, excludeProjectId?: string): Promise<boolean> {
  const existing = await getProjectBySlugInternal(slug);
  if (!existing) return true;
  if (excludeProjectId && existing.id === excludeProjectId) return true;
  return false;
}

async function ensureUniqueCollaborationSlug(
  slug: string,
  excludeCollaborationId?: string
): Promise<boolean> {
  const existing = await getCollaborationBySlugInternal(slug);
  if (!existing) return true;
  if (excludeCollaborationId && existing.id === excludeCollaborationId) return true;
  return false;
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const projects = await listProjectsRaw();
  return projects.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function getProjectById(id: string): Promise<ProjectRecord | null> {
  const db = getFirebaseDb();
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) return null;

  return toProjectRecord(doc.id, doc.data() as Record<string, unknown>);
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  return getProjectBySlugInternal(slug);
}

export async function createProject(input: CreateProjectInput): Promise<ProjectRecord> {
  const canUseSlug = await ensureUniqueSlug(input.slug);
  if (!canUseSlug) {
    const error = new Error("Slug already exists");
    (error as Error & { code?: string }).code = "SLUG_EXISTS";
    throw error;
  }

  const projects = await listProjectsRaw();
  const lastSortOrder = projects.reduce((max, project) => Math.max(max, project.sortOrder), -1);
  const now = new Date().toISOString();
  const projectId = randomUUID();
  const content = (input.content ?? []).map((block, index) => ({
    id: randomUUID(),
    type: block.type,
    content: block.content,
    order: index,
  }));

  const payload: Omit<ProjectRecord, "id"> = {
    title: input.title,
    location: input.location,
    category: input.category,
    mainImage: input.mainImage,
    slug: input.slug,
    description: input.description,
    sortOrder: lastSortOrder + 1,
    createdAt: now,
    updatedAt: now,
    content,
  };

  const db = getFirebaseDb();
  await db.collection("projects").doc(projectId).set(payload);
  return {
    id: projectId,
    ...payload,
  };
}

export async function updateProject(id: string, input: UpdateProjectInput): Promise<ProjectRecord | null> {
  const existing = await getProjectById(id);
  if (!existing) return null;

  const canUseSlug = await ensureUniqueSlug(input.slug, id);
  if (!canUseSlug) {
    const error = new Error("Slug already exists");
    (error as Error & { code?: string }).code = "SLUG_EXISTS";
    throw error;
  }

  const now = new Date().toISOString();
  const content = (input.content ?? []).map((block, index) => ({
    id: randomUUID(),
    type: block.type,
    content: block.content,
    order: index,
  }));

  const payload: Omit<ProjectRecord, "id" | "createdAt" | "sortOrder"> = {
    title: input.title,
    location: input.location,
    category: input.category,
    mainImage: input.mainImage,
    slug: input.slug,
    description: input.description,
    updatedAt: now,
    content,
  };

  const db = getFirebaseDb();
  await db.collection("projects").doc(id).set(
    {
      ...payload,
      createdAt: existing.createdAt,
      sortOrder: existing.sortOrder,
    },
    { merge: true }
  );

  return {
    ...existing,
    ...payload,
    id,
    createdAt: existing.createdAt,
    sortOrder: existing.sortOrder,
  };
}

export async function deleteProject(id: string): Promise<boolean> {
  const existing = await getProjectById(id);
  if (!existing) return false;

  const db = getFirebaseDb();
  await db.collection("projects").doc(id).delete();
  return true;
}

export async function countExistingProjectsByIds(projectIds: string[]): Promise<number> {
  const db = getFirebaseDb();
  const checks = await Promise.all(projectIds.map((id) => db.collection("projects").doc(id).get()));
  return checks.filter((doc) => doc.exists).length;
}

export async function reorderProjects(projectIds: string[]): Promise<void> {
  const db = getFirebaseDb();
  const batch = db.batch();

  projectIds.forEach((projectId, index) => {
    const ref = db.collection("projects").doc(projectId);
    batch.update(ref, {
      sortOrder: index,
      updatedAt: new Date().toISOString(),
    });
  });

  await batch.commit();
}

export async function listCollaborations(): Promise<CollaborationRecord[]> {
  const collaborations = await listCollaborationsRaw();
  return collaborations.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function getCollaborationById(id: string): Promise<CollaborationRecord | null> {
  const db = getFirebaseDb();
  const doc = await db.collection("collaborations").doc(id).get();
  if (!doc.exists) return null;

  return toCollaborationRecord(doc.id, doc.data() as Record<string, unknown>);
}

export async function getCollaborationBySlug(slug: string): Promise<CollaborationRecord | null> {
  return getCollaborationBySlugInternal(slug);
}

export async function createCollaboration(
  input: CreateCollaborationInput
): Promise<CollaborationRecord> {
  const canUseSlug = await ensureUniqueCollaborationSlug(input.slug);
  if (!canUseSlug) {
    const error = new Error("Slug already exists");
    (error as Error & { code?: string }).code = "SLUG_EXISTS";
    throw error;
  }

  const collaborations = await listCollaborationsRaw();
  const lastSortOrder = collaborations.reduce(
    (max, collaboration) => Math.max(max, collaboration.sortOrder),
    -1
  );
  const now = new Date().toISOString();
  const collaborationId = randomUUID();

  const payload: Omit<CollaborationRecord, "id"> = {
    name: input.name,
    category: input.category,
    description: input.description,
    fullDescription: input.fullDescription,
    image: input.image,
    slug: input.slug,
    sortOrder: lastSortOrder + 1,
    createdAt: now,
    updatedAt: now,
    gallery: input.gallery ?? [],
  };

  const db = getFirebaseDb();
  await db.collection("collaborations").doc(collaborationId).set(payload);
  return {
    id: collaborationId,
    ...payload,
  };
}

export async function updateCollaboration(
  id: string,
  input: UpdateCollaborationInput
): Promise<CollaborationRecord | null> {
  const existing = await getCollaborationById(id);
  if (!existing) return null;

  const canUseSlug = await ensureUniqueCollaborationSlug(input.slug, id);
  if (!canUseSlug) {
    const error = new Error("Slug already exists");
    (error as Error & { code?: string }).code = "SLUG_EXISTS";
    throw error;
  }

  const now = new Date().toISOString();
  const payload: Omit<CollaborationRecord, "id" | "createdAt" | "sortOrder"> = {
    name: input.name,
    category: input.category,
    description: input.description,
    fullDescription: input.fullDescription,
    image: input.image,
    slug: input.slug,
    updatedAt: now,
    gallery: input.gallery ?? [],
  };

  const db = getFirebaseDb();
  await db.collection("collaborations").doc(id).set(
    {
      ...payload,
      createdAt: existing.createdAt,
      sortOrder: existing.sortOrder,
    },
    { merge: true }
  );

  return {
    ...existing,
    ...payload,
    id,
    createdAt: existing.createdAt,
    sortOrder: existing.sortOrder,
  };
}

export async function deleteCollaboration(id: string): Promise<boolean> {
  const existing = await getCollaborationById(id);
  if (!existing) return false;

  const db = getFirebaseDb();
  await db.collection("collaborations").doc(id).delete();
  return true;
}

export async function countExistingCollaborationsByIds(
  collaborationIds: string[]
): Promise<number> {
  const db = getFirebaseDb();
  const checks = await Promise.all(
    collaborationIds.map((id) => db.collection("collaborations").doc(id).get())
  );
  return checks.filter((doc) => doc.exists).length;
}

export async function reorderCollaborations(collaborationIds: string[]): Promise<void> {
  const db = getFirebaseDb();
  const batch = db.batch();

  collaborationIds.forEach((collaborationId, index) => {
    const ref = db.collection("collaborations").doc(collaborationId);
    batch.update(ref, {
      sortOrder: index,
      updatedAt: new Date().toISOString(),
    });
  });

  await batch.commit();
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const db = getFirebaseDb();
  const snap = await db.collection("users").where("email", "==", email).limit(1).get();
  if (snap.empty) return null;

  const doc = snap.docs[0]!;
  const data = doc.data();
  return {
    id: doc.id,
    email: String(data.email ?? ""),
    password: String(data.password ?? ""),
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

export async function countUsers(): Promise<number> {
  const db = getFirebaseDb();
  const snap = await db.collection("users").limit(1).get();
  if (snap.empty) return 0;

  // If we have at least one user this is enough for bootstrap logic.
  return 1;
}

export async function createUser(email: string, password: string): Promise<UserRecord> {
  const db = getFirebaseDb();
  const now = new Date().toISOString();
  const userId = randomUUID();

  const record: Omit<UserRecord, "id"> = {
    email,
    password,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection("users").doc(userId).set(record);
  return {
    id: userId,
    ...record,
  };
}
