import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Download, LogOut, Bus, Trash2 } from "lucide-react";
import { getTrips, saveTrips, getBookings, type Trip, type Booking } from "@/lib/data";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"trips" | "bookings">("trips");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("svta_admin") !== "true") {
      navigate("/admin/login");
      return;
    }
    setTrips(getTrips());
    setBookings(getBookings());
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("svta_admin");
    navigate("/admin/login");
  };

  const deleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    saveTrips(updated);
    setTrips(updated);
    toast.success("Trip deleted");
  };

  const markCompleted = (id: string) => {
    const updated = trips.map((t) => (t.id === id ? { ...t, status: "completed" as const } : t));
    saveTrips(updated);
    setTrips(updated);
    toast.success("Trip marked as completed");
  };

  const exportCSV = () => {
    const headers = "Reference,Name,Phone,StudentID,Destination,Date,Time,Fare,BookingFee,Status\n";
    const rows = bookings.map((b) =>
      `${b.reference},${b.fullName},${b.phone},${b.studentId},${b.destination},${b.departureDate},${b.departureTime},${b.fare},${b.bookingFee},${b.status}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-primary">
            <Bus className="h-5 w-5" /> Admin Panel
          </div>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
          <Stat label="Active Trips" value={trips.filter((t) => t.status === "active").length} />
          <Stat label="Total Bookings" value={bookings.length} />
          <Stat label="Revenue (Fees)" value={`GH₵${bookings.reduce((s, b) => s + b.bookingFee, 0)}`} />
          <Stat label="Seats Sold" value={trips.reduce((s, t) => s + t.bookedSeats, 0)} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <TabBtn active={tab === "trips"} onClick={() => setTab("trips")}>Trips</TabBtn>
          <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")}>Bookings</TabBtn>
        </div>

        {tab === "trips" && (
          <>
            <div className="flex justify-end mb-3">
              <button onClick={() => setShowAdd(true)} className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <Plus className="h-4 w-4" /> Add Trip
              </button>
            </div>
            <div className="space-y-3">
              {trips.map((trip) => (
                <div key={trip.id} className="rounded-lg bg-card p-4 card-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold">{trip.destination}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${trip.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trip.departureDate} · {trip.departureTime} · {trip.pickupPoint} · GH₵{trip.fare} · {trip.bookedSeats}/{trip.totalSeats} booked
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {trip.status === "active" && (
                      <button onClick={() => markCompleted(trip.id)} className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                        Complete
                      </button>
                    )}
                    <button onClick={() => deleteTrip(trip.id)} className="rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "bookings" && (
          <>
            <div className="flex justify-end mb-3">
              <button onClick={exportCSV} className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4">Ref</th>
                    <th className="pb-2 pr-4">Name</th>
                    <th className="pb-2 pr-4">Phone</th>
                    <th className="pb-2 pr-4">Destination</th>
                    <th className="pb-2 pr-4">Date</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="py-2 pr-4 font-mono text-xs">{b.reference}</td>
                      <td className="py-2 pr-4">{b.fullName}</td>
                      <td className="py-2 pr-4">{b.phone}</td>
                      <td className="py-2 pr-4">{b.destination}</td>
                      <td className="py-2 pr-4">{b.departureDate}</td>
                      <td className="py-2">
                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">{b.status}</span>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No bookings yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add Trip Modal */}
      {showAdd && <AddTripModal onClose={() => setShowAdd(false)} onAdd={(t) => { setTrips(t); setShowAdd(false); }} />}
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg bg-card p-4 card-shadow">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 font-display text-xl font-bold">{value}</p>
  </div>
);

const TabBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
  >
    {children}
  </button>
);

const AddTripModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (t: Trip[]) => void }) => {
  const [form, setForm] = useState({
    destination: "", departureDate: "", departureTime: "", pickupPoint: "Science Gate", fare: "", bookingFee: "25", totalSeats: "45",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.destination || !form.departureDate || !form.departureTime || !form.fare) {
      toast.error("Please fill all fields");
      return;
    }
    const trips = getTrips();
    const newTrip: Trip = {
      id: Date.now().toString(),
      destination: form.destination,
      departureDate: form.departureDate,
      departureTime: form.departureTime,
      pickupPoint: form.pickupPoint,
      fare: Number(form.fare),
      bookingFee: Number(form.bookingFee),
      totalSeats: Number(form.totalSeats),
      bookedSeats: 0,
      status: "active",
    };
    trips.push(newTrip);
    saveTrips(trips);
    onAdd(trips);
    toast.success("Trip added!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-card p-6 card-shadow animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-lg font-bold mb-4">Add New Trip</h2>
        <form onSubmit={submit} className="space-y-3">
          <Input label="Destination" value={form.destination} onChange={(v) => update("destination", v)} placeholder="e.g. Accra" />
          <Input label="Departure Date" value={form.departureDate} onChange={(v) => update("departureDate", v)} type="date" />
          <Input label="Departure Time" value={form.departureTime} onChange={(v) => update("departureTime", v)} placeholder="e.g. 06:00 AM" />
          <Input label="Pickup Point" value={form.pickupPoint} onChange={(v) => update("pickupPoint", v)} placeholder="e.g. Science Gate" />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Fare (GH₵)" value={form.fare} onChange={(v) => update("fare", v)} type="number" />
            <Input label="Booking Fee" value={form.bookingFee} onChange={(v) => update("bookingFee", v)} type="number" />
            <Input label="Total Seats" value={form.totalSeats} onChange={(v) => update("totalSeats", v)} type="number" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-secondary py-2.5 text-sm font-medium text-secondary-foreground">Cancel</button>
            <button type="submit" className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground">Add Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none ring-ring focus:ring-2" />
  </div>
);

export default AdminDashboard;
