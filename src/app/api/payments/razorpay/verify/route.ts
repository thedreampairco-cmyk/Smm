// src/app/api/payments/razorpay/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { z } from "zod";

const schema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  amount: z.number(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = parsed.data;

  // Verify signature (skip in demo mode)
  if (process.env.RAZORPAY_KEY_SECRET && razorpay_order_id !== `demo_${razorpay_order_id.split("_")[1]}`) {
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  const amountInRupees = amount / 100;

  await prisma.$transaction([
    prisma.wallet.upsert({
      where: { userId: session.user.id },
      update: { balance: { increment: amountInRupees } },
      create: { userId: session.user.id, balance: amountInRupees, currency: "INR" },
    }),
    prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: "DEPOSIT",
        amount: amountInRupees,
        stripePaymentId: razorpay_payment_id,
        description: `Wallet top-up via UPI/Razorpay`,
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}
