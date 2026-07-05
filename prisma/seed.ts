import { ContentType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
          create: content.map((block) => ({
            ...block,
            type: block.type as ContentType,
          })),
        }
      }
    });
  }

  console.log("Initial projects seeded");

  const collaborations = [
    {
      name: "THG Paris",
      category: "Bathroom Fittings",
      description: "Art de Vivre in the bathroom.",
      fullDescription:
        "Our partnership with THG Paris represents a shared commitment to excellence and craftsmanship. Together, we have created a collection of bathroom fittings that blend French elegance with modern innovation. Each piece is akin to jewelry for the home, utilizing the finest materials and semi-precious stones.",
      image: "/projects/living-1.jpeg",
      slug: "thg-paris",
      gallery: ["/projects/living-1.jpeg", "/projects/living-luxe-1.jpg", "/projects/living-luxe-2.jpg"],
    },
    {
      name: "Vero Fabrics",
      category: "Textiles",
      description: "Weaving stories into every thread.",
      fullDescription:
        "Working with Vero Fabrics allowed us to explore the tactile dimension of design. This bespoke collection features woven silks, velvets, and linens inspired by the natural patterns found in British landscapes. The fabrics are designed to age beautifully, adding depth and character to any interior.",
      image: "/projects/bedroom-luxe.jpg",
      slug: "vero-fabrics",
      gallery: ["/projects/bedroom-luxe.jpg", "/projects/bedroom-luxe-1.jpg", "/projects/bedroom-luxe-2.jpg"],
    },
    {
      name: "SA Baxter",
      category: "Hardware",
      description: "Architectural hardware as functional art.",
      fullDescription:
        "Hardware is the handshake of a building. Our collaboration with SA Baxter focused on creating a line of door and cabinet hardware that feels substantial and grounded. Using lost-wax casting techniques, we achieved unique textures and finishes that bring a bespoke touch to the most habitual interactions in a home.",
      image: "/projects/urbana-living.jpg",
      slug: "sa-baxter",
      gallery: ["/projects/urbana-living.jpg", "/projects/urbana-1.jpg", "/projects/urbana-2.jpg"],
    },
  ];

  for (const [index, collaboration] of collaborations.entries()) {
    const { gallery, ...meta } = collaboration;
    await prisma.collaboration.upsert({
      where: { slug: meta.slug },
      update: {},
      create: {
        ...meta,
        sortOrder: index,
        gallery: {
          create: gallery.map((image, order) => ({ image, order })),
        },
      },
    });
  }

  console.log("Initial collaborations seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
