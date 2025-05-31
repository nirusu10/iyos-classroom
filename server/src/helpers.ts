import { addMinutes, parseISO } from 'date-fns'

export const getStartEnd = (date: string, time: string, duration: number) => {
  const startISO = `${date}T${time}`
  const start = parseISO(startISO)

  const end = addMinutes(start, duration)

  return { start, end }
}
