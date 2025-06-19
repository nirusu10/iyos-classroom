import { NextResponse, type NextRequest } from "next/server";
import { availabilityInputSchema } from "~/lib/validation/availability";
import { db } from "~/server/db";
import { availability } from "~/server/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = availabilityInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.format() },
        { status: 400 },
      );
    }

    const { weekday, startTime, endTime, timeZone } = parsed.data;

    await db.insert(availability).values({
      weekday,
      startTime,
      endTime,
      timeZone,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("AVAILABILITY_API_ERROR", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
