import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Stripe webhook disabled — enable by adding STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET
  return NextResponse.json({ received: true });
}
