'use client'

import { useEffect, useState } from 'react'
import { WEEKDAYS } from '@/lib/constants/weekdays'
import { availabilityArraySchema } from '@/lib/validation/availability'

const DEFAULT_TIME = '09:00'

const AdminAvailabilityPage = () => {
  const [availabilities, setAvailabilities] = useState(() =>
    WEEKDAYS.map((day) => ({ dayOfWeek: day.value, startHour: '', endHour: '' }))
  )
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/availability')
        const data = await res.json()
        setAvailabilities((prev) =>
          prev.map((day) => data.find((a: any) => a.dayOfWeek === day.dayOfWeek) || day)
        )
      } catch (err) {
        console.error('Failed to fetch availability:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [])

  const handleChange = (index: number, field: 'startHour' | 'endHour', value: string) => {
    const updated = [...availabilities]
    updated[index][field] = value
    setAvailabilities(updated)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')
    try {
      const payload = availabilities.filter((a) => a.startHour && a.endHour)

      const parsed = availabilityArraySchema.safeParse(payload)

      if (!parsed.success) {
        const errorMessages = parsed.error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join('\n')
        setMessage(`Validation failed:\n${errorMessages}`)
        setLoading(false)
        return
      }

      const res = await fetch('/api/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Update failed')
      setMessage('Availabilities updated successfully!')
    } catch (err) {
      console.error(err)
      setMessage('Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>Weekly Availability</h1>
      {WEEKDAYS.map((day, index) => (
        <div key={day.value} className='flex items-center gap-4 mb-2'>
          <span className='w-20'>{day.label}</span>
          <input
            type='time'
            value={availabilities[index].startHour || DEFAULT_TIME}
            onChange={(e) => handleChange(index, 'startHour', e.target.value)}
            className='border p-1 rounded'
          />
          <input
            type='time'
            value={availabilities[index].endHour || DEFAULT_TIME}
            onChange={(e) => handleChange(index, 'endHour', e.target.value)}
            className='border p-1 rounded'
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <p className='mt-2 text-sm text-gray-700'>{message}</p>}
    </div>
  )
}

export default AdminAvailabilityPage
