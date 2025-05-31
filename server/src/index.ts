import express = require('express')
import cors = require('cors')
import { v4 as uuidv4 } from 'uuid'
import {
  parseISO,
  addMinutes,
  isBefore,
  areIntervalsOverlapping,
  isValid,
} from 'date-fns'
import { StoredBlockedSlot, StoredBooking } from '@iyos-classroom/types'
import { readData, writeData } from './dataStore'
import { getStartEnd } from './helpers'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

const BOOKING_DURATION_MS = 50 * 60 * 1000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from the backend!')
})

app.get(
  '/api/bookings',
  async (req: express.Request, res: express.Response) => {
    try {
      const data = await readData()
      res.json(data.bookings)
    } catch (error) {
      res.status(500).json({ error: 'Failed to read bookings' })
    }
  }
)

app.post(
  '/api/bookings',
  async (
    req: express.Request<{}, {}, { name: string; date: string; time: string }>,
    res: express.Response
  ) => {
    const { name, date, time } = req.body
    if (!name || !date || !time) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const { start, end } = getStartEnd(date, time, BOOKING_DURATION_MS)

    if (!isValid(start)) {
      return res.status(400).json({ error: 'Invalid date or time format' })
    }

    if (isBefore(start, new Date())) {
      return res.status(400).json({ error: 'Please select a future date' })
    }

    const data = await readData()

    const hasBookingOverlap = data.bookings.some((booking) =>
      areIntervalsOverlapping(
        { start, end },
        { start: parseISO(booking.start), end: parseISO(booking.end) }
      )
    )

    if (hasBookingOverlap) {
      return res.status(409).json({ error: 'Time slot already booked' })
    }

    // Blocked slots
    const hasBlockedOverlap = data.blockedSlots.some((slot) =>
      areIntervalsOverlapping(
        { start, end },
        { start: parseISO(slot.start), end: parseISO(slot.end) }
      )
    )

    if (hasBlockedOverlap) {
      return res
        .status(409)
        .json({ error: 'This time is blocked and cannot be booked' })
    }

    const newBooking: StoredBooking = {
      id: uuidv4(),
      name,
      start: start.toISOString(),
      end: end.toISOString(),
    }

    data.bookings.push(newBooking)

    await writeData(data)

    res.status(201).json(newBooking)
  }
)

app.delete(
  '/api/bookings/:id',
  async (req: express.Request<{ id: string }>, res: express.Response) => {
    const { id } = req.params
    const data = await readData()
    const index = data.bookings.findIndex((b) => b.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Booking not found.' })
    }
    data.bookings.splice(index, 1)
    await writeData(data)
    res.json({ message: 'Booking removed' })
  }
)

app.get(
  '/api/blocked-slots',
  async (req: express.Request, res: express.Response) => {
    try {
      const data = await readData()
      res.json(data.blockedSlots)
    } catch (error) {
      res.status(500).json({ error: 'Failed to read blocked slots' })
    }
  }
)

app.post(
  '/api/blocked-slots',
  async (
    req: express.Request<
      {},
      {},
      { date: string; time: string; duration: number }
    >,
    res: express.Response
  ) => {
    const { date, time, duration } = req.body
    if (!date || !time) {
      return res.status(400).json({ error: 'Missing fields' })
    }
    const { start, end } = getStartEnd(date, time, duration)

    if (!duration || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Invalid duration' })
    }

    if (!isValid(start)) {
      return res.status(400).json({ error: 'Invalid date or time format' })
    }

    if (isBefore(start, new Date())) {
      return res.status(400).json({ error: 'Please select a future date' })
    }

    const data = await readData()

    // Check for conflicts
    const hasOverlap =
      data.bookings.some((booking) =>
        areIntervalsOverlapping(
          { start, end },
          { start: parseISO(booking.start), end: parseISO(booking.end) }
        )
      ) ||
      data.blockedSlots.some((slot) =>
        areIntervalsOverlapping(
          { start, end },
          { start: parseISO(slot.start), end: parseISO(slot.end) }
        )
      )

    if (hasOverlap) {
      return res.status(409).json({
        error: 'This time overlaps with an existing booking or blocked slot',
      })
    }

    // save blocked slot
    const newBlockedSlot: StoredBlockedSlot = {
      id: uuidv4(),
      start: start.toISOString(),
      end: end.toISOString(),
    }

    data.blockedSlots.push(newBlockedSlot)
    await writeData(data)
    res.status(201).json(newBlockedSlot)
  }
)

app.delete(
  '/api/blocked-slots/:id',
  async (req: express.Request<{ id: string }>, res: express.Response) => {
    const { id } = req.params
    const data = await readData()
    const index = data.blockedSlots.findIndex((slot) => slot.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Blocked slot not found' })
    }
    data.blockedSlots.splice(index, 1)
    await writeData(data)
    res.json({ message: 'Blocked slot removed' })
  }
)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
