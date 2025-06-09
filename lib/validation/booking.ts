import { z } from 'zod'
import { isFutureDateInZone } from '@/lib/utils/dateValidation'

export const bookingSchema = z
  .object({
    studentEmail: z.string().email('Valid email is required'),
    startTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'startTime must be a valid ISO date string'),
    endTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'endTime must be a valid ISO date string'),
    timeZone: z.string().min(1, 'Time zone is required'),
  })
  .refine((data) => isFutureDateInZone(data.startTime, data.timeZone), {
    message: 'Start time must be in the future',
    path: ['startTime'],
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: 'End time must be after start time',
    path: ['endTime'],
  })

export type BookingInput = z.infer<typeof bookingSchema>
