"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string; name: string; category: string;
  rate: number; minQuantity: number; maxQuantity: number;
}

interface Props { service: Service; onClose: () => void; }

export function OrderPlacementModal({ service, onClose }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState("");
  const [quantity, setQuantity] = useState(service.minQuantity);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const totalPrice = ((service.rate / 1000) * quantity).toFixed(2);
  const isValidQty = quantity >= service.minQuantity && quantity <= service.maxQuantity;

  async function handleOrder() {
    if (!target.trim()) {
      toast({ title: "Target required", description: "Enter a username or URL.", variant: "destructive" });
      return;
    }
    if (!isValidQty) {
      toast({ title: "Invalid quantity", description: `Must be ${service.minQuantity}–${service.maxQuantity}.`, variant: "destructive" });
      return;
    }
    setLoading(true);
    setInsufficientBalance(false);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId: service.id, quantity, targetUsername: target }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 402) {
      setInsufficientBalance(true);
      return;
    }
    if (!res.ok) {
      toast({ title: "Order failed", description: data.error ?? "Something went wrong.", variant: "destructive" });
      return;
    }

    setSuccess(true);
    setTimeout(() => { onClose(); router.push("/dashboard"); }, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl">

        {success ? (
          <div className="text-center py-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30 mb-4">
              <CheckCircle2 className="h-7 w-7 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Order Placed!</h2>
            <p className="text-white/40 text-sm">Redirecting to dashboard…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-white">Place Order</h2>
                <p className="text-xs text-white/30 mt-0.5">{service.category}</p>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            {/* Service info */}
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-5">
              <p className="text-xs text-white/40 mb-0.5">Service</p>
              <p className="text-sm font-semibold text-white leading-snug">{service.name}</p>
              <p className="text-xs text-amber-400 mt-1">${service.rate.toFixed(2)} per 1,000</p>
            </div>

            {/* Insufficient balance warning */}
            {insufficientBalance && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 mb-4">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-300">Insufficient Balance</p>
                  <p className="text-xs text-red-400/70 mt-0.5">
                    You need ${totalPrice} to place this order.{" "}
                    <button onClick={() => { onClose(); }} className="underline hover:text-red-300">Add funds</button>
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Username / URL</Label>
                <Input
                  placeholder="@username or https://..."
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/40 h-11"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="text-white/60 text-sm">Quantity</Label>
                  <span className="text-xs text-white/30">
                    {service.minQuantity.toLocaleString()} – {service.maxQuantity.toLocaleString()}
                  </span>
                </div>
                <Input
                  type="number"
                  min={service.minQuantity}
                  max={service.maxQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={`bg-[#0f0f0f] border-white/10 text-white h-11 focus:border-amber-500/40 ${
                    !isValidQty && quantity > 0 ? "border-red-500/50" : ""
                  }`}
                />
                {!isValidQty && quantity > 0 && (
                  <p className="text-xs text-red-400 mt-1">
                    Must be between {service.minQuantity.toLocaleString()} and {service.maxQuantity.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Price calculation */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/50">Estimated Total</span>
                  <span
                    className="text-2xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #f5e070)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ${isValidQty ? totalPrice : "—"}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleOrder}
                disabled={loading || !isValidQty || !target.trim()}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Confirm Order — ${totalPrice}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
