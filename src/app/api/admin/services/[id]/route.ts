// src/app/api/admin/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function isAdmin() {
  const session = await auth();
  return session?.user && (session.user as any).role === "ADMIN" ? session : null;
}

const schema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  rate: z.number().positive().optional(),
  minQuantity: z.number().int().positive().optional(),
  maxQuantity: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await isAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const service = await prisma.service.update({
    where: { id: params.id },
    data: parsed.data,
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user!.id!,
      action: "UPDATE",
      entity: "Service",
      entityId: service.id,
      details: parsed.data as any,
    },
  });

  return NextResponse.json({ service });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await isAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.service.delete({ where: { id: params.id } });

  await prisma.auditLog.create({
    data: {
      userId: session.user!.id!,
      action: "DELETE",
      entity: "Service",
      entityId: params.id,
    },
  });

  return NextResponse.json({ success: true });
}
