import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { getTrips, type Trip } from "@/lib/data";

const Routes = () => {
  const [trips] = useState<Trip[]>(() => getTrips().filter((t) => t.status === "active"));
  const navigate = useNavigate();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="font-display text-2xl font-bold md:text-3xl">Available Routes</h1>
      <p className="mt-1 text-muted-foreground">Select a trip to book your seat.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => {
          const seatsLeft = trip.totalSeats - trip.bookedSeats;
          const almostFull = seatsLeft <= 5;
          return (
            <button
              key={trip.id}
              onClick={() => navigate(`/book/${trip.id}`)}
              className="group rounded-xl bg-card p-5 text-left card-shadow hover:card-shadow-hover transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{trip.destination}</h3>
                {almostFull && (
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                    {seatsLeft} left!
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {trip.departureDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {trip.departureTime}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {trip.pickupPoint}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> {seatsLeft} / {trip.totalSeats} seats available
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Fare</p>
                  <p className="font-display text-lg font-bold">GH₵{trip.fare}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Booking Fee</p>
                  <p className="font-display font-bold text-primary">GH₵{trip.bookingFee}</p>
                </div>
              </div>
              <div className="mt-4 flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground group-hover:opacity-90 transition-opacity">
                Book This Trip
              </div>
            </button>
          );
        })}
      </div>
      {trips.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">No trips available right now. Check back later!</p>
      )}
    </div>
  );
};

export default Routes;
