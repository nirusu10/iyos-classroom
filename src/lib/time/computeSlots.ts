import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import type { Availability, AvailabilityException, Booking } from "../types";

export function computeAvailableSlots({
  date,
  teacherTimeZone = "Asia/Tokyo",
  availabilities,
  exceptions,
  bookings,
  lessonLength = 50,
  interval = 10,
}: {
  date: string; // YYYY-MM-DD
  availabilities: Availability[];
  exceptions: AvailabilityException[];
  bookings: Booking[];
  lessonLength?: number;
  interval?: number;
  teacherTimeZone?: string;
}) {
  const day = new TZDate(`${date}T00:00:00`, teacherTimeZone);
  const weekday = day.getDay();

  // Blocked entirely?
  const dayException = exceptions.find((e) => e.date === date);
  if (dayException && !dayException.isAvailable) return [];

  // Build slots from recurring availability
  const matched = availabilities.filter((a) => a.weekday === weekday);

  const slots: string[] = [];

  for (const block of matched) {
    const blockStart = new TZDate(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      Math.floor(block.startTimeMinutes / 60), // hours
      block.startTimeMinutes % 60, // minutes
      teacherTimeZone,
    );

    const blockEnd = new TZDate(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      Math.floor(block.endTimeMinutes / 60),
      block.endTimeMinutes % 60,
      teacherTimeZone,
    );

    for (
      let slot = blockStart;
      addMinutes(slot, lessonLength) <= blockEnd;
      slot = addMinutes(slot, interval)
    ) {
      const slotEnd = addMinutes(slot, lessonLength);
      const overlaps = bookings.some(
        (booking) =>
          new Date(booking.startTime) < slotEnd &&
          new Date(booking.endTime) > slot,
      );

      if (!overlaps) {
        slots.push(slot.toISOString());
      }
    }
  }
  return slots;
}
