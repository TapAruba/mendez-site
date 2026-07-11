// Server-side only. Lists Smoobu apartments for the booking enhancement layer.
export default async function handler(req, res) {
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  if (!key) return res.status(200).json({ ok: false, offline: true });
  try {
    const r = await fetch('https://login.smoobu.com/api/apartments', {
      headers: { 'Api-Key': key, 'Content-Type': 'application/json' }
    });
    if (!r.ok) return res.status(200).json({ ok: false, offline: true, status: r.status });
    const data = await r.json();
    const apartments = (data.apartments || []).map(a => ({ id: a.id, name: a.name }));
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.status(200).json({ ok: true, count: apartments.length, apartments });
  } catch (e) {
    res.status(200).json({ ok: false, offline: true });
  }
}
