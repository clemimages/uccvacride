export interface Trip {
  id: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  pickupPoint: string;
  fare: number;
  bookingFee: number;
  totalSeats: number;
  bookedSeats: number;
  status: "active" | "completed" | "cancelled";
}

export interface Booking {
  id: string;
  reference: string;
  tripId: string;
  fullName: string;
  phone: string;
  studentId: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  fare: number;
  bookingFee: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

const TRIPS_KEY = "svta_trips";
const BOOKINGS_KEY = "svta_bookings";

const defaultTrips: Trip[] = [
  {
    id: "1", destination: "Accra", departureDate: "2026-03-15", departureTime: "06:00 AM",
    pickupPoint: "Science Gate", fare: 120, bookingFee: 5, totalSeats: 45, bookedSeats: 12, status: "active",
  },
  {
    id: "2", destination: "Kumasi", departureDate: "2026-03-15", departureTime: "07:00 AM",
    pickupPoint: "Old Site Junction", fare: 150, bookingFee: 5, totalSeats: 45, bookedSeats: 30, status: "active",
  },
  {
    id: "3", destination: "Takoradi", departureDate: "2026-03-14", departureTime: "05:30 AM",
    pickupPoint: "Science Gate", fare: 60, bookingFee: 5, totalSeats: 30, bookedSeats: 28, status: "active",
  },
  {
    id: "4", destination: "Ho", departureDate: "2026-03-16", departureTime: "06:30 AM",
    pickupPoint: "Casely-Hayford Junction", fare: 130, bookingFee: 5, totalSeats: 45, bookedSeats: 5, status: "active",
  },
  {
    id: "5", destination: "Tamale", departureDate: "2026-03-16", departureTime: "04:00 AM",
    pickupPoint: "Science Gate", fare: 250, bookingFee: 5, totalSeats: 50, bookedSeats: 18, status: "active",
  },
];

export function getTrips(): Trip[] {
  const stored = localStorage.getItem(TRIPS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(TRIPS_KEY, JSON.stringify(defaultTrips));
  return defaultTrips;
}

export function saveTrips(trips: Trip[]) {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
}

export function getBookings(): Booking[] {
  const stored = localStorage.getItem(BOOKINGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "SVT-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export function createBooking(data: {
  tripId: string;
  fullName: string;
  phone: string;
  studentId: string;
}): Booking | null {
  const trips = getTrips();
  const trip = trips.find((t) => t.id === data.tripId);
  if (!trip || trip.bookedSeats >= trip.totalSeats) return null;

  trip.bookedSeats += 1;
  saveTrips(trips);

  const booking: Booking = {
    id: Date.now().toString(),
    reference: generateReference(),
    tripId: trip.id,
    fullName: data.fullName,
    phone: data.phone,
    studentId: data.studentId,
    destination: trip.destination,
    departureDate: trip.departureDate,
    departureTime: trip.departureTime,
    fare: trip.fare,
    bookingFee: trip.bookingFee,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
  return booking;
}
