// src/app/api/admin/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function isAdmin() {
  const session = await auth();
  return session?.user && (session.user as any).role === "ADMIN" ? session : null;
}

const serviceSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  rate: z.number().positive(),
  minQuantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const session = await isAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = await isAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const service = await prisma.service.create({ data: parsed.data });

  await prisma.auditLog.create({
    data: {
      userId: session.user!.id!,
      action: "CREATE",
      entity: "Service",
      entityId: service.id,
      details: { name: service.name },
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
