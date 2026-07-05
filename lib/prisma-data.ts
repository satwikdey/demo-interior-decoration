/**
 * prisma-data.ts — drop-in replacement for firestore-data.ts
 * Uses SQLite via Prisma instead of Firebase Firestore.
 */
import { prisma } from "@/lib/prisma";

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

function toRecord(
  p: {
    id: string;
    title: string;
    location: string;
    category: string;
    mainImage: string;
    slug: string;
    description: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    content: { id: string; type: string; content: string; order: number }[];
  }
): ProjectRecord {
  return {
    id: p.id,
    title: p.title,
    location: p.location,
    category: p.category,
    mainImage: p.mainImage,
    slug: p.slug,
    description: p.description,
    sortOrder: p.sortOrder,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    content: p.content
      .sort((a, b) => a.order - b.order)
      .map((c) => ({
        id: c.id,
        type: c.type as ContentType,
        content: c.content,
        order: c.order,
      })),
  };
}

function toCollaborationRecord(
  c: {
    id: string;
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    slug: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    gallery: { id: string; image: string; order: number }[];
  }
): CollaborationRecord {
  return {
    id: c.id,
    name: c.name,
    category: c.category,
    description: c.description,
    fullDescription: c.fullDescription,
    image: c.image,
    slug: c.slug,
    sortOrder: c.sortOrder,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    gallery: c.gallery.sort((a, b) => a.order - b.order).map((item) => item.image),
  };
}

const include = { content: true } as const;
const collaborationInclude = { gallery: true } as const;

export async function listProjects(): Promise<ProjectRecord[]> {
  const rows = await prisma.project.findMany({
    include,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(toRecord);
}

export async function getProjectById(id: string): Promise<ProjectRecord | null> {
  const row = await prisma.project.findUnique({ where: { id }, include });
  return row ? toRecord(row) : null;
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const row = await prisma.project.findUnique({ where: { slug }, include });
  return row ? toRecord(row) : null;
}

export async function createProject(input: CreateProjectInput): Promise<ProjectRecord> {
  const existing = await prisma.project.findUnique({ where: { slug: input.slug } });
  if (existing) {
    const err = new Error("Slug already exists") as Error & { code?: string };
    err.code = "SLUG_EXISTS";
    throw err;
  }

  const last = await prisma.project.findFirst({ orderBy: { sortOrder: "desc" } });
  const nextSort = last ? last.sortOrder + 1 : 0;

  const row = await prisma.project.create({
    data: {
      title: input.title,
      location: input.location,
      category: input.category,
      mainImage: input.mainImage,
      slug: input.slug,
      description: input.description,
      sortOrder: nextSort,
      content: {
        create: (input.content ?? []).map((b, i) => ({
          type: b.type,
          content: b.content,
          order: i,
        })),
      },
    },
    include,
  });

  return toRecord(row);
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput
): Promise<ProjectRecord | null> {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return null;

  const slugConflict = await prisma.project.findUnique({ where: { slug: input.slug } });
  if (slugConflict && slugConflict.id !== id) {
    const err = new Error("Slug already exists") as Error & { code?: string };
    err.code = "SLUG_EXISTS";
    throw err;
  }

  // Delete old content blocks and recreate
  await prisma.projectContent.deleteMany({ where: { projectId: id } });

  const row = await prisma.project.update({
    where: { id },
    data: {
      title: input.title,
      location: input.location,
      category: input.category,
      mainImage: input.mainImage,
      slug: input.slug,
      description: input.description,
      content: {
        create: (input.content ?? []).map((b, i) => ({
          type: b.type,
          content: b.content,
          order: i,
        })),
      },
    },
    include,
  });

  return toRecord(row);
}

export async function deleteProject(id: string): Promise<boolean> {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return false;
  await prisma.project.delete({ where: { id } });
  return true;
}

export async function countExistingProjectsByIds(projectIds: string[]): Promise<number> {
  return prisma.project.count({ where: { id: { in: projectIds } } });
}

export async function reorderProjects(projectIds: string[]): Promise<void> {
  await Promise.all(
    projectIds.map((id, index) =>
      prisma.project.update({ where: { id }, data: { sortOrder: index } })
    )
  );
}

export async function listCollaborations(): Promise<CollaborationRecord[]> {
  const rows = await prisma.collaboration.findMany({
    include: collaborationInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(toCollaborationRecord);
}

export async function getCollaborationById(id: string): Promise<CollaborationRecord | null> {
  const row = await prisma.collaboration.findUnique({
    where: { id },
    include: collaborationInclude,
  });
  return row ? toCollaborationRecord(row) : null;
}

export async function getCollaborationBySlug(slug: string): Promise<CollaborationRecord | null> {
  const row = await prisma.collaboration.findUnique({
    where: { slug },
    include: collaborationInclude,
  });
  return row ? toCollaborationRecord(row) : null;
}

export async function createCollaboration(input: CreateCollaborationInput): Promise<CollaborationRecord> {
  const existing = await prisma.collaboration.findUnique({ where: { slug: input.slug } });
  if (existing) {
    const err = new Error("Slug already exists") as Error & { code?: string };
    err.code = "SLUG_EXISTS";
    throw err;
  }

  const last = await prisma.collaboration.findFirst({ orderBy: { sortOrder: "desc" } });
  const nextSort = last ? last.sortOrder + 1 : 0;

  const row = await prisma.collaboration.create({
    data: {
      name: input.name,
      category: input.category,
      description: input.description,
      fullDescription: input.fullDescription,
      image: input.image,
      slug: input.slug,
      sortOrder: nextSort,
      gallery: {
        create: (input.gallery ?? []).map((image, i) => ({
          image,
          order: i,
        })),
      },
    },
    include: collaborationInclude,
  });

  return toCollaborationRecord(row);
}

export async function updateCollaboration(
  id: string,
  input: UpdateCollaborationInput
): Promise<CollaborationRecord | null> {
  const existing = await prisma.collaboration.findUnique({ where: { id } });
  if (!existing) return null;

  const slugConflict = await prisma.collaboration.findUnique({ where: { slug: input.slug } });
  if (slugConflict && slugConflict.id !== id) {
    const err = new Error("Slug already exists") as Error & { code?: string };
    err.code = "SLUG_EXISTS";
    throw err;
  }

  await prisma.collaborationGalleryImage.deleteMany({ where: { collaborationId: id } });

  const row = await prisma.collaboration.update({
    where: { id },
    data: {
      name: input.name,
      category: input.category,
      description: input.description,
      fullDescription: input.fullDescription,
      image: input.image,
      slug: input.slug,
      gallery: {
        create: (input.gallery ?? []).map((image, i) => ({
          image,
          order: i,
        })),
      },
    },
    include: collaborationInclude,
  });

  return toCollaborationRecord(row);
}

export async function deleteCollaboration(id: string): Promise<boolean> {
  const existing = await prisma.collaboration.findUnique({ where: { id } });
  if (!existing) return false;
  await prisma.collaboration.delete({ where: { id } });
  return true;
}

export async function countExistingCollaborationsByIds(collaborationIds: string[]): Promise<number> {
  return prisma.collaboration.count({ where: { id: { in: collaborationIds } } });
}

export async function reorderCollaborations(collaborationIds: string[]): Promise<void> {
  await Promise.all(
    collaborationIds.map((id, index) =>
      prisma.collaboration.update({ where: { id }, data: { sortOrder: index } })
    )
  );
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }

  // SQLite users in this project predate audit columns, so we synthesize stable placeholders.
  const timestamp = new Date(0).toISOString();

  return {
    id: user.id,
    email: user.email,
    password: user.password,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export async function countUsers(): Promise<number> {
  return prisma.user.count();
}

export async function createUser(email: string, password: string): Promise<UserRecord> {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  const timestamp = new Date().toISOString();

  return {
    id: user.id,
    email: user.email,
    password: user.password,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
