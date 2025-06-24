export type Availability = {
  weekday: number;
  startTimeMinutes: number;
  endTimeMinutes: number;
};

export type AvailabilityException = {
  date: string;
  isAvailable: boolean;
};

export type Booking = {
  startTime: string;
  endTime: string;
};
