// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@smmpanelpro.com" },
    update: {},
    create: {
      email: "admin@smmpanelpro.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      wallet: { create: { balance: 1000 } },
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash("User@123456", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@smmpanelpro.com" },
    update: {},
    create: {
      email: "demo@smmpanelpro.com",
      name: "Demo User",
      passwordHash: userPassword,
      role: "USER",
      wallet: { create: { balance: 50 } },
    },
  });

  // Seed services
  const services = [
    {
      name: "Instagram Followers (Real & Active)",
      category: "Instagram",
      description: "High-quality real Instagram followers with guaranteed delivery. Gradual delivery for maximum safety.",
      rate: 1.99,
      minQuantity: 100,
      maxQuantity: 100000,
      popularity: 98,
    },
    {
      name: "Instagram Likes (Premium)",
      category: "Instagram",
      description: "Premium Instagram likes from real accounts. Instant start, lifetime guarantee.",
      rate: 0.49,
      minQuantity: 50,
      maxQuantity: 50000,
      popularity: 95,
    },
    {
      name: "Instagram Views (Reels)",
      category: "Instagram",
      description: "Boost your Instagram Reels views. Fast delivery, improves reach and discoverability.",
      rate: 0.09,
      minQuantity: 500,
      maxQuantity: 1000000,
      popularity: 90,
    },
    {
      name: "TikTok Followers (HQ)",
      category: "TikTok",
      description: "High quality TikTok followers. Real-looking profiles, stable count.",
      rate: 2.49,
      minQuantity: 100,
      maxQuantity: 50000,
      popularity: 92,
    },
    {
      name: "TikTok Likes (Fast)",
      category: "TikTok",
      description: "Fast TikTok likes with instant delivery. Boost your video engagement.",
      rate: 0.39,
      minQuantity: 100,
      maxQuantity: 100000,
      popularity: 88,
    },
    {
      name: "TikTok Video Views",
      category: "TikTok",
      description: "Mass TikTok views delivered in minutes. Help your content go viral.",
      rate: 0.05,
      minQuantity: 1000,
      maxQuantity: 10000000,
      popularity: 85,
    },
    {
      name: "YouTube Subscribers",
      category: "YouTube",
      description: "Real YouTube subscribers. Helps monetization eligibility and credibility.",
      rate: 5.99,
      minQuantity: 100,
      maxQuantity: 10000,
      popularity: 80,
    },
    {
      name: "YouTube Views (HQ)",
      category: "YouTube",
      description: "High retention YouTube views. Safe for monetized channels.",
      rate: 0.89,
      minQuantity: 500,
      maxQuantity: 500000,
      popularity: 82,
    },
    {
      name: "Twitter/X Followers",
      category: "Twitter/X",
      description: "Grow your Twitter/X following instantly. Non-drop guarantee.",
      rate: 1.79,
      minQuantity: 100,
      maxQuantity: 50000,
      popularity: 75,
    },
    {
      name: "Twitter/X Likes",
      category: "Twitter/X",
      description: "Real Twitter/X likes for any tweet. Quick delivery.",
      rate: 0.59,
      minQuantity: 50,
      maxQuantity: 20000,
      popularity: 72,
    },
    {
      name: "Facebook Page Likes",
      category: "Facebook",
      description: "Real Facebook page likes. Improve your page authority and reach.",
      rate: 1.49,
      minQuantity: 100,
      maxQuantity: 50000,
      popularity: 70,
    },
    {
      name: "Spotify Streams",
      category: "Spotify",
      description: "Boost your track streams. Helps with playlist placement algorithms.",
      rate: 0.29,
      minQuantity: 1000,
      maxQuantity: 1000000,
      popularity: 77,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.name.replace(/\s/g, "-").toLowerCase() },
      update: {},
      create: service,
    });
  }

  console.log("✅ Seed complete");
  console.log(`   Admin: admin@smmpanelpro.com / Admin@123456`);
  console.log(`   Demo:  demo@smmpanelpro.com  / User@123456`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
