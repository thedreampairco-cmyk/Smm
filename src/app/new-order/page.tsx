import { unstable_noStore as noStore } from "next/cache";
// src/app/new-order/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NewOrderClient } from "./new-order-client";

export const metadata = { title: "New Order" };

export default async function NewOrderPage() {
  noStore();
  const session = await auth();
  if (!session?.user?.id) redirect("/signin?callbackUrl=/new-order");

  const [services, wallet] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
    prisma.wallet.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id, balance: 0, currency: "INR" },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white">New Order</h1>
            <p className="text-white/40 text-sm mt-1">Place a new social media service order</p>
          </div>
          <NewOrderClient
            services={JSON.parse(JSON.stringify(services))}
            balance={wallet.balance}
            currency={wallet.currency}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
