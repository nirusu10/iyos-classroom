import { fromZonedTime } from 'date-fns-tz'

export const isFutureDateInZone = (dateString: string, timeZone: string): boolean => {
  const date = fromZonedTime(dateString, timeZone)
  return date > new Date()
}
