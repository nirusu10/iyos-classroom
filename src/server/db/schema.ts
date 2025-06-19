// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `iyos-classroom_${name}`,
);

export const bookings = createTable(
  "booking",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    studentEmail: d.text({ length: 256 }).notNull(),
    startTime: d.text({ length: 256 }).notNull(),
    endTime: d.text({ length: 256 }).notNull(),
    timeZone: d.text().notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("email_idx").on(t.studentEmail)],
);

export const availability = createTable("availability", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  weekday: d.integer().notNull(),
  startTime: d.text({ length: 256 }).notNull(),
  endTime: d.text({ length: 256 }).notNull(),
  timeZone: d.text().notNull(),
  createdAt: d
    .integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));
