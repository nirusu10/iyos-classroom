export type BookingFormData = {
  name: string
  date: string
  time: string
}

export type Booking = {
  id: string
  name: string
  start: Date
  end: Date
}

export type StoredBooking = {
  id: string
  name: string
  start: string // ISO date string
  end: string // ISO date string
}

export type StoredBlockedSlot = {
  id: string
  start: string // ISO date string
  end: string // ISO date string
}

export type Status = {
  type: 'error' | 'success'
  message: string
}

export type BlockedSlot = {
  id: string
  start: Date
  end: Date
  reason?: string // optional note, e.g. "Teacher unavailable"
}
