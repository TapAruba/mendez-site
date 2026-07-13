// Méndez Estates — booking-request handler (Vercel serverless function)
// Used by villas that are NOT on Smoobu (currently Maxwell, at Ana's request):
// the guest submits once and Ana receives the fully-priced request by email.
// reply_to is the guest, so Ana replies straight to them with a payment link.
//
// Requires env var RESEND_API_KEY. Sends from taparuba.com (verified in Resend);
// if mendezestatesaruba.com is ever verified there, change FROM to it.

// ENQUIRY_TO lets us route test sends away from Ana's inbox; unset in production.
const TO = process.env.ENQUIRY_TO || 'mendezestatesaruba@gmail.com';
const FROM = 'Méndez Estates <bookings@taparuba.com>';

const CREAM = '#F2ECE2', LAGOON = '#0F2E36', TEAL = '#2C6E77', ACC = '#4FAAB2', MUTED = '#6B7C7F';

const esc = (s = '') =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

const money = (n) =>
  typeof n === 'number' && isFinite(n) ? '$' + Math.round(n).toLocaleString('en-US') : null;

const row = (label, value) =>
  `<tr><td style="padding:8px 0;color:${MUTED};width:132px;font-size:14px">${esc(label)}</td>` +
  `<td style="padding:8px 0;font-size:15px;color:${LAGOON}">${value}</td></tr>`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const {
      villa = '', arrival = '', departure = '', nights = '', guests = '',
      name = '', email = '', phone = '', country = '',
      message = '', breakdown = null, company = '',
    } = body;

    // honeypot — bots fill this hidden field
    if (company) return res.status(200).json({ ok: true });

    if (!name.trim() || !email.trim() || !arrival || !departure) {
      return res.status(400).json({ error: 'Name, email and dates are required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Email service not configured.' });

    // Itemised quote exactly as the guest saw it on the site, so Ana can confirm
    // against her own numbers before sending the payment link.
    let quoteBlock = '';
    if (breakdown && typeof breakdown === 'object') {
      const b = breakdown;
      const line = (l, v) =>
        v == null ? '' :
        `<tr><td style="padding:5px 0;color:${MUTED};font-size:14px">${esc(l)}</td>` +
        `<td style="padding:5px 0;text-align:right;font-size:14px;color:${LAGOON}">${esc(v)}</td></tr>`;

      quoteBlock = `
        <div style="margin-top:20px;padding:18px 20px;background:${CREAM};border-radius:12px">
          <div style="font-size:13px;color:${TEAL};letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">
            Estimate shown to guest${b.seasonLabel ? ` · ${esc(b.seasonLabel)}` : ''}
          </div>
          <table style="width:100%;border-collapse:collapse">
            ${line('Stay', money(b.stay))}
            ${line('Cleaning', money(b.cleaning))}
            ${line('Taxes', money(b.taxes))}
            ${line('Card fee', money(b.cardFee))}
            <tr><td style="padding:10px 0 0;border-top:1px solid #DCD3C4;font-weight:600;color:${LAGOON}">Total</td>
                <td style="padding:10px 0 0;border-top:1px solid #DCD3C4;text-align:right;font-weight:600;color:${LAGOON}">${esc(money(b.total) || '—')}</td></tr>
          </table>
          <div style="margin-top:10px;font-size:12px;color:${MUTED};line-height:1.5">
            No long-stay discount was estimated — your final quote can only be lower.
          </div>
        </div>`;
    }

    const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;max-width:580px;margin:0 auto">
        <div style="background:${LAGOON};color:#fff;padding:24px 26px;border-radius:14px 14px 0 0">
          <div style="font-size:20px;letter-spacing:.04em">Méndez Estates</div>
          <div style="font-family:Arial,sans-serif;font-size:13px;color:${ACC};margin-top:5px;letter-spacing:.06em;text-transform:uppercase">
            New booking request${villa ? ` · ${esc(villa)}` : ''}
          </div>
        </div>
        <div style="border:1px solid #E3DDD1;border-top:none;border-radius:0 0 14px 14px;padding:24px 26px;background:#fff;font-family:Arial,sans-serif">
          <table style="width:100%;border-collapse:collapse">
            ${row('Villa', `<strong>${esc(villa) || '—'}</strong>`)}
            ${row('Check-in', esc(arrival))}
            ${row('Check-out', esc(departure))}
            ${row('Nights', esc(String(nights)) || '—')}
            ${row('Guests', esc(String(guests)) || '—')}
          </table>
          <div style="margin-top:18px;padding-top:16px;border-top:1px solid #E3DDD1">
            <table style="width:100%;border-collapse:collapse">
              ${row('Name', `<strong>${esc(name)}</strong>`)}
              ${row('Email', `<a href="mailto:${esc(email)}" style="color:${TEAL}">${esc(email)}</a>`)}
              ${row('Phone', `<a href="tel:${esc(phone)}" style="color:${TEAL}">${esc(phone) || '—'}</a>`)}
              ${row('Country', esc(country) || '—')}
            </table>
          </div>
          ${message.trim() ? `
          <div style="margin-top:18px;padding-top:16px;border-top:1px solid #E3DDD1">
            <div style="color:${MUTED};font-size:13px;margin-bottom:6px">Message</div>
            <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;color:${LAGOON}">${esc(message)}</div>
          </div>` : ''}
          ${quoteBlock}
          <div style="margin-top:20px;font-size:13px;color:${MUTED};line-height:1.6">
            Reply to this email to reach ${esc(name)} directly and confirm availability + payment.
          </div>
        </div>
      </div>`;

    const text = [
      `New booking request — ${villa}`, '',
      `Villa:      ${villa}`,
      `Check-in:   ${arrival}`,
      `Check-out:  ${departure}`,
      `Nights:     ${nights}`,
      `Guests:     ${guests}`, '',
      `Name:       ${name}`,
      `Email:      ${email}`,
      `Phone:      ${phone}`,
      `Country:    ${country}`,
      message.trim() ? `\nMessage:\n${message}` : '',
      breakdown && breakdown.total ? `\nEstimate shown to guest: ${money(breakdown.total)} total (incl. cleaning, taxes & card fee).` : '',
    ].filter(Boolean).join('\n');

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Booking request — ${villa || 'Méndez Estates'} · ${arrival} → ${departure} · ${name}`,
        html,
        text,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('Resend error:', detail);
      return res.status(502).json({ error: 'Could not send your request.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
