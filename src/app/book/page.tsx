"use client";
import { format } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailableSlots from "~/components/AvailableSlots";
import { BookingForm } from "~/components/BookingForm";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <main className="container">
      <section>
        <h1 className="text-center text-3xl font-bold text-blue-700 drop-shadow dark:text-white">
          Book Your Japanese lesson
        </h1>
        <p className="mx-auto max-w-xl text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          Pick a date, choose a time and book your lesson!
        </p>
      </section>
      {/* Calendar Section */}
      <section className="mt-8 flex flex-col items-center rounded-xl bg-blue-50 px-4 py-8 shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-white">
          1. Choose a date
        </h2>
        <Calendar
          className="mt-4"
          minDate={new Date()}
          value={selectedDate}
          onClickDay={(date) => {
            setSelectedDate(date);
          }}
        />
      </section>
      {/* Time Slot Selection */}
      {selectedDate && (
        <AvailableSlots
          date={format(selectedDate, "yyyy-MM-dd")}
          onSelectSlot={(slot) => setSelectedSlot(slot)}
        />
      )}
      {selectedDate && (
        <BookingForm
          selectedDate={selectedDate}
          // You will pass selected slot and form data here later
        />
      )}
    </main>
  );
}
