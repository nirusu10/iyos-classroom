import type { BookingFormData } from '@iyos-classroom/types'
import { useState, type ChangeEvent, type FormEvent } from 'react'

type BookingFormProps = {
  onSubmit: (data: BookingFormData) => boolean | void
}

const BookingForm = ({ onSubmit }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    date: '',
    time: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form input: ', formData.date, formData.time)
    const success = onSubmit(formData)
    if (success) {
      setFormData({ name: '', date: '', time: '' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 bg-slate-200 rounded-lg items-center px-8 py-4 mt-8 shadow'
    >
      <label htmlFor='name' className='text-lg font-semibold'>
        Name:
      </label>
      <input
        type='text'
        name='name'
        id='name'
        className='w-full sm:w-sm border rounded bg-white p-2'
        required
        onChange={handleChange}
        value={formData.name}
      />
      <label htmlFor='date' className='text-lg font-semibold'>
        Date:
      </label>
      <input
        type='date'
        name='date'
        id='date'
        className='w-full sm:w-sm border rounded bg-white p-2'
        required
        onChange={handleChange}
        value={formData.date}
      />
      <label htmlFor='time' className='text-lg font-semibold'>
        Time:
      </label>
      <input
        type='time'
        name='time'
        id='time'
        className='w-full sm:w-sm border rounded bg-white p-2'
        required
        onChange={handleChange}
        value={formData.time}
      />
      <button
        type='submit'
        className='px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition'
      >
        Book lesson
      </button>
    </form>
  )
}

export default BookingForm
