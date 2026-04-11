"use client";
import { useState } from "react";
import { Wallet, Plus, ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddFundsModal } from "@/components/dashboard/add-funds-modal";

interface Props {
  wallet: { balance: number; currency: string };
  transactions: any[];
}

const typeConfig: Record<string, { icon: typeof ArrowUpCircle; color: string; label: string }> = {
  DEPOSIT:       { icon: ArrowUpCircle,   color: "text-green-400", label: "Deposit" },
  ORDER_PAYMENT: { icon: ArrowDownCircle, color: "text-red-400",   label: "Order" },
  REFUND:        { icon: ArrowUpCircle,   color: "text-blue-400",  label: "Refund" },
};

export function WalletClient({ wallet, transactions }: Props) {
  const [addFundsOpen, setAddFundsOpen] = useState(false);

  const totalDeposited = transactions.filter((t) => t.type === "DEPOSIT").reduce((s, t) => s + t.amount, 0);
  const totalSpent     = transactions.filter((t) => t.type === "ORDER_PAYMENT").reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Wallet</h1>
          <p className="text-white/40 text-sm mt-1">Manage your balance and transactions</p>
        </div>
        <Button onClick={() => setAddFundsOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Funds
        </Button>
      </div>

      {/* Balance card */}
      <div className="rounded-2xl p-6 mb-6 border"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(22,22,22,0.9) 100%)",
          borderColor: "rgba(212,175,55,0.25)",
          boxShadow: "0 0 40px rgba(212,175,55,0.06)",
        }}>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-white/40 uppercase tracking-wider">Available Balance</span>
            </div>
            <p className="text-5xl font-extrabold mb-1"
              style={{ background: "linear-gradient(135deg, #d4af37, #f5e070)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ₹{wallet.balance.toFixed(2)}
            </p>
            <p className="text-xs text-white/30">{wallet.currency} · Indian Rupees</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:text-right">
            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/15">
              <p className="text-xs text-white/40 mb-1">Total Added</p>
              <p className="text-lg font-bold text-green-400">₹{totalDeposited.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
              <p className="text-xs text-white/40 mb-1">Total Spent</p>
              <p className="text-lg font-bold text-red-400">₹{totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick add buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-8">
        {[50, 100, 200, 500, 1000, 2000].map((amt) => (
          <button key={amt} onClick={() => setAddFundsOpen(true)}
            className="py-2.5 rounded-xl border border-white/[0.07] bg-[#111] text-sm font-semibold text-white/60 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all">
            +₹{amt}
          </button>
        ))}
      </div>

      {/* Payment methods info */}
      <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111] mb-8">
        <p className="text-xs text-white/50 font-medium mb-2">💳 Accepted Payment Methods</p>
        <div className="flex flex-wrap gap-2">
          {["UPI", "Paytm", "PhonePe", "Google Pay", "NEFT/IMPS", "Debit Card", "Credit Card"].map((m) => (
            <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]">{m}</span>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-amber-400" />
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-16 border border-white/[0.06] rounded-xl text-white/30">
            No transactions yet. Add funds to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => {
              const cfg = typeConfig[tx.type] ?? typeConfig.DEPOSIT;
              const Icon = cfg.icon;
              return (
                <div key={tx.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#111] hover:bg-[#141414] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                      tx.amount > 0 ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                    }`}>
                      <Icon className={`h-4 w-4 ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{tx.description}</p>
                      <p className="text-xs text-white/30 mt-0.5">
                        {cfg.label} · {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddFundsModal open={addFundsOpen} onClose={() => setAddFundsOpen(false)} />
    </div>
  );
}
