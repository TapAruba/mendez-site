import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ServiceInquiryForm } from "@/components/service-inquiry-form";

export const metadata: Metadata = {
  title: "Massage",
  description: "Book an in-villa or spa massage through Méndez Estates Aruba.",
};

export default function MassagePage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/experience-massage.jpg" alt="Massage at Méndez Estates" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Experience</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">
            <span className="italic text-gold">Massage</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <p className="text-center text-lg leading-relaxed text-navy/70">
              Ana arranges an exclusive massage experience for guests — at the villa by the pool, or at a nearby spa. Available by appointment, arranged personally by your host.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="rounded-3xl border border-navy/10 bg-cream/40 p-8 md:p-12">
              <h2 className="mb-8 font-display text-2xl text-navy">Request a Massage</h2>
              <ServiceInquiryForm
                serviceType="massage"
                submitLabel="Send Inquiry"
                fields={[
                  {
                    name: "location",
                    label: "Preferred Location",
                    type: "radio",
                    required: true,
                    options: ["At the Villa", "At the Spa"],
                  },
                  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 000 000 0000" },
                  { name: "date", label: "Preferred Date", type: "date", required: true },
                  { name: "message", label: "Special requests or notes", type: "textarea", placeholder: "Any preferences, injuries, or notes…" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
