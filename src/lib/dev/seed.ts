import { eq, sql } from "drizzle-orm";
import "dotenv/config";
import { db } from "~/server/db";
import {
  availabilities,
  students,
  teachers,
  materials,
  bookings,
} from "~/server/db/schema";

async function seed() {
  console.log("🌱 Seeding...");
  // Clear old data (optional during dev)
  await db.delete(availabilities);
  await db.delete(bookings);
  await db.delete(teachers);
  await db.delete(students);
  await db.delete(materials);

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
    {
      teacherId: 1,
      // 09:10 JST == 00:10 UTC
      startTime: new Date("2025-07-01T00:10:00.000Z").toISOString(),
      endTime: new Date("2025-07-01T01:00:00.000Z").toISOString(), // 09:10–10:00 JST
      timeZone: "Asia/Tokyo",
      status: "booked",
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

  // Fetch the student ID by email
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.email, "student@example.com"));

  if (!student) {
    throw new Error("Test student not found for booking seed.");
  }

  await db.insert(bookings).values([
    {
      teacherId: 1,
      studentId: student.id,
      startTime: new Date("2025-07-01T07:00:00.000Z").toISOString(), // Tuesday 09:00 Berlin
      endTime: new Date("2025-07-01T07:50:00.000Z").toISOString(),
      timeZone: "Europe/Berlin",
      status: "booked",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      teacherId: 1,
      studentId: student.id,
      startTime: new Date("2025-07-03T08:00:00.000Z").toISOString(), // Thursday 10:00 Berlin
      endTime: new Date("2025-07-03T08:50:00.000Z").toISOString(),
      timeZone: "Europe/Berlin",
      status: "booked",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
  ]);

  console.log("📚 Seeded bookings.");

  // Seed materials
  await db.insert(materials).values([
    {
      title: "Introduction to Hiragana",
      description: "Learn how to read and write Hiragana with practice sheets.",
      pdfUrl: "https://example.com/hiragana.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "JLPT N5 Grammar Patterns",
      description: "Essential grammar for JLPT N5 with usage examples.",
      pdfUrl: "https://example.com/jlpt-n5.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Conversational Japanese: Keigo Basics",
      description:
        "Understand the basics of respectful language and when to use it.",
      pdfUrl: "https://example.com/keigo.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
  ]);
  console.log("📄 Seeded materials.");
  console.log("✅ Seeding complete.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
