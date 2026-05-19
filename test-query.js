const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testQuery() {
  const slug = "Mustard Oil";
  const project = await prisma.project.findUnique({
    where: { slug }
  });
  console.log("Project found:", !!project);
  if (project) console.log(project.title);

  const encodedSlug = encodeURIComponent(slug);
  console.log("Encoded:", encodedSlug);

  // Let's also list all slugs
  const all = await prisma.project.findMany();
  console.log("All slugs:", all.map(p => `'${p.slug}'`).join(", "));
}
testQuery();
