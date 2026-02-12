import { Bus } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-primary mb-2">
        <Bus className="h-5 w-5" />
        UCC VacRide
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 Student Vacation Transport Agency. University of Cape Coast.
      </p>
    </div>
  </footer>
);

export default Footer;
