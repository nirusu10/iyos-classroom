import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/dbConnect'
import AvailabilityModel from '@/lib/models/AvailabilityModel'
import { availabilityArraySchema } from '@/lib/validation/availability'

export const GET = async () => {
  await connectDB()
  const availabilities = await AvailabilityModel.find().lean()
  return NextResponse.json(availabilities)
}

export const PUT = async (req: NextRequest) => {
  await connectDB()

  let updates
  try {
    const json = await req.json()
    updates = availabilityArraySchema.parse(json)
  } catch (err) {
    return NextResponse.json({ message: 'Invalid availability input', error: err }, { status: 400 })
  }

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
