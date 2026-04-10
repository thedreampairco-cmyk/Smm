// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";
import { AdminOrdersClient } from "@/components/admin/admin-orders-client";
export const metadata = { title: "Manage Orders" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: { select: { email: true, name: true } },
      service: { select: { name: true, category: true } },
    },
  });
  return <AdminOrdersClient orders={JSON.parse(JSON.stringify(orders))} />;
}
