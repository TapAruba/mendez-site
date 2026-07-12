// Server-side only. Live availability + full itemized price for a stay, straight from
// Smoobu's own daily rates. Returns { ok:false, offline:true } until SMOOBU_API_KEY
// authenticates — the front-end disables direct booking in that case.

// Fee structure per villa (mirrors the published Rates section).
const VILLAS = {
  naima:   { cleaningFee: 75,  baseOccupancy: 2 },
  maxwell: { cleaningFee: 250, baseOccupancy: 6 }
};
const TOURIST_TAX = 0.125;      // 12.5% government tax, on accommodation revenue
const LODGING_TAX_NIGHT = 3;    // USD per night, environmental tax
const EXTRA_GUEST_NIGHT = 35;   // USD per additional guest, per night
const CC_FEE_RATE = 0.03;       // 3% credit card fee, on the payable subtotal

export default async function handler(req, res) {
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  const { apartment, arrival, departure, villa, guests } = req.query || {};
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (!key) return res.status(200).json({ ok: false, offline: true });
  if (!apartment || !DATE.test(arrival || '') || !DATE.test(departure || '') || arrival >= departure) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }
  const v = VILLAS[villa] || VILLAS.naima;
  const guestCount = Math.max(1, Math.min(16, parseInt(guests, 10) || v.baseOccupancy));

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
    let nights = 0, nightlyTotal = 0, allAvailable = true, priced = true, minStay = 1;
    while (d < end) {
      const iso = d.toISOString().slice(0, 10);
      const day = days[iso];
      nights++;
      if (!day || day.available !== 1) allAvailable = false;
      if (day && typeof day.price === 'number') nightlyTotal += day.price; else priced = false;
      if (day && day.min_length_of_stay && day.min_length_of_stay > minStay) minStay = day.min_length_of_stay;
      d.setUTCDate(d.getUTCDate() + 1);
    }

    if (!priced) {
      return res.status(200).json({
        ok: true, available: allAvailable && nights >= 1, priced: false,
        nights, minStay, meetsMinStay: nights >= minStay
      });
    }

    const extraGuests = Math.max(0, guestCount - v.baseOccupancy);
    const extraGuestFee = Math.round(extraGuests * EXTRA_GUEST_NIGHT * nights);
    const accommodation = Math.round(nightlyTotal) + extraGuestFee;
    const cleaningFee = v.cleaningFee;
    const governmentTax = Math.round(accommodation * TOURIST_TAX);
    const environmentalTax = LODGING_TAX_NIGHT * nights;
    const subtotal = accommodation + cleaningFee + governmentTax + environmentalTax;
    const creditCardFee = Math.round(subtotal * CC_FEE_RATE);
    const total = subtotal + creditCardFee;

    res.status(200).json({
      ok: true,
      available: allAvailable && nights >= 1,
      priced: true,
      nights,
      minStay,
      meetsMinStay: nights >= minStay,
      guests: guestCount,
      baseOccupancy: v.baseOccupancy,
      extraGuests,
      accommodation,
      cleaningFee,
      governmentTax,
      environmentalTax,
      creditCardFee,
      total
    });
  } catch (e) {
    res.status(200).json({ ok: false, offline: true });
  }
}
