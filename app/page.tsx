import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Sparkles, Palmtree, UtensilsCrossed, Compass, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HeroSlider } from "@/components/hero-slider";
import { whatsappLink } from "@/lib/site-config";

const quickLinks = [
  { label: "Properties",    href: "/the-property",              icon: Palmtree,         },
  { label: "Car Rental",    href: "/car-rental",                icon: Car,              },
  { label: "Private Chef",  href: "/experiences/private-chef",  icon: UtensilsCrossed,  },
  { label: "Massage",       href: "/experiences/massage",       icon: Sparkles,         },
  { label: "Island Tours",  href: "/experiences/island-tours",  icon: Compass,          },
  { label: "Contact",       href: "/about",                     icon: Phone,            },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* QUICK ACCESS */}
      <section className="bg-cream py-8 border-b border-navy/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-cream"
              >
                <Icon className="h-4 w-4" strokeWidth={1.4} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-cream py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            ["2", "Private Villas", "#properties"],
            ["1", "Garden Pool", "#amenities"],
            ["24/7", "WhatsApp Concierge", "#contact"],
            ["5★", "Guest Reviews", "#reviews"],
          ].map(([stat, label, href]) => (
            <Reveal key={label}>
              <a href={href} className="block cursor-pointer transition-opacity hover:opacity-75">
                <div className="font-display text-4xl text-navy">{stat}</div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.16em] text-caribbean">{label}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="properties" className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">— What Awaits You</div>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-tight text-navy">
                A Complete <span className="italic text-gold">Aruba</span> Experience
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: Palmtree, title: "The Villa", desc: "A cottage and a main house set in a lush private garden — pool, hammocks, and resident wildlife included.", href: "/the-property" },
              { icon: Car, title: "Car Rental", desc: "Your own vehicle for the duration of your stay, so the island is yours to explore at your own pace.", href: "/car-rental" },
              { icon: Sparkles, title: "Experiences", desc: "In-villa massages, private chef dining, and a personal guide to Aruba's best-kept secrets.", href: "/experiences" },
            ].map(({ icon: Icon, title, desc, href }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <Link href={href} className="group block h-full rounded-3xl border border-navy/10 bg-cream/40 p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl">
                  <Icon className="h-9 w-9 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.4} />
                  <h3 className="mt-6 font-display text-2xl text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/65">{desc}</p>
                  <div className="mt-7 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-caribbean">
                    Discover more <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHENTIC TOUCH */}
      <section id="amenities" className="relative overflow-hidden bg-cream py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 md:px-10">
          {/* Row 1 */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lg">
                <Image src="images/garden-entrance.jpg" alt="Garden entrance" fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">— Not Just Another Listing</div>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-navy">
                A Real Garden.<br /><span className="italic text-gold">Real Aruba.</span>
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-navy/70">
                Dragon fruit grows on the cactus by the gate. George the cat naps on the patio stones. Our chickens and resident tortoises roam the garden. This isn&apos;t a staged photoshoot — it&apos;s a working, breathing home that happens to be one of the most peaceful stays on the island.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-navy/70">
                Hosted personally by Ana Méndez, whose &quot;Make Yourself at Home&quot; philosophy means every detail is handled with genuine care.
              </p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy">
                Meet Ana <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-6">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-caribbean">— Two Properties, One Island</div>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-navy">
                Two Homes.<br /><span className="italic text-caribbean">Endless Ways to Stay.</span>
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-navy/70">
                Naïma Luxury — a cozy cottage and main house wrapped in garden, perfect for couples and small groups. Maxwell Luxury — an open-concept home with a large private pool, ideal for families and groups of 6 to 7 guests.
              </p>
              <Link href="/the-property" className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-caribbean hover:text-navy">
                Compare Both Properties <ArrowRight size={14} />
              </Link>
            </Reveal>
            <Reveal className="order-1 lg:order-2 lg:col-span-6">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lg lg:ml-auto">
                <Image src="images/maxwell-pool.jpg" alt="Maxwell pool" fill className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lg">
                <Image src="images/experience-dinner.jpg" alt="Private chef" fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">— Beyond The Villa</div>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-navy">
                Hosted.<br /><span className="italic text-gold">Not Just Booked.</span>
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-navy/70">
                A private massage by the pool. A personal chef dinner under the stars. A guided tour to the spots only locals know. Every experience is arranged directly by Ana — never an anonymous third-party vendor.
              </p>
              <Link href="/experiences" className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy">
                See All Experiences <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="reviews" className="bg-white py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="font-display text-3xl italic leading-relaxed text-navy/85 md:text-4xl">
            &quot;Everything was very clean and organized as described... Ana was very attentive and helped us with what we needed.&quot;
          </div>
          <div className="mt-6 font-sans text-[11px] uppercase tracking-[0.18em] text-navy/55">— Bruno, Brazil</div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="bg-cream py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">— Reservations</div>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-navy">
            Ready For Your <span className="italic text-gold">Aruba</span> Escape?
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-navy/65">
            Tell us your dates and we&apos;ll take care of the rest — villa, car, and every detail in between.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-gold hover:text-navy">
              Chat On WhatsApp <ArrowRight size={14} />
            </a>
            <Link href="/book-now" className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:border-navy hover:bg-navy/5">
              Booking Form
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
