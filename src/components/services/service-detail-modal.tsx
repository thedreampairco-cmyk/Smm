"use client";
import { X, Info, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string; name: string; category: string; description: string;
  rate: number; minQuantity: number; maxQuantity: number; popularity: number;
}
interface Props { service: Service; onClose: () => void; onOrder: () => void; }

export function ServiceDetailModal({ service, onClose, onOrder }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">{service.name}</h2>
              <span className="text-[11px] text-white/30">{service.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-white/60 leading-relaxed mb-5">{service.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Rate / 1K",    value: `$${service.rate.toFixed(2)}` },
            { label: "Popularity",   value: `${service.popularity}%` },
            { label: "Min Quantity", value: service.minQuantity.toLocaleString() },
            { label: "Max Quantity", value: service.maxQuantity.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-xs text-white/35 mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={onOrder}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Order This Service
        </Button>
      </div>
    </div>
  );
}
