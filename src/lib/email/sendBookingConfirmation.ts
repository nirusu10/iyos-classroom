import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { resend } from "./resend";

type Params = {
  to: string;
  name: string;
  startTime: string;
  endTime: string;
  timeZone: string;
};

export async function sendBookingConfirmation({
  to,
  name,
  startTime,
  endTime,
  timeZone,
}: Params) {
  const start = new TZDate(startTime, timeZone);
  const end = new TZDate(endTime, timeZone);

  const formattedStart = format(start, "yyyy-MM-dd HH:mm");
  const formattedEnd = format(end, "HH:mm");

  const message = `Hi ${name},

Your Japanese lesson is confirmed!

🗓️  ${formattedStart} – ${formattedEnd} (${timeZone})

Looking forward to seeing you!

Best regards,  
Iyo Sensei`;

  return await resend.emails.send({
    from: "Iyo Sensei <onboarding@resend.dev>",
    to,
    subject: "Your Japanese Lesson is Confirmed ✅",
    text: message,
  });
}
