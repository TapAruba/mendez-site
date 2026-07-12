// Server-side only. Self-contained seasonal pricing engine — the total is always
// computable from the published rate table below, independent of whether Smoobu has
// day-rates loaded for the requested dates. If a Smoobu apartment ID is supplied,
// real-time day-by-day availability is layered on top (available: true/false);
// otherwise availability is reported as null ("not yet confirmed live") rather than
// blocking the guest from seeing pricing or submitting a request.

const RATES = {
  naima:   { low: 89,  mid: 105, high: 150, cleaningFee: 75,  baseOccupancy: 2, minStay: { low: 3, mid: 3, high: 5 } },
  maxwell: { low: 295, mid: 365, high: 565, cleaningFee: 250, baseOccupancy: 6, minStay: { low: 2, mid: 2, high: 5 } }
};
const SEASON_LABEL = { low: 'Low Season', mid: 'Mid Season', high: 'High Season' };
const TOURIST_TAX = 0.125;      // 12.5% government tax, on room + extra-guest revenue
const LODGING_TAX_NIGHT = 3;    // USD per night, environmental tax
const EXTRA_GUEST_NIGHT = 35;   // USD per additional guest, per night
const CC_FEE_RATE = 0.03;       // 3% credit card fee, on the payable subtotal

function seasonOfDate(iso){
  var p = iso.split('-'), m = Number(p[1]), d = Number(p[2]);
  if ((m === 12 && d >= 20) || (m === 1 && d <= 4)) return 'high';
  if (m === 1 || m === 2 || m === 3) return 'mid';
  return 'low';
}

function computeQuote(villa, arrival, departure, guests){
  var v = RATES[villa];
  if (!v) return null;
  var d = new Date(arrival + 'T00:00:00Z');
  var end = new Date(departure + 'T00:00:00Z');
  var nights = 0, accommodationSubtotal = 0;
  var arrivalSeason = seasonOfDate(arrival);
  while (d < end){
    var iso = d.toISOString().slice(0, 10);
    accommodationSubtotal += v[seasonOfDate(iso)];
    nights++;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  var guestCount = Math.max(1, Math.min(16, parseInt(guests, 10) || v.baseOccupancy));
  var extraGuests = Math.max(0, guestCount - v.baseOccupancy);
  var additionalGuestFee = extraGuests * EXTRA_GUEST_NIGHT * nights;
  var cleaningFee = v.cleaningFee;
  var governmentTax = Math.round((accommodationSubtotal + additionalGuestFee) * TOURIST_TAX);
  var environmentalTax = LODGING_TAX_NIGHT * nights;
  var subtotalBeforeCC = accommodationSubtotal + additionalGuestFee + cleaningFee + governmentTax + environmentalTax;
  var creditCardFee = Math.round(subtotalBeforeCC * CC_FEE_RATE);
  var total = subtotalBeforeCC + creditCardFee;
  var minStay = v.minStay[arrivalSeason];
  return {
    nights: nights,
    season: arrivalSeason, seasonLabel: SEASON_LABEL[arrivalSeason], nightlyRate: v[arrivalSeason],
    minStay: minStay, meetsMinStay: nights >= minStay,
    guests: guestCount, baseOccupancy: v.baseOccupancy, extraGuests: extraGuests,
    accommodationSubtotal: accommodationSubtotal, additionalGuestFee: additionalGuestFee,
    cleaningFee: cleaningFee, governmentTax: governmentTax, environmentalTax: environmentalTax,
    creditCardFee: creditCardFee, total: total
  };
}

export default async function handler(req, res) {
  var q = req.query || {};
  var villa = q.villa, arrival = q.arrival, departure = q.departure, apartment = q.apartment, guests = q.guests;
  var DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (!RATES[villa] || !DATE.test(arrival || '') || !DATE.test(departure || '') || arrival >= departure) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }

  var quote = computeQuote(villa, arrival, departure, guests);
  var available = null; // unknown by default — this villa has no live Smoobu calendar yet

  if (apartment) {
    var key = (process.env.SMOOBU_API_KEY || '').trim();
    if (key) {
      try {
        var url = 'https://login.smoobu.com/api/rates?apartments[]=' + encodeURIComponent(apartment) +
          '&start_date=' + arrival + '&end_date=' + departure;
        var r = await fetch(url, { headers: { 'Api-Key': key, 'Content-Type': 'application/json' } });
        if (r.ok) {
          var j = await r.json();
          var days = (j && j.data && j.data[apartment]) || {};
          var d = new Date(arrival + 'T00:00:00Z');
          var end = new Date(departure + 'T00:00:00Z');
          available = true;
          while (d < end) {
            var iso = d.toISOString().slice(0, 10);
            var day = days[iso];
            if (!day || day.available !== 1) available = false;
            d.setUTCDate(d.getUTCDate() + 1);
          }
        }
      } catch (e) { /* leave available null — pricing still stands */ }
    }
  }

  res.status(200).json(Object.assign({ ok: true, villa: villa, arrival: arrival, departure: departure, available: available }, quote));
}
