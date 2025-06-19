"use client";
import { useState, type FormEvent } from "react";
import { availabilityInputSchema } from "~/lib/validation/availability";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AdminPage() {
  const [weekday, setWeekday] = useState(1); // default to monday
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!weekday || !startTime || !endTime) return;

    const payload = {
      weekday,
      startTime,
      endTime,
      timeZone: "Europe/Berlin",
    };

    const parsed = availabilityInputSchema.safeParse(payload);

    if (!parsed.success) {
      console.error(parsed.error.format());
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/admin/availability", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Availability saved");
      setStartTime("");
      setEndTime("");
    } else {
      alert("Error saving availability");
    }

    setSubmitting(false);
  };

  return (
    <main>
      <h1 className="text-2xl font-bold">Set your availability</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <select
          name="weekday"
          id="weekday"
          className="bg-gray-400 p-2 text-black"
        >
          {WEEKDAYS.map((day, index) => (
            <option key={index}>{day}</option>
          ))}
        </select>

        <div>
          <label htmlFor="startTime">Start time:</label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="startTime">End time:</label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          {submitting ? "Saving…" : "Add Availability"}
        </button>
      </form>
    </main>
  );
}
