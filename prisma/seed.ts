const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = "admin123"; // Default password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await prisma.user.upsert({
    where: { email: "admin@designone.com" },
    update: {},
    create: {
      email: "admin@designone.com",
      password: hashedPassword,
    },
  });

  console.log("Admin user created/updated");

  const projects = [
    {
        title: "5 Ballygunge",
        location: "Kolkata",
        category: "Private Residential",
        mainImage: "/projects/living-1.jpeg",
        slug: "ballygunge",
        description: "A 5,000 sq. ft. residence designed for four generations, blending legacy pieces with refreshed contemporary aesthetics.",
        content: [
            { type: "TEXT", content: "A 5,000 sq. ft. residence designed for four generations. The project focuses on reinterpreting existing furniture and legacy pieces, blending them with a refreshed aesthetic of rich wood finishes and traditional accents.", order: 0 },
            { type: "IMAGE", content: "/projects/living-luxe-1.jpg", order: 1 },
            { type: "TEXT", content: "Custom cabinetry was introduced to maintain proportion without visual clutter, and each room follows the same restrained design language — minimal yet warm. Every decision was driven by spatial optimisation, ensuring the space feels both grand and practical for daily family life.", order: 2 },
            { type: "IMAGE", content: "/projects/living-luxe-2.jpg", order: 3 },
        ]
    },
    {
        title: "38/a",
        location: "Kolkata",
        category: "Private Residential",
        mainImage: "/projects/bedroom-luxe.jpg",
        slug: "38a",
        description: "A compact two-bedroom apartment with an open-plan configuration, muted Scandinavian palette, and concealed lighting.",
        content: [
            { type: "TEXT", content: "A compact two-bedroom apartment designed with an open-plan configuration to maximise the sense of space. It features a muted Scandinavian palette, layered with darker accents, textured surfaces, and custom cabinetry.", order: 0 },
            { type: "IMAGE", content: "/projects/bedroom-modern-1.jpg", order: 1 },
        ]
    },
    {
        title: "Bikaner House",
        location: "Bikaner, Rajasthan",
        category: "Heritage & Commercial",
        mainImage: "/projects/bikaner-1.jpg",
        slug: "heritage-palace",
        description: "A contemporary interpretation of Rajasthani haveli architecture — repetitive arches, sandstone tones, and a central courtyard pool.",
        content: [
            { type: "TEXT", content: "A contemporary interpretation of traditional Rajasthani courtyard architecture (haveli typology). The design features repetitive arches, carved railings, sandstone tones, and a central courtyard pool — all drawn from the historical vocabulary of the region.", order: 0 },
            { type: "IMAGE", content: "/projects/bikaner-1.jpg", order: 1 },
        ]
    }
  ];

  for (const [index, p] of projects.entries()) {
    const { content, ...meta } = p;
    await prisma.project.upsert({
      where: { slug: meta.slug },
      update: {},
      create: {
        ...meta,
        sortOrder: index,
        content: {
          create: content
        }
      }
    });
  }

  console.log("Initial projects seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
