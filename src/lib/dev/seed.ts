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
    {
      teacherId: 1,
      studentId: student.id,
      // 09:10 JST == 00:10 UTC
      startTime: new Date("2025-07-01T00:10:00.000Z").toISOString(),
      endTime: new Date("2025-07-01T01:00:00.000Z").toISOString(), // 09:10–10:00 JST
      timeZone: "Asia/Tokyo",
      status: "booked",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
  ]);

  console.log("📚 Seeded bookings.");

  // Seed materials
  await db.insert(materials).values([
    // Beginner
    {
      title: "Introduction to Hiragana",
      description: "Learn how to read and write Hiragana with practice sheets.",
      Url: "https://example.com/hiragana.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Katakana Crash Course",
      description:
        "Master Katakana characters quickly with flashcards and audio.",
      Url: "https://example.com/katakana.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Basic Greetings and Phrases",
      description: "Common Japanese greetings and self-introductions.",
      Url: "https://example.com/greetings.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Daily Vocabulary (Food & Drink)",
      description:
        "Essential words for eating out, ordering, and grocery shopping.",
      Url: "https://example.com/vocab-food.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "JLPT N5 Grammar Patterns",
      description: "Essential grammar for JLPT N5 with usage examples.",
      Url: "https://example.com/jlpt-n5.pdf",
      level: "beginner",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },

    // Intermediate
    {
      title: "Conversational Japanese: Keigo Basics",
      description:
        "Understand the basics of respectful language and when to use it.",
      Url: "https://example.com/keigo.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "JLPT N4 Reading Practice",
      description:
        "Short passages with vocabulary and comprehension questions.",
      Url: "https://example.com/n4-reading.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Listening Practice: Daily Conversations",
      description: "Audio clips + transcripts for common daily conversations.",
      Url: "https://example.com/intermediate-listening.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Verb Conjugation Drill Sheets",
      description: "Practice workbook for conjugating verbs across all forms.",
      Url: "https://example.com/verb-drills.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Polite vs. Casual Japanese",
      description: "Examples and practice converting sentences between forms.",
      Url: "https://example.com/formality.pdf",
      level: "intermediate",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },

    // Advanced
    {
      title: "JLPT N2 Reading: Short Essays",
      description: "Advanced reading samples with discussion questions.",
      Url: "https://example.com/n2-essays.pdf",
      level: "advanced",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Business Japanese Email Templates",
      description: "Real-world examples of Japanese business writing.",
      Url: "https://example.com/business-email.pdf",
      level: "advanced",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Honorifics in Context",
      description: "Detailed breakdowns of 敬語 usage in real dialogue.",
      Url: "https://example.com/honorifics.pdf",
      level: "advanced",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Advanced Listening: NHK News Clips",
      description: "Current events audio with comprehension questions.",
      Url: "https://example.com/nhk-listening.pdf",
      level: "advanced",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    },
    {
      title: "Essay Writing Practice (N1/N2)",
      description: "Write and revise opinion essays with model answers.",
      Url: "https://example.com/n2-writing.pdf",
      level: "advanced",
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
