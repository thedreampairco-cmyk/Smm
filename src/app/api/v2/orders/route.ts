// src/app/api/v2/orders/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, apiSuccess, apiError } from "@/lib/api-auth";
import { calculateOrderPrice, validateQuantity } from "@/lib/order-utils";
import { z } from "zod";

const schema = z.object({
  serviceId: z.string(),
  quantity: z.number().int().positive(),
  targetUsername: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const { error, user } = await validateApiKey(req);
  if (error) return error;

  const body = await req.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const parsed = schema.safeParse(body);
  if (!parsed.success) return apiError(parsed.error.issues[0].message);

  const { serviceId, quantity, targetUsername } = parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId, isActive: true } });
  if (!service) return apiError("Service not found", 404);

  if (!validateQuantity(quantity, service.minQuantity, service.maxQuantity))
    return apiError(`Quantity must be ${service.minQuantity}–${service.maxQuantity}`);

  const totalPrice = calculateOrderPrice(service.rate, quantity);
  const wallet = user!.wallet;

  if (!wallet || wallet.balance < totalPrice)
    return apiError("Insufficient balance", 402);

  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: { userId: user!.id, serviceId, quantity, targetUsername, totalPrice, status: "PENDING" },
    }),
    prisma.wallet.update({
      where: { userId: user!.id },
      data: { balance: { decrement: totalPrice } },
    }),
  ]);

  return apiSuccess({ orderId: order.id, status: order.status, totalPrice }, 201);
}
