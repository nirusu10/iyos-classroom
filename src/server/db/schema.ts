// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  int,
  sqliteTableCreator,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `iyos-classroom_${name}`,
);

export const teachers = createTable(
  "teachers",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text({ length: 256 }).notNull(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("name_idx").on(t.name)],
);

export const students = createTable(
  "students",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text({ length: 256 }).notNull(),
    email: text({ length: 256 }).notNull().unique(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("name_idx").on(t.name)],
);

export const availabilities = createTable(
  "availabilities",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    teacherId: int({ mode: "number" })
      .notNull()
      .references(() => teachers.id),
    weekday: int().notNull(),
    startTimeMinutes: int().notNull(),
    endTimeMinutes: int().notNull(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("teacher_weekday_idx").on(t.teacherId, t.weekday)],
);

export const availabilityExceptions = createTable(
  "availability_exceptions",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    teacherId: int({ mode: "number" })
      .notNull()
      .references(() => teachers.id),
    date: text().notNull(),
    isAvailable: int({ mode: "boolean" }).notNull(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("teacher_date_idx").on(t.teacherId, t.date)],
);

export const bookings = createTable(
  "bookings",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    teacherId: int({ mode: "number" })
      .notNull()
      .references(() => teachers.id),
    studentId: int({ mode: "number" })
      .notNull()
      .references(() => students.id),
    startTime: text().notNull(),
    endTime: text().notNull(),
    timeZone: text().notNull(),
    status: text({ enum: ["booked", "cancelled", "pending"] })
      .default("pending")
      .notNull(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [
    index("teacher_time_idx").on(t.teacherId, t.startTime),
    index("student_time_idx").on(t.studentId, t.startTime),
    index("teacher_booking_range_idx").on(t.teacherId, t.startTime, t.endTime),
    unique("unique_teacher_slot").on(t.teacherId, t.startTime),
    unique("unique_student_slot").on(t.studentId, t.startTime),
  ],
);

export const materials = createTable(
  "materials",
  {
    id: int({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text({ length: 256 }).notNull(),
    description: text().notNull(),
    pdfUrl: text({ length: 1024 }).notNull(), // or video/resource URL
    level: text({ enum: ["beginner", "intermediate", "advanced"] }).notNull(),
    createdAt: int({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int({ mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("level_idx").on(t.level)],
);
