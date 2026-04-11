// src/app/api/api-keys/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await prisma.apiKey.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const schema = z.object({ name: z.string().min(1).max(50) });
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Name required" }, { status: 400 });

  // Limit to 5 API keys per user
  const count = await prisma.apiKey.count({ where: { userId: session.user.id } });
  if (count >= 5)
    return NextResponse.json({ error: "Maximum 5 API keys allowed" }, { status: 400 });

  const key = `smm_${crypto.randomBytes(24).toString("hex")}`;

  const apiKey = await prisma.apiKey.create({
    data: { userId: session.user.id, key, name: parsed.data.name },
  });

  return NextResponse.json({ apiKey }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.apiKey.deleteMany({ where: { id, userId: session.user.id } });

  return NextResponse.json({ success: true });
}
