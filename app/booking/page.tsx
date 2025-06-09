'use client'

import { BookingInput, bookingSchema } from '@/lib/validation/booking'
import { slotsResponseSchema } from '@/lib/validation/slotSchema'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { FormEvent, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function Booking() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [chosenStart, setChosenStart] = useState('')
  const [slots, setSlots] = useState<{ start: string; end: string }[]>([])
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [locale, setLocale] = useState('en-US')

  useEffect(() => {
    const today = new Date()
    setSelectedDay(today)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocale(navigator.language || 'en-US')
    }
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDay) return
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const formattedDate = selectedDay.toISOString().split('T')[0] // YYYY-MM-DD

      try {
        const res = await fetch(`/api/slots?date=${formattedDate}&timeZone=${userTimeZone}`)
        if (!res.ok) throw new Error('Failed to fetch slots')
        const { slots } = slotsResponseSchema.parse(await res.json())
        console.log(slots)
        setSlots(slots)
      } catch (err) {
        console.error('COULD NOT FETCH SLOTS:', err)
      }
    }

    fetchSlots()
  }, [selectedDay])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const selectedSlot = slots.find((slot) => slot.start === chosenStart)

    if (!selectedSlot) {
      setMessage('Please select a valid time slot.')
      setSubmitting(false)
      return
    }

    const payload: BookingInput = {
      studentEmail: email,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      timeZone,
    }

    const parsed = bookingSchema.safeParse(payload)

    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message).join(', ')
      setMessage(`Validation failed: ${issues}`)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to book lesson')

      setMessage('🎉 Booking successful!')
      setChosenStart('')
      setEmail('')
    } catch (err) {
      console.error(err)
      setMessage('Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <section>
        <h1>Book your Japanese lesson</h1>
        <p>Pick a date, choose a time and book your lesson!</p>
      </section>
      <section>
        <h2>Pick a date</h2>
        <Calendar value={selectedDay} onClickDay={(day) => setSelectedDay(day)} locale={locale} />
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Enter info</h2>
          <div>
            <label htmlFor='startTime' className='block font-medium'>
              Start time
            </label>
            <select
              id='startTime'
              value={chosenStart}
              onChange={(e) => setChosenStart(e.target.value)}
              required
              className='border rounded px-2 py-1 w-full'
            >
              <option value=''>Select a time</option>
              {slots.map((slot) => {
                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
                const zonedStart = toZonedTime(new Date(slot.start), userTimeZone)

                return (
                  <option key={slot.start} value={slot.start}>
                    {formatInTimeZone(zonedStart, userTimeZone, 'HH:mm')}{' '}
                    {/* better than toLocaleTimeString */}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label htmlFor='email' className='block font-medium'>
              Your email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='border rounded px-2 py-1 w-full'
            />
          </div>
          <button
            type='submit'
            disabled={submitting}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            {submitting ? 'Booking...' : 'Book Lesson'}
          </button>

          {message && <p className='text-sm text-gray-700 mt-2'>{message}</p>}
        </form>
      </section>
    </main>
  )
}
