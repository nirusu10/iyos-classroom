import { z } from 'zod'

export const availabilitySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startHour: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm expected)'),
  endHour: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm expected)'),
})

export const availabilityArraySchema = z.array(availabilitySchema)

export type AvailabilityInput = z.infer<typeof availabilitySchema>
