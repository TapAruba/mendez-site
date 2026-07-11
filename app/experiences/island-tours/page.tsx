import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ServiceInquiryForm } from "@/components/service-inquiry-form";

export const metadata: Metadata = {
  title: "Island Tours",
  description: "Personalized island tours in Aruba, arranged by Ana Méndez.",
};

export default function IslandToursPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/experience-tour.jpg" alt="Island tours in Aruba" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Experience</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">
            Island <span className="italic text-gold">Tours</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <p className="text-center text-lg leading-relaxed text-navy/70">
              Let Ana arrange a personalized guide to show you Aruba beyond the tourist trail — hidden beaches, natural pools, and local spots known only to residents.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="rounded-3xl border border-navy/10 bg-cream/40 p-8 md:p-12">
              <h2 className="mb-8 font-display text-2xl text-navy">Request an Island Tour</h2>
              <ServiceInquiryForm
                serviceType="island-tours"
                submitLabel="Send Inquiry"
                fields={[
                  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 000 000 0000" },
                  { name: "guests", label: "Number of Guests", type: "number", placeholder: "2" },
                  { name: "date", label: "Preferred Date", type: "date", required: true },
                  {
                    name: "tour_type",
                    label: "Tour Type",
                    type: "select",
                    options: ["Natural Pools & North Coast", "Hidden Beaches", "Casibari & Arikok", "Full Island Day Tour", "Sunset Tour", "Custom"],
                  },
                  { name: "message", label: "Special requests or interests", type: "textarea", placeholder: "Tell us what you'd like to see or do…" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
