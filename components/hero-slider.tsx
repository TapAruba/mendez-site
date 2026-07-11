"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    img: "images/naima-hero.jpg",
    eyebrow: "✦ Naïma Luxury · Aruba",
    title: "Private Garden",
    titleItalic: "Villa",
    sub: "Pool · Tortoises · Breakfast Included",
    href: "/the-property",
  },
  {
    img: "images/maxwell-hero.jpg",
    eyebrow: "✦ Maxwell Luxury · Aruba",
    title: "Open-Concept",
    titleItalic: "Pool Home",
    sub: "6–7 Guests · Private Pool · Coffee Bar",
    href: "/the-property",
  },
  {
    img: "images/experience-dinner.jpg",
    eyebrow: "✦ Experiences · Aruba",
    title: "Private Chef",
    titleItalic: "& More",
    sub: "Massage · Island Tours · Car Rental",
    href: "/experiences",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={s.img} alt={s.titleItalic} fill priority={i === 0} className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-navy/55" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
          {slide.eyebrow}
        </div>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6.5rem)] leading-none">
          {slide.title}
          <br />
          <span className="italic text-gold">{slide.titleItalic}</span>
        </h1>
        <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.2em] text-white/70">
          {slide.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-now"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-white"
          >
            Book Now <ArrowRight size={14} />
          </Link>
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Explore
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-gold" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
