"use client";
import { useState, type FormEvent } from "react";

export function BookingForm({
  selectedSlot,
}: {
  selectedDate: Date;
  selectedSlot?: string | null;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMITTING FORM");
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
            disabled={status === "submitting"}
            className="rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-300 dark:text-black"
          >
            {status === "submitting" ? "Booking..." : "Confirm Booking"}
          </button>
          {status === "error" && error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </form>
      )}
    </section>
  );
}
