import { Resend } from "resend";

const TO = "mendezestatesaruba@gmail.com";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getFrom() {
  return process.env.EMAIL_FROM ?? "noreply@mendezestatesaruba.com";
}

export async function sendBookingConfirmation(data: {
  guestName: string;
  guestEmail: string;
  property: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addOns: string[];
  message?: string;
}) {
  const addOnList = data.addOns.length ? data.addOns.join(", ") : "None";
  const html = `
    <h2>New Booking Request — ${data.property}</h2>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr><td><b>Guest</b></td><td>${data.guestName}</td></tr>
      <tr><td><b>Email</b></td><td>${data.guestEmail}</td></tr>
      <tr><td><b>Property</b></td><td>${data.property}</td></tr>
      <tr><td><b>Check-in</b></td><td>${data.checkIn}</td></tr>
      <tr><td><b>Check-out</b></td><td>${data.checkOut}</td></tr>
      <tr><td><b>Guests</b></td><td>${data.guests}</td></tr>
      <tr><td><b>Add-ons</b></td><td>${addOnList}</td></tr>
      <tr><td><b>Message</b></td><td>${data.message ?? "—"}</td></tr>
    </table>
  `;

  const resend = getResend();
  const FROM = getFrom();

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Booking Request: ${data.property} — ${data.guestName}`,
    html,
  });

  await resend.emails.send({
    from: FROM,
    to: data.guestEmail,
    subject: `We received your request — Méndez Estates Aruba`,
    html: `<p>Hi ${data.guestName},</p><p>Thank you for your booking request for <b>${data.property}</b>. Ana will be in touch shortly to confirm availability and next steps.</p><p>— Méndez Estates Aruba</p>`,
  });
}

const SERVICE_LABELS: Record<string, string> = {
  "private-chef": "Private Chef",
  massage: "Massage",
  "island-tours": "Island Tours",
  "car-rental": "Car Rental",
};

export async function sendServiceInquiry(serviceType: string, fields: Record<string, string>) {
  const label = SERVICE_LABELS[serviceType] ?? serviceType;
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`)
    .join("");
  const html = `<h2>Service Inquiry — ${label}</h2><table border="1" cellpadding="6" cellspacing="0">${rows}</table>`;

  const resend = getResend();
  const FROM = getFrom();

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Inquiry: ${label} — ${fields.name ?? "Guest"}`,
    html,
  });
}
