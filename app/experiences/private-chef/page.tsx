import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ServiceInquiryForm } from "@/components/service-inquiry-form";

export const metadata: Metadata = {
  title: "Private Chef",
  description: "Book a private chef experience at your Méndez Estates villa in Aruba.",
};

export default function PrivateChefPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center overflow-hidden bg-navy">
        <Image src="images/experience-dinner.jpg" alt="Private chef at Méndez Estates" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative z-10 text-center text-white">
          <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">— Experience</div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">
            Private <span className="italic text-gold">Chef</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <p className="text-center text-lg leading-relaxed text-navy/70">
              Ana arranges a private chef to come to your villa and prepare a delicious, home-style meal for you and your guests — a memorable evening without leaving the property.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="rounded-3xl border border-navy/10 bg-cream/40 p-8 md:p-12">
              <h2 className="mb-8 font-display text-2xl text-navy">Request Private Chef</h2>
              <ServiceInquiryForm
                serviceType="private-chef"
                submitLabel="Send Inquiry"
                fields={[
                  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+1 000 000 0000" },
                  { name: "date", label: "Preferred Date", type: "date", required: true },
                  {
                    name: "occasion",
                    label: "Occasion",
                    type: "select",
                    options: ["Birthday", "Anniversary", "Honeymoon", "Family Dinner", "Other"],
                  },
                  { name: "message", label: "Dietary needs or special requests", type: "textarea", placeholder: "Any allergies, preferences, or notes…" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
