import { useParams, Link } from "react-router-dom";
import { CheckCircle, Copy } from "lucide-react";
import { getBookings } from "@/lib/data";
import { toast } from "sonner";

const Confirmation = () => {
  const { reference } = useParams();
  const booking = getBookings().find((b) => b.reference === reference);

  if (!booking) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Booking not found.</p>
        <Link to="/routes" className="mt-4 inline-block text-sm text-primary underline">Browse routes</Link>
      </div>
    );
  }

  const copy = () => {
    navigator.clipboard.writeText(booking.reference);
    toast.success("Reference copied!");
  };

  const whatsappMsg = encodeURIComponent(
    `Hi! My EasyTrip booking:\nRef: ${booking.reference}\nName: ${booking.fullName}\nTo: ${booking.destination}\nDate: ${booking.departureDate} ${booking.departureTime}\nPickup: Science Gate`
  );

  return (
    <div className="container max-w-md py-12 text-center">
      <div className="rounded-xl bg-card p-8 card-shadow animate-fade-in">
        <CheckCircle className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 font-display text-2xl font-bold">Booking Confirmed!</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your seat has been reserved.</p>

        <div className="mt-6 rounded-lg bg-secondary p-4">
          <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display text-2xl font-bold tracking-wider text-primary">{booking.reference}</span>
            <button onClick={copy} className="text-muted-foreground hover:text-foreground">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-left text-sm">
          <Row label="Name" value={booking.fullName} />
          <Row label="Student ID" value={booking.studentId} />
          <Row label="Destination" value={booking.destination} />
          <Row label="Date" value={`${booking.departureDate} · ${booking.departureTime}`} />
          <Row label="Fare (pay on departure)" value={`GH₵${booking.fare}`} />
          <Row label="Booking Fee (paid)" value={`GH₵${booking.bookingFee}`} />
        </div>

        <a
          href={`https://wa.me/?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-11 items-center justify-center gap-2 rounded-lg bg-success text-sm font-semibold text-success-foreground hover:opacity-90 transition-opacity"
        >
          Share via WhatsApp
        </a>

        <Link to="/routes" className="mt-3 block text-sm text-primary underline">
          Book another trip
        </Link>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-dashed pb-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Confirmation;
