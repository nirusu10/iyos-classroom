import request from 'supertest'
import app from '../index'
import { v4 as uuidv4 } from 'uuid'
import { StoredBlockedSlot, StoredBooking } from '@iyos-classroom/types'

let mockData: { bookings: StoredBooking[]; blockedSlots: StoredBlockedSlot[] } =
  {
    bookings: [],
    blockedSlots: [],
  }

jest.mock('../dataStore', () => ({
  readData: jest.fn(() => Promise.resolve(mockData)),
  writeData: jest.fn((data) => {
    mockData = data
    return Promise.resolve()
  }),
}))

beforeEach(() => {
  mockData = { bookings: [], blockedSlots: [] }
})

describe('Booking API', () => {
  const date = '2099-12-31'
  const time = '10:00'

  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toBe('Hello from the backend!')
  })

  it('GET /api/bookings returns empty list initially', async () => {
    const res = await request(app).get('/api/bookings')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('POST /api/bookings creates a booking', async () => {
    const res = await request(app).post('/api/bookings').send({
      name: 'John Doe',
      date,
      time,
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(mockData.bookings.length).toBe(1)
  })

  it('DELETE /api/bookings/:id deletes booking', async () => {
    const bookingId = uuidv4()
    mockData.bookings.push({
      id: bookingId,
      name: 'To Delete',
      start: `${date}T10:00:00.000Z`,
      end: `${date}T10:50:00.000Z`,
    })

    const res = await request(app).delete(`/api/bookings/${bookingId}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Booking removed')
  })

  test('POST /api/blocked-slots blocks a time', async () => {
    const res = await request(app).post('/api/blocked-slots').send({
      date,
      time,
      duration: 60,
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(mockData.blockedSlots.length).toBe(1)
  })

  test('GET /api/blocked-slots returns blocked slots', async () => {
    mockData.blockedSlots.push({
      id: 'block-id',
      start: `${date}T10:00:00.000Z`,
      end: `${date}T11:00:00.000Z`,
    })

    const res = await request(app).get('/api/blocked-slots')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
  })
})
