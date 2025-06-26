import { and, eq } from "drizzle-orm";
import { z } from "zod/v4";
import { computeAvailableSlots } from "~/lib/time/computeSlots";
import { db } from "~/server/db";
import {
  availabilities,
  availabilityExceptions,
  bookings,
} from "~/server/db/schema";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().min(1),
});

export async function GET(request: Request) {
  const url = new URL(request.url);

  const parsed = querySchema.safeParse({
    date: url.searchParams.get("date"),
    timeZone: url.searchParams.get("timeZone"),
  });

  if (!parsed.success) {
    return Response.json({ error: "Invalid query" }, { status: 400 });
  }

  const { date } = parsed.data;
  const teacherId = 1; // single teacher for now

  const [a, e, b] = await Promise.all([
    db
      .select()
      .from(availabilities)
      .where(eq(availabilities.teacherId, teacherId)),
    db
      .select()
      .from(availabilityExceptions)
      .where(
        and(
          eq(availabilityExceptions.teacherId, teacherId),
          eq(availabilityExceptions.date, date),
        ),
      ),
    db.select().from(bookings).where(eq(bookings.teacherId, teacherId)),
  ]);

  const slots = computeAvailableSlots({
    date,
    teacherTimeZone: "Asia/Tokyo",
    availabilities: a,
    exceptions: e,
    bookings: b,
  });
  return Response.json({ slots });
}
