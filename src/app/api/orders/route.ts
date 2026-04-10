// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateOrderPrice, validateQuantity } from "@/lib/order-utils";
import { z } from "zod";

const placeOrderSchema = z.object({
  serviceId: z.string().cuid(),
  quantity: z.number().int().positive(),
  targetUsername: z.string().min(1).max(255),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const status = searchParams.get("status");

  const where: any = { userId: session.user.id };
  if (status) where.status = status.toUpperCase();

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { service: { select: { name: true, category: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = placeOrderSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { serviceId, quantity, targetUsername } = parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId, isActive: true } });
  if (!service)
    return NextResponse.json({ error: "Service not found" }, { status: 404 });

  if (!validateQuantity(quantity, service.minQuantity, service.maxQuantity))
    return NextResponse.json(
      { error: `Quantity must be between ${service.minQuantity} and ${service.maxQuantity}` },
      { status: 400 }
    );

  const totalPrice = calculateOrderPrice(service.rate, quantity);

  const wallet = await prisma.wallet.findUnique({ where: { userId: session.user.id } });
  if (!wallet || wallet.balance < totalPrice)
    return NextResponse.json({ error: "Insufficient balance" }, { status: 402 });

  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: {
        userId: session.user.id,
        serviceId,
        quantity,
        targetUsername,
        totalPrice,
        status: "PENDING",
      },
      include: { service: { select: { name: true, category: true } } },
    }),
    prisma.wallet.update({
      where: { userId: session.user.id },
      data: { balance: { decrement: totalPrice } },
    }),
  ]);

  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      orderId: order.id,
      type: "ORDER_PAYMENT",
      amount: -totalPrice,
      description: `Order #${order.id.slice(-8)} — ${service.name}`,
    },
  });

  // Update service popularity
  await prisma.service.update({
    where: { id: serviceId },
    data: { popularity: { increment: 1 } },
  });

  return NextResponse.json({ order }, { status: 201 });
}
