import { StoredBlockedSlot, StoredBooking } from '@iyos-classroom/types'
import { readData, writeData } from '../dataStore'

let mockData = { bookings: [], blockedSlots: [] }

jest.mock('../dataStore', () => ({
  readData: jest.fn(() => Promise.resolve(mockData)),
  writeData: jest.fn((data) => {
    mockData = data
    return Promise.resolve()
  }),
}))

describe('dataStore with custom path', () => {
  const testSlot: StoredBlockedSlot = {
    id: 'test-id',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 3600000).toISOString(),
  }

  beforeEach(() => {
    mockData = { bookings: [], blockedSlots: [] }
  })

  const testBooking: StoredBooking = {
    id: 'booking-123',
    name: 'Test User',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 3600000).toISOString(),
  }

  it('writes and reads data from custom file', async () => {
    await writeData({ bookings: [testBooking], blockedSlots: [testSlot] })
    const result = await readData()
    expect(result.bookings[0].id).toBe('booking-123')
    expect(result.blockedSlots[0].id).toBe('test-id')
  })
})
