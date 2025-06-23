import { sql } from "drizzle-orm";
import "dotenv/config";
import { db } from "~/server/db";
import { availabilities, students, teachers } from "~/server/db/schema";

async function seed() {
  console.log("🌱 Seeding...");
  // Clear old data (optional during dev)
  await db.delete(availabilities);
  await db.delete(teachers);
  await db.delete(students);

  const [teacher] = await db
    .insert(teachers)
    .values({
      id: 1,
      name: "Iyo",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    })
    .returning();

  console.log("👩‍🏫 Seeded teacher:", teacher);

  // Add availabilities: Tuesday (540–660), Thursday (600–720)
  await db.insert(availabilities).values([
    {
      teacherId: 1,
      weekday: 2, // Tuesday
      startTimeMinutes: 540, // 09:00
      endTimeMinutes: 660, // 11:00
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      teacherId: 1,
      weekday: 4, // Thursday
      startTimeMinutes: 600, // 10:00
      endTimeMinutes: 720, // 12:00
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
  ]);

  console.log("📅 Seeded availabilities.");

  // Optional: Seed a student
  await db.insert(students).values({
    name: "Test Student",
    email: "student@example.com",
    createdAt: sql`(unixepoch())`,
    updatedAt: sql`(unixepoch())`,
  });
  console.log("🧑‍🎓 Seeded test student.");
  console.log("✅ Seeding complete.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
