import { useEffect, useState } from 'react'
import {
  type BlockedSlot,
  type Booking,
  type BookingFormData,
  type Status,
} from '@iyos-classroom/types'
import {
  deleteBooking,
  getBlockedSlots,
  getBookings,
  postBooking,
} from '../api'

/* Constants */
const BOOKING_DURATION_MS = 50 * 60 * 1000

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([])
  const [status, setStatus] = useState<Status | null>(null)
  const [loading, setLoading] = useState(false)
  const [latestBookingId, setLatestBookingId] = useState<string | null>(null)

  const convertToBookingDates = (data: Booking[]) => {
    return data.map((booking) => ({
      ...booking,
      start: new Date(booking.start),
      end: new Date(booking.end),
    }))
  }

  const convertToBlockedSlotDates = (data: BlockedSlot[]) => {
    return data.map((booking) => ({
      ...booking,
      start: new Date(booking.start),
      end: new Date(booking.end),
    }))
  }

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const [bookingsData, blockedSlotsData] = await Promise.all([
        getBookings(),
        getBlockedSlots(),
      ])
      setBookings(convertToBookingDates(bookingsData))
      setBlockedSlots(convertToBlockedSlotDates(blockedSlotsData))
      setStatus(null)
    } catch {
      setStatus({ type: 'error', message: 'Failed to load data from server.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const parseStartEndTime = (
    data: BookingFormData
  ): { start: Date; end: Date } => {
    console.log('Input date:', data.date)
    console.log('Input time:', data.time)
    const start = new Date(`${data.date}T${data.time}:00.000Z`)
    console.log('Start Date:', start.toString())
    console.log('Start Date ISO:', start.toISOString())
    const end = new Date(start.getTime() + BOOKING_DURATION_MS) // 50 minutes = 1000 * 60 * 50 (ms)
    return { start, end }
  }

  const addBooking = async (data: BookingFormData) => {
    const { start, end } = parseStartEndTime(data)

    /* Conflict checks */
    if (start < new Date()) {
      setStatus({ type: 'error', message: 'Please select a future date.' })
      return false
    }

    if (bookings.some((b) => start < b.end && end > b.start)) {
      setStatus({ type: 'error', message: 'Time slot is already booked.' })
      return false
    }

    if (blockedSlots.some((slot) => start < slot.end && end > slot.start)) {
      setStatus({
        type: 'error',
        message: 'This time is blocked and cannot be booked.',
      })
      return false
    }

    try {
      const newBooking = await postBooking({
        name: data.name,
        date: data.date,
        time: data.time,
      })

      setBookings((prev) => [
        ...prev,
        {
          ...newBooking,
          start: new Date(newBooking.start),
          end: new Date(newBooking.end),
        },
      ])
      setLatestBookingId(newBooking.id)
      setStatus({ type: 'success', message: 'Booking successful!' })
      return true
    } catch (error) {
      console.error('Error adding booking:', error)
      setStatus({ type: 'error', message: 'Failed to add booking.' })
      return false
    }
  }

  const removeBooking = async (id: string) => {
    try {
      await deleteBooking(id)
      setStatus({ type: 'success', message: 'Booking deleted successfully' })
      setBookings((prev) => prev.filter((booking) => booking.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting booking:', error)
      setStatus({ type: 'error', message: 'Failed to delete booking.' })
      return false
    }
  }

  return {
    bookings,
    addBooking,
    status,
    setStatus,
    blockedSlots,
    latestBookingId,
    loading,
    removeBooking,
  }
}
