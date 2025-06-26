"use client";

import { TZDate } from "@date-fns/tz";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  date: string;
  onSelectSlot: (slot: string) => void;
};

export default function AvailableSlots({ date, onSelectSlot }: Props) {
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      setSlots([]);

      try {
        const response = await fetch(
          `/api/available-slots?date=${date}&timeZone=${encodeURIComponent(timeZone)}`,
        );

        const raw: unknown = await response.json();

        const data = raw as { slots?: string[]; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch slots");
        }

        setSlots(data.slots ?? []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message ?? "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [date, timeZone]);

  const handleSelect = (slot: string) => {
    setSelectedTime(slot);
    onSelectSlot(slot);
  };

  return (
    <section className="mt-8 flex flex-col items-center rounded-xl bg-blue-50 px-4 py-8 shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-white">
        2. Select a time
      </h2>
      <p className="mx-auto max-w-xl text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
        Select your preferred lesson time on {date}
      </p>

      {loading && <p className="text-gray-500">Loading slots...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && slots.length === 0 && (
        <p className="text-gray-500">No available slots for this day.</p>
      )}

      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {slots.map((slot) => {
          const localTime = TZDate.tz(timeZone, slot);
          const time = format(localTime, "HH:mm");
          return (
            <li key={slot}>
              <button
                onClick={() => handleSelect(slot)}
                className={`rounded px-4 py-2 text-sm font-medium shadow-sm transition ${
                  selectedTime === slot
                    ? "bg-blue-700 text-white dark:bg-blue-300 dark:text-black"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                }`}
              >
                {time}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
