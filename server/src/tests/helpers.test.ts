import { differenceInMinutes, parseISO, isValid } from 'date-fns'
import { getStartEnd } from '../helpers'

describe('getStartEnd', () => {
  it('returns correct ISO strings given date, time and duration', () => {
    const date = '2025-06-01'
    const time = '14:30:00'
    const duration = 50

    const result = getStartEnd(date, time, duration)

    expect(result).not.toBeNull()
    if (!result) return
    expect(typeof result.start).toBe('string')
    expect(typeof result.end).toBe('string')

    const startDate = parseISO(result.start)
    const endDate = parseISO(result.end)

    expect(startDate).toEqual(parseISO(`${date}T${time}`))
    expect(differenceInMinutes(endDate, startDate)).toBe(duration)
    expect(isValid(startDate)).toBe(true)
    expect(isValid(endDate)).toBe(true)
  })

  it('handles invalid date/time inputs gracefully', () => {
    const invalidDate = 'not-a-date'
    const time = '14:30:00'
    const duration = 50

    const result = getStartEnd(invalidDate, time, duration)

    expect(result).toBeNull()
  })
})
