// Server-side only. Live availability + price for a stay, straight from Smoobu rates.
// Returns { ok:false, offline:true } until SMOOBU_API_KEY authenticates — the
// front-end silently stays in "Ana confirms personally" mode in that case.

// Fee structure mirrored from the Smoobu price elements on Ana's direct Website channel.
// Long-stay discounts are deliberately NOT estimated (their threshold isn't exposed by the
// API), so the final quote Ana confirms can only come out lower than the site's estimate.
const CLEANING_FEE = 75;        // USD per stay
const TOURIST_TAX = 0.125;      // 12.5% of the room rate
const LODGING_TAX_NIGHT = 3;    // USD per night

export default async function handler(req, res) {
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  const { apartment, arrival, departure } = req.query || {};
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (!key) return res.status(200).json({ ok: false, offline: true });
  if (!apartment || !DATE.test(arrival || '') || !DATE.test(departure || '') || arrival >= departure) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }

  const headers = { 'Api-Key': key, 'Content-Type': 'application/json' };
  try {
    const url = 'https://login.smoobu.com/api/rates?apartments[]=' + encodeURIComponent(apartment) +
      '&start_date=' + arrival + '&end_date=' + departure;
    const r = await fetch(url, { headers });
    if (!r.ok) return res.status(200).json({ ok: false, offline: true, status: r.status });
    const j = await r.json();
    const days = (j && j.data && j.data[apartment]) || {};

    // walk each night of the stay (departure day itself is not a night)
    let d = new Date(arrival + 'T00:00:00Z');
    const end = new Date(departure + 'T00:00:00Z');
    let nights = 0, total = 0, allAvailable = true, priced = true, minStay = 1;
    while (d < end) {
      const iso = d.toISOString().slice(0, 10);
      const day = days[iso];
      nights++;
      if (!day || day.available !== 1) allAvailable = false;
      if (day && typeof day.price === 'number') total += day.price; else priced = false;
      if (day && day.min_length_of_stay && day.min_length_of_stay > minStay) minStay = day.min_length_of_stay;
      d.setUTCDate(d.getUTCDate() + 1);
    }

    const base = priced ? Math.round(total) : null;
    const taxes = priced ? Math.round(base * TOURIST_TAX + nights * LODGING_TAX_NIGHT) : null;
    res.status(200).json({
      ok: true,
      available: allAvailable && nights >= 1,
      nights,
      total: base,
      cleaning: priced ? CLEANING_FEE : null,
      taxes,
      estimate: priced ? base + CLEANING_FEE + taxes : null,
      minStay,
      meetsMinStay: nights >= minStay
    });
  } catch (e) {
    res.status(200).json({ ok: false, offline: true });
  }
}
