import { afterAll, beforeAll } from 'vitest'
import * as db from './db'
import { afterEach } from 'node:test'
import { clearCachedConnection } from '@/lib/dbConnect'

beforeAll(async () => {
  await db.connect()
})

afterEach(async () => {
  await db.clearDB()
})

afterAll(async () => {
  await db.closeDB()
  clearCachedConnection()
})
