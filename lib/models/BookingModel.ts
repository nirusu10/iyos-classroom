import { model, Schema } from 'mongoose'

interface IBooking extends Document {
  _id?: string
  studentName: string
  startTime: Date
  endTime: Date
  status: 'booked' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
}

const bookingSchema = new Schema<IBooking>(
  {
    studentName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, default: 'booked' },
  },
  { timestamps: true }
)

const BookingModel = model<IBooking>('Booking', bookingSchema)

export default BookingModel
