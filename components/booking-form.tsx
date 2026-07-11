"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { properties } from "@/lib/properties";

type Status = "idle" | "loading" | "success" | "error";

const STEPS = ["Property", "Dates", "Guests", "Add-ons", "Confirm"];

const ADD_ONS = [
  { id: "car", label: "Car Rental" },
  { id: "private-chef", label: "Private Chef" },
  { id: "massage", label: "Massage" },
  { id: "island-tours", label: "Island Tours" },
];

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    property: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addOns: [] as string[],
    message: "",
  });

  const set = (k: keyof typeof form, v: string | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleAddOn = (id: string) =>
    set(
      "addOns",
      form.addOns.includes(id) ? form.addOns.filter((a) => a !== id) : [...form.addOns, id]
    );

  async function submit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-sans text-sm text-navy outline-none focus:border-gold transition-colors";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-gold" />
        <h3 className="font-display text-3xl text-navy">Request Received!</h3>
        <p className="max-w-md text-navy/65">
          Ana will review your request and get back to you within 24 hours to confirm availability
          and next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Step indicators */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full font-sans text-[10px] transition-all duration-300 ${
                i < step
                  ? "bg-gold text-navy"
                  : i === step
                  ? "bg-navy text-cream"
                  : "bg-navy/10 text-navy/40"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-6 transition-all duration-300 ${i < step ? "bg-gold" : "bg-navy/15"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-navy">Choose Your Villa</h3>
              {properties.map((p) => (
                <label
                  key={p.slug}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all duration-200 ${
                    form.property === p.slug
                      ? "border-gold bg-gold/5"
                      : "border-navy/10 hover:border-navy/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="property"
                    value={p.slug}
                    checked={form.property === p.slug}
                    onChange={() => set("property", p.slug)}
                    className="accent-gold"
                  />
                  <div>
                    <div className="font-display text-xl text-navy">{p.name}</div>
                    <div className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.12em] text-navy/50">
                      {p.tagline}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-navy">Select Dates</h3>
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Check-in</label>
                <input type="date" className={input} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Check-out</label>
                <input type="date" className={input} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-navy">Guest Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">First Name</label>
                  <input type="text" className={input} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Last Name</label>
                  <input type="text" className={input} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Email</label>
                <input type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Phone</label>
                <input type="tel" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Number of Guests</label>
                <input type="number" min="1" max="10" className={input} value={form.guests} onChange={(e) => set("guests", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-navy">Add-ons</h3>
              <p className="text-sm text-navy/60">Optionally add services to your stay.</p>
              {ADD_ONS.map((a) => (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                    form.addOns.includes(a.id) ? "border-gold bg-gold/5" : "border-navy/10 hover:border-navy/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.addOns.includes(a.id)}
                    onChange={() => toggleAddOn(a.id)}
                    className="accent-gold"
                  />
                  <span className="font-sans text-sm text-navy">{a.label}</span>
                </label>
              ))}
              <div>
                <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">Special Requests</label>
                <textarea rows={3} className={`${input} resize-none`} value={form.message} onChange={(e) => set("message", e.target.value)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-navy">Confirm Your Request</h3>
              <div className="rounded-2xl border border-navy/10 p-5 space-y-3 text-sm text-navy/70">
                <div className="flex justify-between"><span>Property</span><span className="text-navy font-medium">{properties.find(p => p.slug === form.property)?.name ?? form.property}</span></div>
                <div className="flex justify-between"><span>Check-in</span><span className="text-navy">{form.checkIn}</span></div>
                <div className="flex justify-between"><span>Check-out</span><span className="text-navy">{form.checkOut}</span></div>
                <div className="flex justify-between"><span>Guests</span><span className="text-navy">{form.guests}</span></div>
                <div className="flex justify-between"><span>Name</span><span className="text-navy">{form.firstName} {form.lastName}</span></div>
                <div className="flex justify-between"><span>Email</span><span className="text-navy">{form.email}</span></div>
                {form.addOns.length > 0 && <div className="flex justify-between"><span>Add-ons</span><span className="text-navy">{form.addOns.map(id => ADD_ONS.find(a => a.id === id)?.label).join(", ")}</span></div>}
              </div>
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle size={16} /> Something went wrong. Please try again.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.16em] text-navy/60 hover:text-navy"
          >
            <ChevronLeft size={14} /> Back
          </button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 0 && !form.property}
            className="inline-flex items-center gap-1 rounded-full bg-navy px-7 py-3 font-sans text-[11px] uppercase tracking-[0.16em] text-cream transition-all hover:bg-gold hover:text-navy disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={status === "loading"}
            className="inline-flex items-center gap-1 rounded-full bg-gold px-7 py-3 font-sans text-[11px] uppercase tracking-[0.16em] text-navy transition-all hover:bg-navy hover:text-cream disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send Request"}
          </button>
        )}
      </div>
    </div>
  );
}
