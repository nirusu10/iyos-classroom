import { z } from 'zod'

export const slotSchema = z.object({
  start: z.string().datetime(), // ISO string
  end: z.string().datetime(),
})

export const slotsResponseSchema = z.object({
  slots: z.array(slotSchema),
})

export type Slot = z.infer<typeof slotSchema>
