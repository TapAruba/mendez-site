// Temporary read-only diagnostic. Not linked from any page. Safe to delete after use.
export default async function handler(req, res) {
  const key = (process.env.SMOOBU_API_KEY || '').trim();
  if (!key) return res.status(200).json({ ok: false, offline: true });
  try {
    const r = await fetch('https://login.smoobu.com/api/apartments/1218098', {
      headers: { 'Api-Key': key, 'Content-Type': 'application/json' }
    });
    const j = await r.json().catch(() => null);
    res.status(200).json({ ok: r.ok, status: r.status, data: j });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e) });
  }
}
