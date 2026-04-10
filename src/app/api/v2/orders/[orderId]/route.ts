// src/app/api/v2/orders/[orderId]/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, apiSuccess, apiError } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { error, user } = await validateApiKey(req);
  if (error) return error;

  const order = await prisma.order.findFirst({
    where: { id: params.orderId, userId: user!.id },
    select: { id: true, status: true, quantity: true, totalPrice: true, createdAt: true, targetUsername: true },
  });

  if (!order) return apiError("Order not found", 404);
  return apiSuccess(order);
}
