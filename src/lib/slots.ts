import { set } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export function generateSlotsForDate({
  date,
  weekdayAvailability,
}: {
  date: Date;
  weekdayAvailability: {
    startTime: string;
    endTime: string;
    timeZone: string;
  }[];
}): string[] {
  const slots: string[] = [];

  for (const block of weekdayAvailability) {
    const { startTime, endTime, timeZone } = block;

    // Combine date + start time into a local datetime
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const localStart = set(date, {
      hours: startHour,
      minutes: startMin,
      seconds: 0,
    });
    const localEnd = set(date, { hours: endHour, minutes: endMin, seconds: 0 });

    let current = localStart;

    while (current.getTime() + 50 * 60 * 1000 <= localEnd.getTime()) {
      const utcSlot = fromZonedTime(current, timeZone);
      slots.push(utcSlot.toISOString());
      current = new Date(current.getTime() + 10 * 60 * 1000);
    }
  }

  return slots;
}
