import { unstable_noStore as noStore } from "next/cache";
// src/app/admin/tickets/page.tsx
import { prisma } from "@/lib/prisma";
import { AdminTicketsClient } from "./admin-tickets-client";
export const metadata = { title: "Admin — Support Tickets" };

export default async function AdminTicketsPage() {
  noStore();
  const tickets = await prisma.ticket.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  return <AdminTicketsClient tickets={JSON.parse(JSON.stringify(tickets))} />;
}
