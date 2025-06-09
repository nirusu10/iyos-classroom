import { models } from 'mongoose'
import { model, Schema } from 'mongoose'

interface IAvailability {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  startHour: string
  endHour: string
}

const availabilitySchema = new Schema<IAvailability>({
  dayOfWeek: { type: Number, required: true }, // 0 = Sunday, 1 = Monday, ...
  startHour: { type: String, required: true },
  endHour: { type: String, required: true },
})

export default models.Availability || model<IAvailability>('Availability', availabilitySchema)
