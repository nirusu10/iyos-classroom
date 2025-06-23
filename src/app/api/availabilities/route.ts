import { sql } from "drizzle-orm";
import { success } from "zod/v4";
import { availabilitiesSchema } from "~/lib/validation/schemas";
import { db } from "~/server/db";
import { availabilities } from "~/server/db/schema";

export async function POST(request: Request) {
  const body = await request.json();

  const result = availabilitiesSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Invalid availability data",
        details: result.error,
      },
      { status: 400 },
    );
  }

  const data = result.data.map((entry) => ({
    ...entry,
    createdAt: sql`(unixepoch())`,
    updatedAt: sql`(unixepoch())`,
  }));

  try {
    await db.insert(availabilities).values(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to save availabilities" });
  }
}
