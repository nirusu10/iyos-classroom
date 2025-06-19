import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { generateSlotsForDate } from "~/lib/slots";
import { db } from "~/server/db";
import { availability } from "~/server/db/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Missing date param" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const weekday = date.getDay();

  const dayAvailability = await db
    .select()
    .from(availability)
    .where(eq(availability.weekday, weekday));

  const slots = generateSlotsForDate({
    date,
    weekdayAvailability: dayAvailability,
  });

  return NextResponse.json({ slots });
}
