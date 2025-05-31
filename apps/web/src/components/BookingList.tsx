import type { Booking } from '../types'

type BookingListProps = {
  bookings: Booking[]
  showNames?: boolean
  onDelete?: (id: string) => void
  latestBookingId?: string
}

const BookingList = ({
  bookings,
  showNames = false,
  onDelete,
  latestBookingId,
}: BookingListProps) => {
  if (bookings.length === 0) {
    return <p className='text-gray-600 italic'>No bookings yet.</p>
  }

  return (
    <ul className='space-y-4 mt-4'>
      {bookings
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .map((booking) => (
          <li
            key={booking.id}
            className={`bg-white rounded-lg shadow p-4 flex justify-between items-center transition-all duration-500 ${
              booking.id === latestBookingId
                ? 'bg-green-100 animate-pulse'
                : 'bg-white'
            }`}
          >
            <div>
              <p className='font-semibold'>
                {booking.start.toLocaleDateString()} –{' '}
                {booking.start.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                to{' '}
                {booking.end.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              {showNames && (
                <p className='text-gray-700 text-sm'>
                  Booked by: {booking.name}
                </p>
              )}
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(booking.id)}
                className='text-sm text-red-600 hover:underline'
              >
                Delete
              </button>
            )}
          </li>
        ))}
    </ul>
  )
}

export default BookingList
