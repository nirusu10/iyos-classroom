import { and, eq, or, sql } from "drizzle-orm";
import { sendBookingConfirmation } from "~/lib/email/sendBookingConfirmation";
import { bookingSchema } from "~/lib/validation/schemas";
import { db } from "~/server/db";
import { bookings, students } from "~/server/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Invalid booking data", details: result.error.issues },
        { status: 400 },
      );
    }

    const {
      teacherId,
      studentName,
      studentEmail,
      startTime,
      endTime,
      timeZone,
    } = result.data;

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Prevent overlap
    const existing = await db.query.bookings.findFirst({
      where: and(
        eq(bookings.teacherId, teacherId),
        or(
          // Start overlaps
          and(
            sql`${bookings.startTime} < ${end.toISOString()}`,
            sql`${bookings.endTime} > ${start.toISOString()}`,
          ),
        ),
      ),
    });

    if (existing) {
      return Response.json(
        { error: "This time slot is already booked." },
        { status: 409 },
      );
    }

    // 2. Ensure student exists
    const existingStudent = await db.query.students.findFirst({
      where: eq(students.email, studentEmail),
    });

    const studentId =
      existingStudent?.id ??
      (
        await db
          .insert(students)
          .values({
            name: studentName,
            email: studentEmail,
            createdAt: sql`(unixepoch())`,
            updatedAt: sql`(unixepoch())`,
          })
          .returning({ id: students.id })
      )[0]?.id;

    if (!studentId) {
      return Response.json(
        { error: "Failed to create or fetch student" },
        { status: 500 },
      );
    }

    // 3. Create booking
    await db.insert(bookings).values({
      teacherId,
      studentId,
      startTime,
      endTime,
      timeZone,
      status: "booked",
      createdAt: sql`(unixepoch())`,
      updatedAt: sql`(unixepoch())`,
    });

    // Send e-mail confirmation
    try {
      await sendBookingConfirmation({
        to: studentEmail,
        name: studentName,
        startTime,
        endTime,
        timeZone,
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Booking failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
