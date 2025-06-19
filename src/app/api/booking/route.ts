import { NextRequest, NextResponse } from "next/server";
import { bookingInputSchema } from "~/lib/validation/booking";
import { db } from "~/server/db";
import { bookings } from "~/server/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📦 Received:", body);
    const parsed = bookingInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({
        error: "Invalid input",
        issues: parsed.error.format(),
      });
    }

    const { studentEmail, startTime, endTime, timeZone } = parsed.data;

    await db.insert(bookings).values({
      studentEmail,
      startTime,
      endTime,
      timeZone,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[BOOKING_API_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
