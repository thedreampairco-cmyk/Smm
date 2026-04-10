"use client";
import { X, Package, Calendar, User, Hash, DollarSign } from "lucide-react";

interface Props { order: any; onClose: () => void; }

const statusConfig: Record<string, { label: string; class: string }> = {
  PENDING:     { label: "Pending",     class: "badge-pending" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  COMPLETED:   { label: "Completed",   class: "badge-completed" },
  PARTIAL:     { label: "Partial",     class: "badge-partial" },
  CANCELLED:   { label: "Cancelled",   class: "badge-cancelled" },
};

export function OrderDetailsModal({ order, onClose }: Props) {
  const sc = statusConfig[order.status] ?? { label: order.status, class: "badge-pending" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Order Details</h2>
              <p className="text-xs text-white/30">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
          <span className="text-sm text-white/50">Status</span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sc.class}`}>{sc.label}</span>
        </div>

        {/* Details grid */}
        <div className="space-y-3">
          {[
            { icon: Package, label: "Service",  value: order.service?.name },
            { icon: Hash,     label: "Category", value: order.service?.category },
            { icon: User,     label: "Target",   value: order.targetUsername },
            { icon: Hash,     label: "Quantity", value: order.quantity?.toLocaleString() + " units" },
            { icon: DollarSign, label: "Total",  value: `$${order.totalPrice?.toFixed(2)}` },
            { icon: Calendar,  label: "Placed",  value: new Date(order.createdAt).toLocaleString() },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-white/40 text-sm min-w-[100px]">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <span className="text-sm text-white font-medium text-right">{value}</span>
            </div>
          ))}
        </div>

        {order.notes && (
          <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-xs text-white/40 mb-1">Notes</p>
            <p className="text-sm text-white/70">{order.notes}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 text-sm font-medium text-white/50 hover:text-white rounded-xl border border-white/[0.07] hover:bg-white/[0.03] transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}
