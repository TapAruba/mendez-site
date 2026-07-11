import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Request your stay at Naïma Luxury or Maxwell Luxury — Méndez Estates Aruba.",
};

export default function BookNowPage() {
  return (
    <section className="bg-cream min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Reservations</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-navy">
            Book Your <span className="italic text-gold">Stay</span>
          </h1>
          <p className="mt-5 text-navy/60">
            Fill in your details and Ana will confirm availability within 24 hours.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-navy/10 bg-white p-8 shadow-sm md:p-14">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
