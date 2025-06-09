import connectDB from '@/lib/dbConnect'
import { addMinutes, isBefore, parseISO, setHours, setMinutes, setSeconds } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import AvailabilityModel from '@/lib/models/AvailabilityModel'
import BookingModel from '@/lib/models/BookingModel'
import { z } from 'zod'

const querySchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format. Must be ISO 8601.',
  }),
  timeZone: z.string().min(1, 'Time zone is required'),
})

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const timeZone = searchParams.get('timeZone') || 'UTC'

  const parseResult = querySchema.safeParse({ date, timeZone })

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.format() }, { status: 400 })
  }

  const { date: dateParam } = parseResult.data

  await connectDB()

  const baseDate = parseISO(dateParam)
  const zonedDate = toZonedTime(baseDate, timeZone)
  const dayOfWeek = zonedDate.getDay()

  const availability = await AvailabilityModel.findOne({ dayOfWeek })
  if (!availability) {
    return NextResponse.json({ slots: [] }, { status: 200 })
  }

  const [startH, startM] = availability.startHour.split(':').map(Number)
  const [endH, endM] = availability.endHour.split(':').map(Number)

  // Construct start and end Date objects in the user’s time zone
  const startLocal = setMinutes(
    setHours(setSeconds(toZonedTime(baseDate, timeZone), 0), startH),
    startM
  )
  const endLocal = setMinutes(setHours(setSeconds(toZonedTime(baseDate, timeZone), 0), endH), endM)

  const slots = []
  let current = startLocal

  while (isBefore(addMinutes(current, 50), endLocal)) {
    const slotEnd = addMinutes(current, 50)

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

    current = addMinutes(current, 10) // move forward by 10 mins
  }

  return NextResponse.json({ slots }, { status: 200 })
}
