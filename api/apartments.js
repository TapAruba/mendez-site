// Server-side only. Diagnostic: figure out which auth method Smoobu accepts.
export default async function handler(req, res) {
  const raw = process.env.SMOOBU_API_KEY;
  if (!raw) return res.status(500).json({ ok: false, error: 'SMOOBU_API_KEY is not set in Vercel.' });
  const key = raw.trim();
  const noPrefix = key.replace(/^usr_live_/, '').replace(/^usr_/, '');

  const attempts = [
    { label: 'Api-Key (full)', headers: { 'Api-Key': key } },
    { label: 'Authorization Bearer (full)', headers: { 'Authorization': 'Bearer ' + key } },
    { label: 'Api-Key (no prefix)', headers: { 'Api-Key': noPrefix } }
  ];

  const results = [];
  let good = null;
  for (const a of attempts) {
    try {
      const r = await fetch('https://login.smoobu.com/api/me', {
        headers: { ...a.headers, 'Content-Type': 'application/json' }
      });
      results.push({ method: a.label, status: r.status });
      if (r.ok && !good) good = a.headers;
    } catch (e) {
      results.push({ method: a.label, error: String((e && e.message) || e) });
    }
  }

  const diag = { keyLength: raw.length, prefix: key.slice(0, 4) + '…' };
  if (!good) {
    return res.status(200).json({ ok: false, step: 'auth', diag, results });
  }
  // We have a working auth — list apartments
  const headers = { ...good, 'Content-Type': 'application/json' };
  const r = await fetch('https://login.smoobu.com/api/apartments', { headers });
  const data = await r.json();
  const ids = (data && data.apartments) || [];
  const apartments = await Promise.all(ids.map(async (id) => {
    try {
      const dr = await fetch(`https://login.smoobu.com/api/apartments/${id}`, { headers });
      const dj = await dr.json();
      return { id, name: dj.name || (dj.apartment && dj.apartment.name) || null };
    } catch { return { id, name: null }; }
  }));
  res.status(200).json({ ok: true, diag, results, count: ids.length, apartments });
}
