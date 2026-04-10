"use client";
import { useState } from "react";
import { Loader2, Wallet, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Props { open: boolean; onClose: () => void; }

const QUICK_AMOUNTS = [10, 25, 50, 100, 250, 500];

export function AddFundsModal({ open, onClose }: Props) {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!open) return null;

  async function handleCheckout() {
    if (!amount || Number(amount) < 5) {
      toast({ title: "Minimum deposit is $5", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error);
    } catch (e: any) {
      toast({ title: "Payment error", description: e.message, variant: "destructive" });
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Add Funds</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-white/40 mb-5">Select or enter the amount you want to add to your wallet.</p>

        {/* Quick amounts */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                amount === a
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-amber-500/30 hover:text-white"
              }`}
            >
              ${a}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative mb-6">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 font-medium">$</span>
          <Input
            type="number"
            min={5}
            max={1000}
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
            className="bg-[#0f0f0f] border-white/10 text-white pl-8 h-11 focus:border-amber-500/50"
          />
        </div>

        {amount && Number(amount) >= 5 && (
          <div className="flex justify-between items-center text-sm mb-5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <span className="text-white/50">You will receive</span>
            <span className="text-amber-400 font-bold">${Number(amount).toFixed(2)}</span>
          </div>
        )}

        <Button
          onClick={handleCheckout}
          disabled={loading || !amount || Number(amount) < 5}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ${amount || "0.00"} with Stripe
            </>
          )}
        </Button>

        <p className="text-center text-xs text-white/25 mt-4">
          Secured by Stripe · Your card details are never stored
        </p>
      </div>
    </div>
  );
}
