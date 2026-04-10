"use client";
import { useState } from "react";
import { X, Info, ShoppingCart } from "lucide-react";
import { OrderPlacementModal } from "./order-placement-modal";

interface Service {
  id: string; name: string; category: string; description: string;
  rate: number; minQuantity: number; maxQuantity: number;
}

interface Props {
  service: Service;
  startTab?: "order" | "detail";
  onClose: () => void;
}

export function OrderModal({ service, startTab = "order", onClose }: Props) {
  const [tab, setTab] = useState<"order" | "detail">(startTab);

  if (tab === "order") {
    return <OrderPlacementModal service={service} onClose={onClose} />;
  }

  // Detail view
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-xs text-white/35 font-medium">{service.category}</span>
            <h2 className="text-lg font-bold text-white mt-0.5">{service.name}</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 border-b border-white/[0.07]">
          {[{ id: "detail", label: "Details", icon: Info }, { id: "order", label: "Order Now", icon: ShoppingCart }].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                tab === t.id
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {/* Detail content */}
        <div className="space-y-4">
          <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Rate per 1K", value: `$${service.rate.toFixed(2)}`, highlight: true },
              { label: "Category", value: service.category, highlight: false },
              { label: "Min Quantity", value: service.minQuantity.toLocaleString(), highlight: false },
              { label: "Max Quantity", value: service.maxQuantity.toLocaleString(), highlight: false },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <p className="text-xs text-white/35 mb-1">{label}</p>
                <p className={`font-bold text-sm ${highlight ? "text-amber-400" : "text-white"}`}>{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setTab("order")}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors"
          >
            Order This Service
          </button>
        </div>
      </div>
    </div>
  );
}
