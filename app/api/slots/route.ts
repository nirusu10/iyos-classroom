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
  try {
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
    const berlinDate = toZonedTime(baseDate, 'Europe/Berlin')
    const dayOfWeek = berlinDate.getDay()

    const availability = await AvailabilityModel.findOne({ dayOfWeek })
    if (!availability) {
      return NextResponse.json({ slots: [] }, { status: 200 })
    }

    const [startH, startM] = availability.startHour.split(':').map(Number)
    const [endH, endM] = availability.endHour.split(':').map(Number)

    const startLocal = setMinutes(setHours(setSeconds(berlinDate, 0), startH), startM)
    const endLocal = setMinutes(setHours(setSeconds(berlinDate, 0), endH), endM)

    const slots = []
    let current = startLocal

    while (isBefore(addMinutes(current, 50), endLocal)) {
      const slotEnd = addMinutes(current, 50)
      const startUTC = fromZonedTime(current, 'Europe/Berlin')
      const endUTC = fromZonedTime(slotEnd, 'Europe/Berlin')

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

      current = addMinutes(current, 10)
    }

    return NextResponse.json({ slots }, { status: 200 })
  } catch (err) {
    console.error('❌ API Error in /api/slots:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
