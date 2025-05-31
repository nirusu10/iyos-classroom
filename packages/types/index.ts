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

export type StoredBooking = Omit<Booking, 'start' | 'end'> & {
  start: string
  end: string
}

export type StoredBlockedSlot = Omit<BlockedSlot, 'start' | 'end'> & {
  start: string
  end: string
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
