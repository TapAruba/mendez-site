// Server-side only. Per-day availability map for the booking calendar.
// { ok:true, days:{ 'YYYY-MM-DD': true|false } }  — true = available night.
// Returns { ok:false, offline:true } until SMOOBU_API_KEY authenticates.
export default async function handler(req, res) {
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  const { apartment, from, to } = req.query || {};
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (!key) return res.status(200).json({ ok: false, offline: true });
  if (!apartment || !DATE.test(from || '') || !DATE.test(to || '') || from >= to) {
    return res.status(400).json({ ok: false, error: 'bad params' });
  }
  // cap the window at ~4 months so a bad client can't hammer Smoobu
  const start = new Date(from + 'T00:00:00Z'), end = new Date(to + 'T00:00:00Z');
  if ((end - start) / 86400000 > 130) return res.status(400).json({ ok: false, error: 'range too large' });

  try {
    const url = 'https://login.smoobu.com/api/rates?apartments[]=' + encodeURIComponent(apartment) +
      '&start_date=' + from + '&end_date=' + to;
    const r = await fetch(url, { headers: { 'Api-Key': key, 'Content-Type': 'application/json' } });
    if (!r.ok) return res.status(200).json({ ok: false, offline: true, status: r.status });
    const j = await r.json();
    const raw = (j && j.data && j.data[apartment]) || {};
    const days = {};
    for (const d of Object.keys(raw)) days[d] = raw[d] && raw[d].available === 1;
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ ok: true, days });
  } catch (e) {
    res.status(200).json({ ok: false, offline: true });
  }
}
