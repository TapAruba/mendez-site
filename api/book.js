// Server-side only. Creates a direct-booking reservation request in Smoobu.
// Ana confirms it there and sends the guest a secure payment link — no card data touches this site.
const CHANNEL_ID = 1638239; // website / direct-booking channel

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  if (!key) return res.status(200).json({ ok: false, offline: true });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (!b || !b.apartmentId || !DATE.test(b.arrival || '') || !DATE.test(b.departure || '') ||
      b.arrival >= b.departure || !b.name || !b.email || !/.+@.+\..+/.test(b.email)) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }

  const name = String(b.name).trim().slice(0, 120);
  const sp = name.indexOf(' ');
  const firstName = sp > 0 ? name.slice(0, sp) : name;
  const lastName = sp > 0 ? name.slice(sp + 1) : '—';
  const noticeParts = [];
  if (b.extras && b.extras.length) noticeParts.push('Extras requested: ' + [].concat(b.extras).join(', ').slice(0, 300));
  if (b.message) noticeParts.push(String(b.message).slice(0, 800));
  noticeParts.push('Sent from mendez-site direct booking form.');

  try {
    const r = await fetch('https://login.smoobu.com/api/reservations', {
      method: 'POST',
      headers: { 'Api-Key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        arrivalDate: b.arrival,
        departureDate: b.departure,
        apartmentId: Number(b.apartmentId),
        channelId: CHANNEL_ID,
        firstName,
        lastName,
        email: String(b.email).trim().slice(0, 200),
        adults: Math.max(1, Math.min(16, Number(b.guests) || 2)),
        children: 0,
        notice: noticeParts.join('\n')
      })
    });
    const j = await r.json().catch(() => null);
    if (!r.ok) return res.status(200).json({ ok: false, status: r.status, detail: j && (j.detail || j.title) });
    res.status(200).json({ ok: true, id: j && j.id });
  } catch (e) {
    res.status(200).json({ ok: false, offline: true });
  }
}
