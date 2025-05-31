import type {
  BlockedSlot,
  Booking,
  BookingFormData,
} from '@iyos-classroom/types'

const API_BASE = 'http://localhost:4000/api'

// Bookings
export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${API_BASE}/bookings`)
  if (!res.ok) throw new Error('Failed to fetch bookings')
  const data = await res.json()
  return data
}

export const postBooking = async (
  bookingData: BookingFormData
): Promise<Booking> => {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || 'Failed to create booking')
  }

  const newBooking: Booking = await res.json()
  return newBooking
}

export const deleteBooking = async (id: string) => {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete booking')
  const data = res.json()
  return data
}

// Blocked Slots
export const getBlockedSlots = async (): Promise<BlockedSlot[]> => {
  const res = await fetch(`${API_BASE}/blocked-slots`)
  if (!res.ok) throw new Error('Failed to fetch blocked slots')
  const data = res.json()
  return data
}
