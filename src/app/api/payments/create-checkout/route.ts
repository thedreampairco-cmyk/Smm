import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Card payments coming soon. Please use UPI/Razorpay to add funds." },
    { status: 503 }
  );
}
