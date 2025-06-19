import { z } from "zod";

export const availabilityInputSchema = z.object({
  weekday: z.number().int().min(0).max(6).describe("0 = Sunday, 6 = Saturday"),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Must be in HH:mm format"),

  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Must be in HH:mm format"),

  timeZone: z.string().min(1),
});

export type AvailabilityInput = z.infer<typeof availabilityInputSchema>;
