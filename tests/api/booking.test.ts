import { GET, POST } from '@/app/api/booking/route'
import { addMinutes, subMinutes } from 'date-fns'
import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

describe('Test booking routes', () => {
  describe('POST /api/bookings', () => {
    it('successfully creates a valid booking', async () => {
      const startTime = addMinutes(new Date(), 1)
      const endTime = addMinutes(startTime, 50)

      const newBooking = {
        studentName: 'Nils Matic',
        startTime,
        endTime,
        timeZone: 'Europe/Berlin',
      }

      const request = new NextRequest(new URL('http://localhost'), {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(request)
      expect(res.status).toBe(201)

      const data = await res.json()
      expect(data).toHaveProperty('startTime')
      expect(data.studentName).toMatch('Nils Matic')
    })

    it('returns status 409 when trying to book a booking that overlaps', async () => {
      const startTimeFirst = addMinutes(new Date(), 30) // Make sure we put the new booking enough into the future to have room to put the second booking
      const endTimeFirst = addMinutes(startTimeFirst, 50)

      const startTimeSecond = subMinutes(startTimeFirst, 10)
      const endTimeSecond = addMinutes(startTimeSecond, 50)

      const firstBooking = {
        studentName: 'Nils Matic',
        startTime: startTimeFirst,
        endTime: endTimeFirst,
        timeZone: 'Europe/Berlin',
      }

      const secondBooking = {
        studentName: 'Nils Matic',
        startTime: startTimeSecond,
        endTime: endTimeSecond,
        timeZone: 'Europe/Berlin',
      }

      const firstRequest = new NextRequest(new URL('http://localhost'), {
        method: 'POST',
        body: JSON.stringify(firstBooking),
        headers: { 'Content-Type': 'application/json' },
      })

      await POST(firstRequest)

      const secondRequest = new NextRequest(new URL('htttp://localhost'), {
        method: 'POST',
        body: JSON.stringify(secondBooking),
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await POST(secondRequest)

      expect(res.status).toBe(409)
      const data = await res.json()
      expect(data.message).toMatch('This time is already booked.')
    })

    it('returns status 409 when startTime is in the past', async () => {
      const now = new Date()
      const startTime = subMinutes(now, 10)
      const endTime = addMinutes(startTime, 50)

      const newBooking = {
        studentName: 'Nils Matic',
        startTime,
        endTime,
        timeZone: 'Europe/Berlin',
      }

      const request = new NextRequest(new URL('http://localhost'), {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await POST(request)
      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.error).toBeDefined()
      expect(data.error.fieldErrors.startTime?.[0]).toMatch('Start time must be in the future')
    })

    it('returns status 400 when body is incomplete', async () => {
      const startTime = new Date()

      const newBooking = {
        studentName: 'Nils Matic',
        startTime,
      }

      const request = new NextRequest(new URL('http://localhost'), {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await POST(request)
      expect(res.status).toBe(400)
      const data = await res.json()

      expect(data.error).toHaveProperty('fieldErrors')
      expect(data.error.fieldErrors).toHaveProperty('endTime')
      expect(data.error.fieldErrors.endTime[0]).toMatch(/required/i)
    })
  })

  describe('GET /api/bookings', () => {
    it('returns a list of bookings', async () => {
      const response = await GET()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)
    })
  })
})
