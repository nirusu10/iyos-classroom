import connectDB from '@/lib/dbConnect'
import AvailabilityModel from '@/lib/models/AvailabilityModel'
import { availabilityArraySchema } from '@/lib/validation/availability'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  await connectDB()
  const availabilities = await AvailabilityModel.find().lean()
  return NextResponse.json(availabilities)
}

export const PUT = async (req: NextRequest) => {
  await connectDB()
  const body = await req.json()

  const parsed = availabilityArraySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const updates = parsed.data

  for (const entry of updates) {
    const { dayOfWeek, startHour, endHour } = entry
    await AvailabilityModel.findOneAndUpdate(
      { dayOfWeek },
      { startHour, endHour },
      { upsert: true, new: true }
    )
  }
  return NextResponse.json({ message: 'Availability updated' }, { status: 200 })
}
