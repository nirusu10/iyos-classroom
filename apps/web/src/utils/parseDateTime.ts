import type { BookingFormData } from '../types'

export const parseDateTime = (formData: BookingFormData) => {
  const [year, month, day] = formData.date.split('-').map(Number)
  const [hours, minutes] = formData.time.split(':').map(Number)
  const startDate = new Date(year, month - 1, day, hours, minutes)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

  return [startDate, endDate]
}
