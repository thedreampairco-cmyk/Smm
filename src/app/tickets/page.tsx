export const dynamic = "force-dynamic";
// src/app/tickets/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TicketsClient } from "./tickets-client";

export const metadata = { title: "Support Tickets" };

export default async function TicketsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin?callbackUrl=/tickets");

  const [tickets, orders] = await Promise.all([
    prisma.ticket.findMany({
      where: { userId: session.user.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      select: { id: true, targetUsername: true, service: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TicketsClient
            tickets={JSON.parse(JSON.stringify(tickets))}
            orders={JSON.parse(JSON.stringify(orders))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
