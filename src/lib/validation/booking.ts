import { z } from "zod";

export const bookingInputSchema = z.object({
  studentEmail: z.string().email("Valid email required"),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "startTime must be a valid ISO date string",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "endTime must be a valid ISO date string",
  }),
  timeZone: z.string().min(1, "Time zone is required"),
});

export type BookingInput = z.infer<typeof bookingInputSchema>;
