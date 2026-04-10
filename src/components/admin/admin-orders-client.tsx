"use client";
import { useState } from "react";

const STATUS_OPTIONS = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED", "PARTIAL", "CANCELLED"];
const statusConfig: Record<string, string> = {
  PENDING: "badge-pending", IN_PROGRESS: "badge-in-progress",
  COMPLETED: "badge-completed", PARTIAL: "badge-partial", CANCELLED: "badge-cancelled",
};

export function AdminOrdersClient({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Orders</h1>
          <p className="text-white/40 text-sm">{filtered.length} orders shown</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filter === s
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                  : "border-white/[0.08] text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {s === "ALL" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] border-b border-white/[0.07]">
              <tr className="text-white/35 text-xs uppercase tracking-wider">
                {["ID", "User", "Service", "Target", "Qty", "Price", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-xs text-white/30 font-mono">#{o.id.slice(-6)}</td>
                  <td className="py-3 px-4 text-xs text-white/60">{o.user.name ?? o.user.email}</td>
                  <td className="py-3 px-4 text-xs text-white max-w-[160px] truncate">{o.service.name}</td>
                  <td className="py-3 px-4 text-xs text-white/50">{o.targetUsername}</td>
                  <td className="py-3 px-4 text-xs text-white/50">{o.quantity.toLocaleString()}</td>
                  <td className="py-3 px-4 text-xs text-amber-400 font-semibold">${o.totalPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusConfig[o.status]}`}>
                      {o.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-white/30">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-16 text-center text-white/30">No orders.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
