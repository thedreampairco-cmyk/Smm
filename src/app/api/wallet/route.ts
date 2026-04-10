// src/app/api/wallet/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallet = await prisma.wallet.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id, balance: 0 },
  });

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ wallet, transactions });
}
