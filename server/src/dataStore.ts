import fs from 'fs/promises'
import path from 'path'
import { StoredBooking, StoredBlockedSlot } from '@iyos-classroom/types'

const DATA_PATH = path.join(__dirname, 'data.json')

type Data = {
  bookings: StoredBooking[]
  blockedSlots: StoredBlockedSlot[]
}

async function readData(): Promise<Data> {
  try {
    const json = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(json)
  } catch (error) {
    return { bookings: [], blockedSlots: [] }
  }
}

async function writeData(data: Data): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
}

export { readData, writeData }
