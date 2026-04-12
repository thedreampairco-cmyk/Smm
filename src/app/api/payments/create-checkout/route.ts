import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Use Razorpay/UPI to add funds." }, { status: 503 });
}
