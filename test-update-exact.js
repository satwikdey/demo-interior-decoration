const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testUpdate() {
  try {
    const id = "cmoqo9daw0000vfhs3qqkxvho";
    console.log("Updating project ID:", id);

    const updated = await prisma.project.update({
      where: { id: id },
      data: {
        title: "Kishan 2 Kitchen",
        location: "Kolkata, India",
        category: "Private Residential",
        slug: "Mustard Oil",
        description: "Cold Pressed...",
        // assuming mainImage stays the same or fake one
        mainImage: "/test.jpg",
        content: {
          deleteMany: {},
          create: [
            { type: "TEXT", content: "Best mustard oil in the country", order: 0 },
            { type: "IMAGE", content: "/test1.jpg", order: 1 },
            { type: "IMAGE", content: "/test2.jpg", order: 2 }
          ]
        }
      }
    });
    console.log("Update successful", updated.title);
  } catch (err) {
    console.error("Update failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}
testUpdate();
