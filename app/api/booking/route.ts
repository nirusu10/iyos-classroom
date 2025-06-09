import connectDB from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import BookingModel from '@/lib/models/BookingModel'
import { bookingSchema } from '@/lib/validation/booking'
import { fromZonedTime } from 'date-fns-tz'

export const POST = async (req: NextRequest) => {
  await connectDB()

  const body = await req.json()
  const parsed = bookingSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { studentName, startTime, endTime, timeZone } = parsed.data

  const startTimeUtc = fromZonedTime(startTime, timeZone)
  const endTimeUtc = fromZonedTime(endTime, timeZone)

  const isOverlapping = await BookingModel.findOne({
    status: 'booked',
    startTime: { $lt: endTimeUtc },
    endTime: { $gt: startTimeUtc },
  })

  if (isOverlapping) {
    return NextResponse.json({ message: 'This time is already booked.' }, { status: 409 })
  }

  const newBooking = await BookingModel.create({
    studentName,
    startTime: startTimeUtc,
    endTime: endTimeUtc,
    status: 'booked',
  })

  return NextResponse.json(newBooking, { status: 201 })
}

export const GET = async () => {
  await connectDB()
  const bookings = await BookingModel.find().sort({ startTime: 1 })

  return NextResponse.json(bookings, { status: 200 })
}
