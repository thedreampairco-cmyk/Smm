// src/app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "PARTIAL", "CANCELLED"]),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user!.id!,
      action: "UPDATE_STATUS",
      entity: "Order",
      entityId: order.id,
      details: { status: parsed.data.status } as any,
    },
  });

  return NextResponse.json({ order });
}
