import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendBookingConfirmation = async ({
  to,
  startTime,
  endTime,
}: {
  to: string
  startTime: string
  endTime: string
}) => {
  try {
    await resend.emails.send({
      from: 'Iyo <onboarding@resend.dev>',
      to,
      subject: 'Your Japanese Lesson Booking Confirmation',
      html: `
        <h2>🎌 Booking Confirmed!</h2>
        <p>Hi there,</p>
        <p>Your Japanese lesson has been successfully booked.</p>
        <p><strong>Start:</strong> ${new Date(startTime).toLocaleString()}</p>
        <p><strong>End:</strong> ${new Date(endTime).toLocaleString()}</p>
        <p>Looking forward to seeing you soon!</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
  }
}
