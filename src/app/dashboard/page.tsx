// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin?callbackUrl=/dashboard");

  const [wallet, orders, transactions] = await Promise.all([
    prisma.wallet.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id, balance: 0 },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { service: { select: { name: true, category: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DashboardClient
            user={session.user}
            wallet={wallet}
            orders={JSON.parse(JSON.stringify(orders))}
            transactions={JSON.parse(JSON.stringify(transactions))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
