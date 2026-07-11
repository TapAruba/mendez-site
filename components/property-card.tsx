import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-navy/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.mainImage}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-gold">
          {property.tagline}
        </div>
        <h3 className="mt-2 font-display text-2xl text-navy">{property.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.specs.map((s) => (
            <span
              key={s}
              className="rounded-full bg-cream px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-navy/60"
            >
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/the-property#${property.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-caribbean hover:text-gold"
        >
          View Details & Book <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
