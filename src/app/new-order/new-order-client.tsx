"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Wallet, AlertTriangle, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string; name: string; category: string; description: string;
  rate: number; minQuantity: number; maxQuantity: number;
}

interface Props {
  services: Service[];
  balance: number;
  currency: string;
}

const CURRENCY = "₹";

export function NewOrderClient({ services, balance, currency }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<any>(null);

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category))).sort()];
  const filtered = categoryFilter === "All" ? services : services.filter((s) => s.category === categoryFilter);
  const selected = services.find((s) => s.id === selectedId);

  const qty = parseInt(quantity) || 0;
  const price = selected ? parseFloat(((selected.rate / 1000) * qty).toFixed(2)) : 0;
  const qtyError = selected && qty > 0
    ? qty < selected.minQuantity ? `Minimum: ${selected.minQuantity.toLocaleString()}`
      : qty > selected.maxQuantity ? `Maximum: ${selected.maxQuantity.toLocaleString()}`
      : null
    : null;
  const insufficient = price > 0 && balance < price;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || qtyError || !target.trim() || insufficient) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selected.id, quantity: qty, targetUsername: target.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");
      setDone(data.order);
      toast({ title: "✅ Order placed!", description: `${selected.name} order is now pending.` });
    } catch (err: any) {
      toast({ title: "Order failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  if (done) return (
    <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 mb-5">
        <CheckCircle2 className="h-8 w-8 text-green-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Order Placed!</h2>
      <p className="text-white/50 mb-2">Order ID: <span className="text-white font-mono text-sm">#{done.id.slice(-12).toUpperCase()}</span></p>
      <p className="text-white/40 text-sm mb-6">Your order is processing. You'll see updates in your dashboard.</p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => { setDone(null); setSelectedId(""); setQuantity(""); setTarget(""); }}
          variant="outline" className="border-white/10 text-white/60 hover:text-white">
          New Order
        </Button>
        <Button onClick={() => router.push("/dashboard")}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
          View Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Balance bar */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-amber-400" />
          <span className="text-sm text-white/60">Wallet Balance</span>
        </div>
        <span className="font-bold text-amber-400">{CURRENCY}{balance.toFixed(2)}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category filter */}
        <div>
          <Label className="text-white/60 text-sm mb-1.5 block">Filter by Platform</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} type="button"
                onClick={() => { setCategoryFilter(c); setSelectedId(""); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  categoryFilter === c
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Service select */}
        <div>
          <Label className="text-white/60 text-sm mb-1.5 block">
            Select Service <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                const svc = services.find((s) => s.id === e.target.value);
                if (svc) setQuantity(svc.minQuantity.toString());
              }}
              required
              className="w-full appearance-none bg-[#111] border border-white/10 text-white rounded-xl px-4 pr-10 py-3 text-sm focus:border-amber-500/50 focus:outline-none"
            >
              <option value="">— Choose a service —</option>
              {filtered.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {CURRENCY}{s.rate}/1K
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Service info card */}
        {selected && (
          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111] text-sm space-y-1.5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{selected.category}</p>
            <p className="text-white/60 leading-relaxed text-xs">{selected.description}</p>
            <div className="flex gap-6 mt-2 pt-2 border-t border-white/[0.06]">
              <div><span className="text-white/30 text-xs">Rate</span><p className="text-amber-400 font-bold">{CURRENCY}{selected.rate}/1K</p></div>
              <div><span className="text-white/30 text-xs">Min</span><p className="text-white font-semibold">{selected.minQuantity.toLocaleString()}</p></div>
              <div><span className="text-white/30 text-xs">Max</span><p className="text-white font-semibold">{selected.maxQuantity.toLocaleString()}</p></div>
            </div>
          </div>
        )}

        {/* Target */}
        <div>
          <Label className="text-white/60 text-sm mb-1.5 block">
            Target Link / Username <span className="text-red-400">*</span>
          </Label>
          <Input
            placeholder="https://instagram.com/username  or  @username"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            className="bg-[#111] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11"
          />
        </div>

        {/* Quantity */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label className="text-white/60 text-sm">
              Quantity <span className="text-red-400">*</span>
            </Label>
            {selected && (
              <span className="text-xs text-white/30">
                {selected.minQuantity.toLocaleString()} – {selected.maxQuantity.toLocaleString()}
              </span>
            )}
          </div>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={selected?.minQuantity}
            max={selected?.maxQuantity}
            required
            className={`bg-[#111] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11 ${qtyError ? "border-red-500/50" : ""}`}
          />
          {qtyError && <p className="text-xs text-red-400 mt-1">{qtyError}</p>}
        </div>

        {/* Price summary */}
        {selected && qty > 0 && !qtyError && (
          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#0f0f0f]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/40">Rate</span>
              <span className="text-white">{CURRENCY}{selected.rate.toFixed(2)} / 1,000</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/40">Quantity</span>
              <span className="text-white">{qty.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/[0.07] pt-3 flex justify-between font-bold text-lg">
              <span className="text-white">Total</span>
              <span style={{ color: "#d4af37" }}>{CURRENCY}{price.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Warnings */}
        {insufficient && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>Insufficient balance. Need {CURRENCY}{(price - balance).toFixed(2)} more.{" "}
              <a href="/dashboard" className="underline text-red-200">Add funds →</a>
            </span>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || !selectedId || !target.trim() || !!qtyError || qty <= 0 || insufficient}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-12 text-base"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
            <><ShoppingCart className="h-5 w-5 mr-2" /> Place Order — {CURRENCY}{price.toFixed(2)}</>
          )}
        </Button>
      </form>
    </div>
  );
}
