import { z } from 'zod'

export const availabilitySchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    startHour: z.string().regex(/^([01]\d|2[0-3]):00$/, {
      message: 'Start time must be in HH:00 format',
    }),
    endHour: z.string().regex(/^([01]\d|2[0-3]):00$/, {
      message: 'End time must be in HH:00 format',
    }),
  })
  .refine((data) => parseInt(data.startHour) < parseInt(data.endHour), {
    message: 'End hour must be after start hour',
    path: ['endHour'],
  })

export const availabilityArraySchema = z.array(availabilitySchema)

export type AvailabilityInput = z.infer<typeof availabilitySchema>
