import fs from 'fs/promises'
import path from 'path'
import { BlockedSlot, Booking } from '@iyos-classroom/types'

const PATH = path.join(__dirname, 'data.json')

type Data = {
  bookings: Booking[]
  blockedSlots: BlockedSlot[]
}

async function readData(): Promise<Data> {
  try {
    const json = await fs.readFile(PATH, 'utf-8')
    return JSON.parse(json)
  } catch (error) {
    return { bookings: [], blockedSlots: [] }
  }
}

async function writeData(data: Data): Promise<void> {
  await fs.writeFile(PATH, JSON.stringify(data, null, 2))
}

export { readData, writeData }
