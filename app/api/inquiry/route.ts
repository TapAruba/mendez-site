import { NextRequest, NextResponse } from "next/server";
import { sendServiceInquiry } from "@/lib/email";

const ALLOWED_TYPES = ["private-chef", "massage", "island-tours", "car-rental"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...fields } = body;

    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (!fields.name || !fields.email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    await sendServiceInquiry(type, fields);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
