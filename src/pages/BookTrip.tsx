import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTrips, createBooking } from "@/lib/data";
import { z } from "zod";
import { toast } from "sonner";

const bookingSchema = z.object({
  fullName: z.string().trim().min(3, "Full name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  studentId: z.string().trim().min(3, "Student ID is required").max(20),
});

const BookTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = getTrips().find((t) => t.id === tripId);

  const [form, setForm] = useState({ fullName: "", phone: "", studentId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!trip) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Trip not found.</p>
      </div>
    );
  }

  const seatsLeft = trip.totalSeats - trip.bookedSeats;
  if (seatsLeft <= 0) {
    return (
      <div className="container py-20 text-center">
        <p className="text-lg font-bold text-destructive">Sorry, this trip is fully booked.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // simulate small delay
    setTimeout(() => {
      const booking = createBooking({ tripId: trip.id, fullName: result.data.fullName, phone: result.data.phone, studentId: result.data.studentId });
      if (!booking) {
        toast.error("Booking failed — seat may have been taken.");
        setLoading(false);
        return;
      }
      navigate(`/confirmation/${booking.reference}`);
    }, 800);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="container max-w-lg py-8 md:py-12">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="rounded-xl bg-card p-6 card-shadow">
        <h1 className="font-display text-xl font-bold">Book Trip to {trip.destination}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {trip.departureDate} · {trip.departureTime} · {trip.pickupPoint}
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          <span>Fare: <strong>GH₵{trip.fare}</strong></span>
          <span>Booking Fee: <strong className="text-primary">GH₵{trip.bookingFee}</strong></span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {[
            { key: "fullName", label: "Full Name", placeholder: "e.g. Kwame Mensah", type: "text" },
            { key: "phone", label: "Phone Number", placeholder: "e.g. 0241234567", type: "tel" },
            { key: "studentId", label: "Student ID", placeholder: "e.g. UCC/BA/0123/20", type: "text" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none ring-ring focus:ring-2 transition-shadow"
              />
              {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
            </div>
          ))}

          <p className="text-xs text-muted-foreground">
            By booking, you agree to pay the fare (GH₵{trip.fare}) on departure day. The booking fee (GH₵{trip.bookingFee}) is non-refundable.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Booking…" : `Confirm & Pay GH₵${trip.bookingFee} Booking Fee`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTrip;
