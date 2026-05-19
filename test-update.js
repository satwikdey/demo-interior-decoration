const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testUpdate() {
  try {
    // Find any project to test
    const project = await prisma.project.findFirst();
    if (!project) {
      console.log("No project found");
      return;
    }

    console.log("Updating project ID:", project.id);

    const updated = await prisma.project.update({
      where: { id: project.id },
      data: {
        title: project.title,
        location: project.location,
        category: project.category,
        mainImage: project.mainImage,
        slug: project.slug,
        description: project.description,
        content: {
          deleteMany: {},
          create: [
            { type: "TEXT", content: "Test content", order: 0 }
          ]
        }
      }
    });

    console.log("Update successful");
  } catch (err) {
    console.error("Update failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testUpdate();
