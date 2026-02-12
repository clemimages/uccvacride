import { Bus, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <Bus className="h-6 w-6" />
          <span>UCC VacRide</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/routes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Routes</Link>
          <Link to="/routes" className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Home</Link>
            <Link to="/routes" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Routes</Link>
            <Link to="/routes" onClick={() => setOpen(false)} className="inline-flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
