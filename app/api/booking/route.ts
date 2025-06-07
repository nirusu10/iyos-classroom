import connectDB from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import { isBefore } from 'date-fns'
import BookingModel from '@/lib/models/BookingModel'

export const POST = async (req: NextRequest) => {
  await connectDB()

  const { studentName, startTime: reqStartTime, endTime: reqEndTime } = await req.json()

  if (!studentName || !reqStartTime || !reqEndTime) {
    return NextResponse.json({ message: 'Missing information in request' }, { status: 400 })
  }

  const startTimeDate = new Date(reqStartTime)
  const endTimeDate = new Date(reqEndTime)

  if (isBefore(startTimeDate, new Date())) {
    return NextResponse.json({ message: 'Start date cannot be in the past.' }, { status: 409 })
  }

  const isOverlapping = await BookingModel.findOne({
    status: 'booked',
    startTime: { $lt: endTimeDate },
    endTime: { $gt: startTimeDate },
  })

  if (isOverlapping) {
    return NextResponse.json({ message: 'This time is already booked.' }, { status: 409 })
  }

  const newBooking = await BookingModel.create({
    studentName,
    startTime: startTimeDate,
    endTime: endTimeDate,
    status: 'booked',
  })

  return NextResponse.json(newBooking, { status: 201 })
}

export const GET = async () => {
  await connectDB()
  const bookings = await BookingModel.find().sort({ startTime: 1 })

  return NextResponse.json(bookings, { status: 200 })
}
