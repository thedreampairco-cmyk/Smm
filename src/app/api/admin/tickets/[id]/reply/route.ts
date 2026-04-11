import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = await req.json();
  const parsed = z.object({ message: z.string().min(1) }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Message required" }, { status: 400 });
  const message = await prisma.ticketMessage.create({
    data: { ticketId: id, userId: session.user.id!, message: parsed.data.message, isAdmin: true },
  });
  await prisma.ticket.update({ where: { id }, data: { status: "IN_PROGRESS", updatedAt: new Date() } });
  return NextResponse.json({ message });
}
