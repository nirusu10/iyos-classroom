import { model, models, Schema } from 'mongoose'

interface IBooking {
  _id?: string
  studentEmail: string
  startTime: Date
  endTime: Date
  status: 'booked' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
}

const bookingSchema = new Schema<IBooking>(
  {
    studentEmail: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, default: 'booked' },
  },
  { timestamps: true }
)

export default models.Booking || model<IBooking>('Booking', bookingSchema)
