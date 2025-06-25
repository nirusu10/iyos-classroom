"use client";
import { addMinutes } from "date-fns";
import { useState, type FormEvent } from "react";
import { bookingSchema } from "~/lib/validation/schemas";

export function BookingForm({
  selectedSlot,
}: {
  selectedDate: Date;
  selectedSlot: string | null;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(selectedSlot);

    if (!selectedSlot || isNaN(Date.parse(selectedSlot))) {
      setMessage("Invalid time slot selected");
      setSubmitting(false);
      return;
    }

    const start = new Date(selectedSlot);
    const end = addMinutes(start, 50);

    const payload = {
      teacherId: 1,
      studentName: name,
      studentEmail: email,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      setMessage("Invalid form data");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify(parsed.data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Booking failed");
      setMessage("✅ Lesson successfully booked!");
      setName("");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message ?? "Unknown error");
      } else {
        setMessage("Unknown error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-8 flex flex-col items-center rounded-xl bg-blue-50 px-4 py-8 shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold dark:text-white">3. Your Info</h2>
      {status === "success" ? (
        <p className="rounded bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200">
          ✅ Booking confirmed! Check your email.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-full max-w-xl flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border p-2 dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="jane.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border p-2 dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-300 dark:text-black"
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
          {message && (
            <p
              className={`text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
