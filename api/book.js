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
      b.arrival >= b.departure || !b.name || !b.email || !/.+@.+\..+/.test(b.email) ||
      !b.phone || !String(b.phone).trim() || !b.country || !String(b.country).trim()) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }

  const name = String(b.name).trim().slice(0, 120);
  const sp = name.indexOf(' ');
  const firstName = sp > 0 ? name.slice(0, sp) : name;
  const lastName = sp > 0 ? name.slice(sp + 1) : '—';
  const noticeParts = [];
  if (b.extras && b.extras.length) noticeParts.push('Extras requested: ' + [].concat(b.extras).join(', ').slice(0, 300));
  if (b.message) noticeParts.push(String(b.message).slice(0, 800));
  const bd = b.breakdown && typeof b.breakdown === 'object' ? b.breakdown : null;
  const money = function(n){ return '$' + Math.round(Number(n) || 0).toLocaleString('en-US'); };
  if (bd){
    noticeParts.push(
      'Price breakdown shown to guest (' + (bd.seasonLabel || '') + '):\n' +
      '  Nightly rate: ' + money(bd.nightlyRate) + '\n' +
      '  Accommodation subtotal: ' + money(bd.accommodationSubtotal) + '\n' +
      '  Cleaning fee: ' + money(bd.cleaningFee) + '\n' +
      '  Government tax: ' + money(bd.governmentTax) + '\n' +
      '  Environmental tax: ' + money(bd.environmentalTax) + '\n' +
      '  Additional guest fee: ' + money(bd.additionalGuestFee) + '\n' +
      '  Credit card fee: ' + money(bd.creditCardFee) + '\n' +
      '  TOTAL: ' + money(bd.total)
    );
  } else {
    const est = Number(b.estimate);
    if (est > 0 && est < 1000000) noticeParts.push('Site estimate shown to guest: $' + est + '.');
  }
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
        phone: String(b.phone).trim().slice(0, 40),
        country: String(b.country).trim().slice(0, 80),
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
