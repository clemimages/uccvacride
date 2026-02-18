import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import heroBus from "@/assets/hero-bus.jpg";

const features = [
  { icon: Shield, title: "Verified Vehicles", desc: "All buses and cars are inspected and driver-verified for your safety." },
  { icon: Clock, title: "Book in 2 Minutes", desc: "Quick and simple booking — pick your route, fill your details, done." },
  { icon: MapPin, title: "Campus Pickup", desc: "Buses depart directly from campus — no trotro stress." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <img src={heroBus} alt="Comfortable bus on highway" className="h-full w-full object-cover opacity-20" />
        </div>
        <div className="relative container py-20 md:py-32">
          <div className="max-w-xl">
            <span className="inline-block rounded-full gold-gradient px-4 py-1.5 text-xs font-bold text-accent-foreground mb-4">
              🎓 Student's Choice
            </span>
            <h1 className="font-display text-4xl font-900 leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Travel Home <br />This Vacation
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-md">
              Book verified buses from campus to Accra, Kumasi, Takoradi, Ho, Tamale & more — fast, safe, affordable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/routes"
                className="inline-flex h-12 items-center gap-2 rounded-lg gold-gradient px-6 font-display text-sm font-bold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                View Routes & Book <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-20">
        <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Why Book With Us?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl bg-card p-6 card-shadow text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-14">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
            Don't Miss Your Ride Home
          </h2>
          <p className="mt-2 text-primary-foreground/70">Seats are limited. Book early to secure your spot.</p>
          <Link
            to="/routes"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg gold-gradient px-6 font-display text-sm font-bold text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Browse Available Routes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
