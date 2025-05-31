import { useState } from 'react'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import StatusMessage from '../components/StatusMessage'
import { useBookings } from '../hooks/useBooking'
import type { BookingFormData } from '../types'

const BookingPage = () => {
  const { bookings, addBooking, status, removeBooking, latestBookingId } =
    useBookings()
  const [isAdminView, setIsAdminView] = useState(false)

  const toggleAdminView = () => {
    setIsAdminView((prev) => !prev)
  }

  const handleBookingSubmit = (data: BookingFormData) => {
    addBooking(data)
  }

  return (
    <main className='max-w-4xl mx-auto p-4'>
      <header>
        {isAdminView && (
          <p className='text-sm text-red-600 font-semibold mt-2'>
            Admin View Enabled
          </p>
        )}
        <h1 className='text-3xl text-center mt-8'>Book a lesson</h1>
        <StatusMessage status={status} />
      </header>
      <section>
        <BookingForm onSubmit={handleBookingSubmit} />
      </section>
      <section className='mt-8'>
        <h2 className='text-lg font-semibold'>Upcoming Bookings</h2>
        <div className='flex justify-end mt-4'>
          <button
            onClick={toggleAdminView}
            className='text-sm text-white bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded'
          >
            {isAdminView ? 'Switch to Student View' : 'Switch to Admin View'}
          </button>
        </div>
        <BookingList
          bookings={bookings}
          showNames={isAdminView}
          onDelete={isAdminView ? removeBooking : undefined}
          latestBookingId={latestBookingId}
        />
      </section>
    </main>
  )
}

export default BookingPage
