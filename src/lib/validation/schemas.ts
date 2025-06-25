import { z } from "zod/v4";

export const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email required"),
});

export const availabilitySchema = z
  .object({
    teacherId: z.number(),
    weekday: z.number().min(0).max(6),
    startTimeMinutes: z.number().min(0).max(1439),
    endTimeMinutes: z.number().min(1).max(1440),
  })
  .refine((data) => data.startTimeMinutes < data.endTimeMinutes, {
    error: "Start time must be before end time",
  });

export const availabilitiesSchema = z.array(availabilitySchema);

export const availabilityExceptionSchema = z.object({
  teacherId: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  isAvailable: z.boolean(),
});

export const availableSlotsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // 'YYYY-MM-DD'
  timeZone: z.string(), // TZ like 'Europe/Berlin'
});

export const bookingSchema = z.object({
  teacherId: z.number(),
  studentEmail: z.email(),
  studentName: z.string().min(1),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    error: "Start time must be a valid ISO string",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    error: "End time must be a valid ISO string",
  }),
  timeZone: z.string().min(1, "Time zone is required"),
});

export type StudentInput = z.infer<typeof studentSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type AvailabilityInput = z.infer<typeof availabilitySchema>;
export type AvailabilityExceptionInput = z.infer<
  typeof availabilityExceptionSchema
>;
export type AvailableSlotsInput = z.infer<typeof availableSlotsSchema>;
