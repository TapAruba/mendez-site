import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Private chef, massage, and island tours — curated experiences arranged personally by Ana at Méndez Estates Aruba.",
};

const experiences = [
  {
    id: "private-chef",
    href: "/experiences/private-chef",
    img: "images/experience-dinner.jpg",
    title: "Private Chef",
    desc: "A private chef experience arranged by your host, bringing delicious home-style meals straight to the villa for a comfortable evening in.",
  },
  {
    id: "massage",
    href: "/experiences/massage",
    img: "images/experience-massage.jpg",
    title: "Massage",
    desc: "An exclusive massage service for our guests, available by appointment — at the property or at the spa, arranged by Ana.",
  },
  {
    id: "island-tours",
    href: "/experiences/island-tours",
    img: "images/experience-tour.jpg",
    title: "Island Tours",
    desc: "A personalized guide service arranged by the host, helping you explore the island's best attractions, hidden spots, and local culture.",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/experience-dinner.jpg" alt="Private chef experience at Méndez Estates Aruba" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Experiences</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">
            Add To Your <span className="italic text-gold">Stay</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-navy/70">
              Beyond the villa, Ana and her team arrange a handful of curated add-ons — each one personal, private, and built around your stay.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {experiences.map(({ id, href, img, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div id={id} className="group scroll-mt-28 overflow-hidden rounded-3xl border border-navy/10">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl text-navy">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/65">{desc}</p>
                    <div className="mt-5 font-sans text-[10px] uppercase tracking-[0.16em] text-navy/40">Price upon request</div>
                    <Link href={href} className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-caribbean hover:text-gold">
                      Inquire Now <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <div className="font-display text-2xl italic text-navy/80">
            &quot;On the first day of your stay, we treat you to a lovingly prepared breakfast.&quot;
          </div>
          <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.16em] text-navy/50">
            The Breakfast Basket — included for every guest
          </p>
        </Reveal>
      </section>

      <section className="bg-navy py-24 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
            Build Your <span className="italic text-gold">Perfect Stay</span>
          </h2>
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
