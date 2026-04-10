// src/app/api/payments/create-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const schema = z.object({ amount: z.number().min(5).max(1000) });

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Amount must be $5–$1000" }, { status: 400 });

  const { amount } = parsed.data;

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "SMM Panel Pro — Wallet Top-Up" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?funded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    metadata: { userId: session.user.id, amount: amount.toString() },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
