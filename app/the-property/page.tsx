import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { properties } from "@/lib/properties";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Properties",
  description: "Naïma Luxury and Maxwell Luxury — two private villas in Aruba hosted by Ana Méndez.",
};

export default function ThePropertyPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/hero-aerial-1.jpg" alt="Méndez Estates Aruba villas" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— The Properties</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">
            Two Villas, <span className="italic text-gold">One Garden</span>
          </h1>
        </div>
      </section>

      {properties.map((property, pi) => (
        <section
          key={property.slug}
          id={property.slug}
          className={`scroll-mt-20 py-24 ${pi % 2 === 0 ? "bg-white" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className={`grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20 ${pi % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {/* Gallery */}
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                  <Image src={property.heroImage} alt={property.name} fill className="object-cover" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {property.gallery.slice(0, 3).map((img, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                      <Image src={img} alt={`${property.name} ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Details */}
              <Reveal delay={0.15}>
                <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">{property.tagline}</div>
                <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight text-navy">{property.name}</h2>
                <p className="mt-6 text-base leading-relaxed text-navy/70">{property.description}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {property.specs.map((s) => (
                    <span key={s} className="rounded-full bg-cream px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.12em] text-navy/60">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-10">
                  <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-navy/40 mb-3">Amenities</div>
                  <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-navy/65">
                        <span className="text-gold">✦</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-navy/40 mb-3">Rates</div>
                  {property.rates.map(({ label, value }) => (
                    <div key={label} className="flex justify-between border-b border-navy/10 py-2 text-sm">
                      <span className="text-navy/60">{label}</span>
                      <span className="text-navy">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/book-now" className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-cream transition-all hover:bg-gold hover:text-navy">
                    Book Now <ArrowRight size={14} />
                  </Link>
                  <a href={whatsappLink(`Hola, me interesa reservar ${property.name} 🌴`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-navy transition-all hover:border-navy hover:bg-navy/5">
                    Ask on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Six resident tortoises note */}
      <section className="bg-white py-16">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-navy/60 text-base leading-relaxed">
            Both villas share the same lush private garden — home to six resident tortoises, George the cat, and a family of chickens. Dragon fruit grows by the gate and the hammocks are always free.
          </p>
        </Reveal>
      </section>

      <section className="bg-navy py-20 text-center text-white">
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)]">Ready to Stay?</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-now" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-navy transition-all hover:bg-white">
              Book Now <ArrowRight size={14} />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white/10">
              Chat with Ana
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
