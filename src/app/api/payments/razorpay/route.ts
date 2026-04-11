// src/app/api/payments/razorpay/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({ amount: z.number().min(10).max(100000) });

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Amount must be ₹10–₹1,00,000" }, { status: 400 });

  const { amount } = parsed.data;

  // If Razorpay keys are configured, create a real order
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
      const credentials = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          amount: amount * 100, // paise
          currency: "INR",
          receipt: `wallet_${session.user.id}_${Date.now()}`,
          notes: { userId: session.user.id },
        }),
      });

      const order = await response.json();
      if (!response.ok) throw new Error(order.error?.description ?? "Razorpay error");

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // Demo mode — return mock order
  return NextResponse.json({
    orderId: `demo_${Date.now()}`,
    amount: amount * 100,
    currency: "INR",
    keyId: "demo",
    demo: true,
  });
}
