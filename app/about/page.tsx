import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Ana Méndez",
  description: "Meet Ana Méndez, the host behind Méndez Estates Aruba — two private luxury villas in Aruba.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[45vh] min-h-[340px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/maxwell-16.jpg" alt="Garden at Méndez Estates Aruba" fill priority className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— About</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">
            Meet <span className="italic text-gold">Ana</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem]">
              <Image src="images/ana-portrait.jpg" alt="Ana Méndez, host of Méndez Estates Aruba" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">— Your Host</div>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-navy">
              &quot;Make Yourself <span className="italic text-gold">at Home&quot;</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-navy/70">
              Ana Méndez is the heart behind Méndez Estates Aruba. Originally from the Dominican Republic and now settled on the island, Ana built Naïma Luxury and Maxwell Luxury as a personal project — two private villas where guests are treated less like clients and more like family.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/70">
              She tends the garden herself, looks after George the cat and the property&apos;s chickens and tortoises, and personally arranges every detail of a guest&apos;s stay — from the welcome breakfast basket to a private chef dinner or a tip on the best hidden beach.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/70">
              For Ana, hospitality in Aruba isn&apos;t a transaction. It&apos;s an invitation: come as a guest, leave feeling at home.
            </p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-gold hover:text-navy">
              Say Hello On WhatsApp <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <div className="font-display text-2xl italic leading-relaxed text-navy/80">
            &quot;Everything was very clean and organized as described... Ana was very attentive and helped us with what we needed.&quot;
          </div>
          <div className="mt-4 font-sans text-[10px] uppercase tracking-[0.16em] text-navy/50">— Bruno, Brazil</div>
        </Reveal>
      </section>
    </>
  );
}
