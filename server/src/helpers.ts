import { addMinutes } from 'date-fns'

export const getStartEnd = (
  date: string,
  time: string,
  duration: number
): { start: string; end: string } | null => {
  const [hour, minute] = time.split(':').map(Number)
  const local = new Date(date)
  local.setHours(hour, minute, 0, 0)

  const end = addMinutes(local, duration)

  return {
    start: local.toISOString(), // Converts to UTC correctly
    end: end.toISOString(),
  }
}
