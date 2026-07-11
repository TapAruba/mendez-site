"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea" | "radio" | "number";
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ServiceInquiryForm({
  serviceType,
  fields,
  submitLabel = "Send Inquiry",
}: {
  serviceType: string;
  fields: Field[];
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (name: string, val: string) => setValues((v) => ({ ...v, [name]: val }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: serviceType, ...values }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="font-display text-2xl text-navy">Inquiry Sent!</h3>
        <p className="text-navy/65">Ana will be in touch shortly to confirm the details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {fields.map((f) => {
        const base =
          "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-sans text-sm text-navy outline-none focus:border-gold transition-colors";
        if (f.type === "select") {
          return (
            <div key={f.name}>
              <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">
                {f.label}
              </label>
              <select
                required={f.required}
                className={base}
                onChange={(e) => set(f.name, e.target.value)}
              >
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          );
        }
        if (f.type === "radio") {
          return (
            <div key={f.name}>
              <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">
                {f.label}
              </label>
              <div className="flex flex-wrap gap-4">
                {f.options?.map((o) => (
                  <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-navy">
                    <input
                      type="radio"
                      name={f.name}
                      value={o}
                      required={f.required}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="accent-gold"
                    />
                    {o}
                  </label>
                ))}
              </div>
            </div>
          );
        }
        if (f.type === "textarea") {
          return (
            <div key={f.name}>
              <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">
                {f.label}
              </label>
              <textarea
                required={f.required}
                rows={4}
                placeholder={f.placeholder}
                className={`${base} resize-none`}
                onChange={(e) => set(f.name, e.target.value)}
              />
            </div>
          );
        }
        return (
          <div key={f.name}>
            <label className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.14em] text-navy/55">
              {f.label}
            </label>
            <input
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              className={base}
              onChange={(e) => set(f.name, e.target.value)}
            />
          </div>
        );
      })}

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-navy px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-gold hover:text-navy disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
