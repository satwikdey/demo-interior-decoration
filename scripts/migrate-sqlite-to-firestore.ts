import { PrismaClient } from "@prisma/client";
import { loadEnvConfig } from "@next/env";
import { getFirebaseDb } from "../lib/firebase-admin";

loadEnvConfig(process.cwd());

const prisma = new PrismaClient();
const MAX_BATCH_OPERATIONS = 400;

async function commitBatch(
  pending: FirebaseFirestore.WriteBatch,
  operationCount: number
): Promise<FirebaseFirestore.WriteBatch> {
  if (operationCount > 0) {
    await pending.commit();
  }

  return getFirebaseDb().batch();
}

async function main() {
  const db = getFirebaseDb();

  const [projects, collaborations, users] = await Promise.all([
    prisma.project.findMany({
      include: { content: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.collaboration.findMany({
      include: { gallery: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.user.findMany(),
  ]);

  let batch = db.batch();
  let operationCount = 0;

  for (const project of projects) {
    const ref = db.collection("projects").doc(project.id);
    batch.set(
      ref,
      {
        title: project.title,
        location: project.location,
        category: project.category,
        mainImage: project.mainImage,
        slug: project.slug,
        description: project.description,
        sortOrder: project.sortOrder,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        content: project.content
          .sort((a, b) => a.order - b.order)
          .map((block) => ({
            id: block.id,
            type: block.type,
            content: block.content,
            order: block.order,
          })),
      },
      { merge: true }
    );

    operationCount += 1;
    if (operationCount >= MAX_BATCH_OPERATIONS) {
      batch = await commitBatch(batch, operationCount);
      operationCount = 0;
    }
  }

  for (const collaboration of collaborations) {
    const ref = db.collection("collaborations").doc(collaboration.id);
    batch.set(
      ref,
      {
        name: collaboration.name,
        category: collaboration.category,
        description: collaboration.description,
        fullDescription: collaboration.fullDescription,
        image: collaboration.image,
        slug: collaboration.slug,
        sortOrder: collaboration.sortOrder,
        createdAt: collaboration.createdAt.toISOString(),
        updatedAt: collaboration.updatedAt.toISOString(),
        gallery: collaboration.gallery
          .sort((a, b) => a.order - b.order)
          .map((item) => item.image),
      },
      { merge: true }
    );

    operationCount += 1;
    if (operationCount >= MAX_BATCH_OPERATIONS) {
      batch = await commitBatch(batch, operationCount);
      operationCount = 0;
    }
  }

  for (const user of users) {
    const timestamp = new Date().toISOString();
    const ref = db.collection("users").doc(user.id);
    batch.set(
      ref,
      {
        email: user.email,
        password: user.password,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      { merge: true }
    );

    operationCount += 1;
    if (operationCount >= MAX_BATCH_OPERATIONS) {
      batch = await commitBatch(batch, operationCount);
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    await batch.commit();
  }

  console.log(
    `Migrated ${projects.length} projects, ${collaborations.length} collaborations, and ${users.length} users from SQLite to Firestore.`
  );
}

main()
  .catch((error) => {
    console.error("SQLite to Firestore migration failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
