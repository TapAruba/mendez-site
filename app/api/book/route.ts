import { NextRequest, NextResponse } from "next/server";
import { createReservation } from "@/lib/smoobu";
import { sendBookingConfirmation } from "@/lib/email";
import { properties } from "@/lib/properties";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { property, checkIn, checkOut, firstName, lastName, email, phone, guests, addOns, message } = body;

    const prop = properties.find((p) => p.slug === property);
    if (!prop) return NextResponse.json({ error: "Invalid property" }, { status: 400 });
    if (!checkIn || !checkOut || !firstName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await createReservation({
      apartmentId: prop.smoobuId,
      arrival: checkIn,
      departure: checkOut,
      firstName,
      lastName,
      email,
      phone,
      adults: parseInt(guests) || 2,
      notice: message,
    });

    await sendBookingConfirmation({
      guestName: `${firstName} ${lastName}`,
      guestEmail: email,
      property: prop.name,
      checkIn,
      checkOut,
      guests: parseInt(guests) || 2,
      addOns: addOns ?? [],
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
