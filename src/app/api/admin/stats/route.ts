// src/app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalOrders, totalUsers, pendingOrders, completedOrders, revenueData, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "COMPLETED" } }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: "DEPOSIT", createdAt: { gte: startOfMonth } },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true } },
          service: { select: { name: true } },
        },
      }),
    ]);

  return NextResponse.json({
    stats: {
      totalOrders,
      totalUsers,
      pendingOrders,
      completedOrders,
      monthlyRevenue: revenueData._sum.amount ?? 0,
    },
    recentOrders,
  });
}
