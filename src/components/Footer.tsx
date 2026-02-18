import logo from "@/assets/easytrip-logo.png";

const Footer = () => (
  <footer className="border-t bg-card py-8">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-primary mb-2">
        <img src={logo} alt="EasyTrip" className="h-6 w-6 object-contain" />
        EasyTrip
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 EasyTrip. Student Vacation Transport Agency.
      </p>
    </div>
  </footer>
);

export default Footer;
