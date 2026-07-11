import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/smoobu";
import { properties } from "@/lib/properties";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const prop = properties.find((p) => p.slug === slug);
  if (!prop) return NextResponse.json({ error: "Property not found" }, { status: 404 });

  try {
    const data = await getAvailability(prop.smoobuId, from, to);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
