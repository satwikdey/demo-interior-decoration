const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listProjects() {
  const projects = await prisma.project.findMany();
  for (const p of projects) {
    console.log(`ID: ${p.id}, Title: ${p.title}, Slug: ${p.slug}`);
  }
}
listProjects();
