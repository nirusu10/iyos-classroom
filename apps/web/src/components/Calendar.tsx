import {
  Calendar,
  dateFnsLocalizer,
  type Event,
  type SlotInfo,
} from 'react-big-calendar'
import { enUS } from 'date-fns/locale'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { Booking } from '@iyos-classroom/types'

type BookingCalendarProps = {
  bookings: Booking[]
  lessonLength: number
  onSlotSelect: (slotInfo: SlotInfo) => void
  onSlotHover: (start: Date | null) => void
  previewSlot: { start: Date; end: Date } | null
}

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const BookingCalendar = ({
  bookings,
  onSlotSelect,
  onSlotHover,
  previewSlot,
}: BookingCalendarProps) => {
  const events: Event[] = bookings.map((booking) => ({
    title: booking.name,
    start: booking.start,
    end: booking.end,
  }))

  if (previewSlot) {
    events.push({
      title: 'Preview',
      start: previewSlot.start,
      end: previewSlot.end,
    })
  }

  return (
    <Calendar
      selectable
      localizer={localizer}
      defaultView='week'
      views={['week', 'day']}
      step={10}
      timeslots={1}
      events={events}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 600, margin: '2rem auto' }}
      onSelectSlot={(slotInfo: SlotInfo) => onSlotSelect(slotInfo)}
      onSelecting={(slotInfo: { start: Date }) => {
        if (!slotInfo.start || !(slotInfo.start instanceof Date)) return false
        onSlotHover(slotInfo.start)
        return true
      }}
      onView={() => onSlotHover(null)}
      onNavigate={() => onSlotHover(null)}
      eventPropGetter={(event) => {
        if (event.title === 'Preview') {
          return {
            style: {
              backgroundColor: 'rgba(15, 118, 110, 0.3)',
              border: '2px dashed #0f766e',
              color: '#0f766e',
              fontStyle: 'italic',
              pointerEvents: 'none',
            },
          }
        }

        return {
          style: {
            backgroundColor: '#0f766e',
            color: 'white',
            fontSize: '0.75rem',
          },
        }
      }}
    />
  )
}

export default BookingCalendar
