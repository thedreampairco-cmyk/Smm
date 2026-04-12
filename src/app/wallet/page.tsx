export const dynamic = "force-dynamic";
// src/app/wallet/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WalletClient } from "./wallet-client";

export const metadata = { title: "Wallet" };

export default async function WalletPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin?callbackUrl=/wallet");

  const [wallet, transactions] = await Promise.all([
    prisma.wallet.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id, balance: 0, currency: "INR" },
    }),
    prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <WalletClient
            wallet={JSON.parse(JSON.stringify(wallet))}
            transactions={JSON.parse(JSON.stringify(transactions))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
