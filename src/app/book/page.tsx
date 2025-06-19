"use client";

import { useEffect, useState, type FormEvent } from "react";
import Calendar from "react-calendar";
import { setMinutes, setHours, format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import { bookingInputSchema } from "~/lib/validation/booking";
import { toZonedTime } from "date-fns-tz";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock time slots when we select a date for now
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      const dateStr = selectedDate.toISOString().split("T")[0]; // Only the part before the T

      const res = await fetch(`/api/slots?date=${dateStr}`);
      const data = await res.json();

      if (res.ok) {
        if (Array.isArray(data.slots)) {
          setAvailableSlots(data.slots);
        } else {
          console.error("Invalid slot response:", data);
          setAvailableSlots([]);
        }
      } else {
        console.error(data.error || "Failed to load slots");
        setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedStartTime || !email) return;

    const [hour, minute] = selectedStartTime.split(":").map(Number);
    if (!hour || !minute) return;

    const localStart = new Date(selectedStartTime);
    const localEnd = new Date(localStart.getTime() + 50 * 60000);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log("SENDING endTime:", localEnd.toISOString());

    const payload = {
      studentEmail: email,
      startTime: localStart.toISOString(),
      endTime: localEnd.toISOString(),
      timeZone: userTimeZone,
    };

    const parsed = bookingInputSchema.safeParse(payload);
    if (!parsed.success) {
      console.error(parsed.error.format());
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      [alert("Booking submitted!")];
    } else {
      alert("Something went wrong.");
    }

    setSubmitting(false);
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <main>
      <h1>Book a Lesson</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>1. Choose a date</h2>
          {mounted && (
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          )}
        </section>
        {selectedDate && (
          <section>
            <h2>2. Pick a time</h2>
            {availableSlots.map((utcISO) => {
              const localDate = toZonedTime(new Date(utcISO), userTimeZone);
              const timeStr = format(localDate, "HH:mm");

              return (
                <button
                  key={utcISO}
                  onClick={() => setSelectedStartTime(utcISO)}
                  className={`rounded border px-3 py-1 ${
                    selectedStartTime === utcISO
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {timeStr}
                </button>
              );
            })}
          </section>
        )}
        <input
          type="email"
          placeholder="example@example.com"
          className="mt-4 w-full rounded border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="mt-4 border px-6 py-2">Book Lesson</button>
      </form>
    </main>
  );
}
