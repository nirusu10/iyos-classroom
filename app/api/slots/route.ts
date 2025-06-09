import connectDB from '@/lib/dbConnect'
import { addMinutes, isBefore, parseISO } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import AvailabilityModel from '@/lib/models/AvailabilityModel'
import BookingModel from '@/lib/models/BookingModel'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const dateParam = searchParams.get('date')
  const timeZone = searchParams.get('timeZone') || 'UTC'

  if (!dateParam || !timeZone) {
    return NextResponse.json({ message: 'Missing ?date param' }, { status: 400 })
  }

  await connectDB()

  const date = parseISO(dateParam)
  const zonedDate = toZonedTime(date, timeZone)
  const dayOfWeek = zonedDate.getDate()

  const availability = await AvailabilityModel.findOne({ dayOfWeek })
  if (!availability) {
    return NextResponse.json({ slots: [] })
  }

  const { startHour, endHour } = availability
  // Construct start and end Date objects in the user’s time zone
  const startLocal = toZonedTime(`${dateParam}T${startHour}`, timeZone)
  const endLocal = toZonedTime(`${dateParam}T${endHour}`, timeZone)

  const slots = []
  let current = startLocal

  while (isBefore(current, endLocal)) {
    const slotEnd = addMinutes(current, 10)
    const startUTC = fromZonedTime(current, timeZone)
    const endUTC = fromZonedTime(slotEnd, timeZone)

    const overlapping = await BookingModel.findOne({
      startTime: { $lt: endUTC },
      endTime: { $gt: startUTC },
      status: 'booked',
    })

    if (!overlapping) {
      slots.push({
        start: startUTC.toISOString(),
        end: endUTC.toISOString(),
      })
    }

    current = slotEnd
  }

  return NextResponse.json({ slots })
}
