import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "House rules and policies for Méndez Estates Aruba villas.",
};

const sections = [
  {
    title: "Check-in & Check-out",
    items: ["Check-in: 3:00 PM", "Check-out: 11:00 AM", "Early/late arrangements upon request via WhatsApp"],
  },
  {
    title: "Cancellation",
    items: [
      "Free cancellation up to 14 days before check-in",
      "50% refund for cancellations 7–14 days before",
      "No refund within 7 days of check-in",
    ],
  },
  {
    title: "House Rules",
    items: [
      "No smoking inside the villa",
      "Quiet hours: 10:00 PM – 8:00 AM",
      "Pets allowed with prior approval",
      "Please respect the resident animals (tortoises, cat, chickens)",
      "No parties or events without prior written consent",
    ],
  },
  {
    title: "Car Rental",
    items: [
      "Minimum driver age: 23 years old",
      "Valid driver's licence required",
      "Vehicle must be returned in the same condition",
      "Rate provided upon inquiry",
    ],
  },
  {
    title: "Payments",
    items: [
      "50% deposit to confirm reservation",
      "Remaining balance due 7 days before check-in",
      "Accepted: bank transfer, cash (AWG/USD)",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <section className="bg-cream min-h-screen py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="text-center">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Méndez Estates</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4rem)] leading-tight text-navy">
            House <span className="italic text-gold">Policies</span>
          </h1>
        </div>

        <div className="mt-16 space-y-10">
          {sections.map(({ title, items }) => (
            <div key={title} className="rounded-2xl border border-navy/10 bg-white p-7">
              <h2 className="font-display text-xl text-navy">{title}</h2>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/65">
                    <span className="mt-0.5 text-gold">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
