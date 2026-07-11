import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Fuel, Snowflake, Users2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Exclusive car rental for Méndez Estates guests in Aruba — a vehicle available for the duration of your stay.",
};

const fleet = [
  { img: "images/car-picanto.jpg", name: "Kia Picanto", desc: "Easy to park, easy on gas — ideal for couples exploring beaches and town." },
  { img: "images/car-rio.jpg", name: "Kia Rio", desc: "Comfortable compact sedan, great for island drives and groups of up to 5." },
  { img: "images/car-camry.jpg", name: "Toyota Camry", desc: "Premium sedan with extra comfort for longer trips around the island." },
  { img: "images/car-tucson.jpg", name: "Hyundai Tucson", desc: "Spacious SUV perfect for families wanting more room and versatility." },
  { img: "images/car-santafe.jpg", name: "Hyundai Santa Fe", desc: "Full-size SUV for groups who want comfort and space across the island." },
  { img: "images/car-staria.jpg", name: "Hyundai Staria", desc: "Premium van — perfect for larger groups traveling together in style." },
];

export default function CarRentalPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/car-hero.jpg" alt="Car rental for Méndez Estates guests in Aruba" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Car Rental</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">
            The Island, <span className="italic text-gold">Your Pace</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-navy/70">
              We offer an exclusive car rental service for our guests — a vehicle available for the full duration of your stay, so Aruba is yours to explore on your own schedule. No taxi, no shuttle, no waiting.
            </p>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-navy/10 bg-cream/60 px-6 py-4 text-center">
              <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-navy/70">
                Minimum driver age: <strong className="text-navy">23 years old</strong> · Valid licence required
              </span>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {fleet.map(({ img, name, desc }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-3xl border border-navy/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={img} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl text-navy">{name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/65">{desc}</p>
                    <div className="mt-5 flex items-center gap-5 text-navy/50">
                      <Users2 size={16} /><Snowflake size={16} /><Fuel size={16} />
                    </div>
                    <div className="mt-5 font-sans text-[10px] uppercase tracking-[0.16em] text-navy/40">
                      Rate available upon inquiry
                    </div>
                    <a
                      href={whatsappLink(`Hola, me interesa reservar un auto (${name}) para mi estadía en Méndez Estates 🌴`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-caribbean hover:text-gold"
                    >
                      Reserve A Car <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
            Arrange Your <span className="italic text-gold">Vehicle</span>
          </h2>
          <p className="mt-5 text-white/75">Let us know your travel dates and we&apos;ll confirm availability and provide the rate directly.</p>
          <div className="mt-9">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-white">
              Ask On WhatsApp <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
