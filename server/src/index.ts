import express = require('express')
import cors = require('cors')
import { v4 as uuidv4 } from 'uuid'
import { parseISO, isBefore, areIntervalsOverlapping, isValid } from 'date-fns'
import { BlockedSlot, Booking } from '@iyos-classroom/types'
import { readData, writeData } from './dataStore'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

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
    req: express.Request<{}, {}, { name: string; start: string; end: string }>,
    res: express.Response
  ) => {
    const { name, start, end } = req.body
    if (!name || !start || !end) {
      console.error('Missing fields in booking request:', req.body)
      return res.status(400).json({ message: 'Missing fields' })
    }

    if (!isValid(parseISO(start)) || !isValid(parseISO(end))) {
      console.error('Invalid time format')
      return res.status(400).json({ message: 'Invalid time format' })
    }

    const startDate = parseISO(start)
    const endDate = parseISO(end)

    if (isBefore(startDate, new Date())) {
      console.error('Start date already in the past.')
      return res.status(400).json({ message: 'Please select a future date' })
    }

    const data = await readData()

    const hasBookingOverlap = data.bookings.some((booking) =>
      areIntervalsOverlapping(
        { start: startDate, end: endDate },
        { start: parseISO(booking.start), end: parseISO(booking.end) }
      )
    )

    if (hasBookingOverlap) {
      return res.status(409).json({ message: 'Time slot already booked' })
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
        .json({ message: 'This time is blocked and cannot be booked' })
    }

    const newBooking: Booking = {
      id: uuidv4(),
      name,
      start,
      end,
    }

    try {
      data.bookings.push(newBooking)
      await writeData(data)
      res.status(201).json(newBooking)
    } catch (error) {
      console.error('Error adding booking: ', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
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
    req: express.Request<{}, {}, { name: string; start: string; end: string }>,
    res: express.Response
  ) => {
    const { name, start, end } = req.body
    if (!name || !start || !end) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const startDate = parseISO(start)
    const endDate = parseISO(end)

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Please select a future date' })
    }

    const data = await readData()

    // Check for conflicts
    const hasOverlap =
      data.bookings.some((booking) =>
        areIntervalsOverlapping(
          { start: startDate, end: endDate },
          { start: parseISO(booking.start), end: parseISO(booking.end) }
        )
      ) ||
      data.blockedSlots.some((slot) =>
        areIntervalsOverlapping(
          { start: startDate, end: endDate },
          { start: parseISO(slot.start), end: parseISO(slot.end) }
        )
      )

    if (hasOverlap) {
      return res.status(409).json({
        error: 'This time overlaps with an existing booking or blocked slot',
      })
    }

    // save blocked slot
    const newBlockedSlot: BlockedSlot = {
      id: uuidv4(),
      start: start,
      end: end,
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app
