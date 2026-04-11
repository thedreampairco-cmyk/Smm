// src/app/api/refills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  orderId: z.string(),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { orderId, reason } = parsed.data;

  // Verify order belongs to user and is completed
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: session.user.id, status: "COMPLETED" },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found or not eligible for refill" }, { status: 404 });

  // Check for existing pending refill
  const existing = await prisma.refillRequest.findFirst({
    where: { orderId, status: "PENDING" },
  });

  if (existing)
    return NextResponse.json({ error: "A refill request is already pending for this order" }, { status: 409 });

  const refill = await prisma.refillRequest.create({
    data: { userId: session.user.id, orderId, reason },
  });

  return NextResponse.json({ refill }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const refills = await prisma.refillRequest.findMany({
    where: { userId: session.user.id },
    include: { order: { select: { id: true, targetUsername: true, service: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ refills });
}
