import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  type BlockedSlot,
  type Booking,
  type BookingFormData,
  type Status,
  type StoredBlockedSlot,
  type StoredBooking,
} from '../types'

/* Constants */
const STORAGE_KEY = 'bookings'
const BLOCKED_STORAGE_KEY = 'blockedSlots'
const BOOKING_DURATION_MS = 50 * 60 * 1000

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([])
  const [status, setStatus] = useState<Status | null>(null)
  const [latestBookingId, setLatestBookingId] = useState<string | null>(null)

  useEffect(() => {
    const savedBookings = localStorage.getItem(STORAGE_KEY)
    if (savedBookings) {
      try {
        const parsed: StoredBooking[] = JSON.parse(savedBookings)
        const parsedBookings = parsed.map((booking) => {
          return {
            ...booking,
            start: new Date(booking.start),
            end: new Date(booking.end),
          }
        })
        setBookings(
          parsedBookings.sort((a, b) => a.start.getTime() - b.start.getTime())
        )
      } catch (error) {
        console.error('Failed loading bookings from storage', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    const saved = localStorage.getItem(BLOCKED_STORAGE_KEY)
    if (saved) {
      try {
        const parsed: StoredBlockedSlot[] = JSON.parse(saved)
        const parsedBlockedSlots = parsed.map((slot) => ({
          ...slot,
          start: new Date(slot.start),
          end: new Date(slot.end),
        }))
        setBlockedSlots(
          parsedBlockedSlots.sort(
            (a, b) => a.start.getTime() - b.start.getTime()
          )
        )
      } catch (error) {
        console.error('Failed loading blocked slots', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(BLOCKED_STORAGE_KEY, JSON.stringify(blockedSlots))
  }, [blockedSlots])

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  useEffect(() => {
    if (latestBookingId) {
      const timer = setTimeout(() => setLatestBookingId(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [latestBookingId])

  const parseStartEndTime = (
    data: BookingFormData
  ): { start: Date; end: Date } => {
    const start = new Date(`${data.date}T${data.time}`)
    const end = new Date(start.getTime() + BOOKING_DURATION_MS) // 50 minutes = 1000 * 60 * 50 (ms)
    return { start, end }
  }

  const addBooking = (data: BookingFormData) => {
    const { start, end } = parseStartEndTime(data)

    /* Conflict checks */
    if (start < new Date()) {
      setStatus({ type: 'error', message: 'Please select a future date.' })
      return false
    }

    const isOverlapping = bookings.some(
      (booking) => start < booking.end && end > booking.start
    )
    if (isOverlapping) {
      setStatus({ type: 'error', message: 'Time slot is already booked.' })
      return false
    }

    if (isOverlappingBlockedSlots(start, end)) {
      setStatus({
        type: 'error',
        message: 'This time is blocked and cannot be booked.',
      })
      return false
    }

    const newBooking: Booking = {
      id: uuidv4(),
      name: data.name,
      start,
      end,
    }

    setBookings((prev) => [...prev, newBooking])
    setLatestBookingId(newBooking.id)
    setStatus({ type: 'success', message: 'Booking successful!' })
    return true
  }

  const removeBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id))
    setStatus({ type: 'success', message: 'Booking removed.' })
  }

  const isOverlappingBlockedSlots = (start: Date, end: Date) => {
    return blockedSlots.some((slot) => start < slot.end && end > slot.start)
  }

  const addBlockedSlot = (slot: BlockedSlot) => {
    setBlockedSlots((prev) => [...prev, slot])
  }

  const removeBlockedSlot = (id: string) => {
    setBlockedSlots((prev) => prev.filter((slot) => slot.id !== id))
  }

  return {
    bookings,
    addBooking,
    status,
    setStatus,
    blockedSlots,
    addBlockedSlot,
    removeBlockedSlot,
    removeBooking,
    latestBookingId,
  }
}
