const BASE = "https://login.smoobu.com/api";
const KEY = process.env.SMOOBU_API_KEY ?? "";

export async function getAvailability(apartmentId: string, from: string, to: string) {
  const res = await fetch(
    `${BASE}/apartments/${apartmentId}/availabilities?start_date=${from}&end_date=${to}`,
    { headers: { "Api-Key": KEY, "Content-Type": "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Smoobu availability error: ${res.status}`);
  return res.json();
}

export async function createReservation(data: {
  apartmentId: string;
  arrival: string;
  departure: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  adults: number;
  notice?: string;
}) {
  const res = await fetch(`${BASE}/reservations`, {
    method: "POST",
    headers: { "Api-Key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      arrivalDate: data.arrival,
      departureDate: data.departure,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      adults: data.adults,
      apartmentId: data.apartmentId,
      notice: data.notice,
    }),
  });
  if (!res.ok) throw new Error(`Smoobu booking error: ${res.status}`);
  return res.json();
}
