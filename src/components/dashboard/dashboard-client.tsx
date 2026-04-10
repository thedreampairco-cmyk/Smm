"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Wallet as WalletIcon,
  Key, TrendingUp, Plus, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddFundsModal } from "./add-funds-modal";
import { OrderDetailsModal } from "./order-details-modal";

interface Props {
  user: any;
  wallet: any;
  orders: any[];
  transactions: any[];
}

const statusConfig: Record<string, { label: string; class: string }> = {
  PENDING:     { label: "Pending",     class: "badge-pending" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  COMPLETED:   { label: "Completed",   class: "badge-completed" },
  PARTIAL:     { label: "Partial",     class: "badge-partial" },
  CANCELLED:   { label: "Cancelled",   class: "badge-cancelled" },
};

const tabs = [
  { id: "overview",     label: "Overview",      icon: LayoutDashboard },
  { id: "orders",       label: "My Orders",     icon: ShoppingBag },
  { id: "wallet",       label: "Wallet",        icon: WalletIcon },
  { id: "api",          label: "API Keys",      icon: Key },
];

export function DashboardClient({ user, wallet, orders, transactions }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const router = useRouter();

  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user.name ?? user.email?.split("@")[0]}!
          </h1>
          <p className="text-white/40 text-sm mt-1">Manage your orders and account</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setAddFundsOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add Funds
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-white/70 hover:text-white hover:bg-white/5"
            onClick={() => router.push("/services")}
          >
            New Order
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div
        className="rounded-2xl p-6 mb-8 border"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(22,22,22,0.9) 100%)",
          borderColor: "rgba(212,175,55,0.25)",
          boxShadow: "0 0 40px rgba(212,175,55,0.06)",
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Account Balance</p>
            <p
              className="text-4xl font-extrabold"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f5e070)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ${wallet.balance.toFixed(2)}
            </p>
            <p className="text-xs text-white/30 mt-1">{wallet.currency}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-0.5">Total Orders</p>
              <p className="font-bold text-white text-xl">{orders.length}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-0.5">Completed</p>
              <p className="font-bold text-green-400 text-xl">{completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/[0.07] overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              activeTab === t.id
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, color: "text-amber-400" },
              { label: "Pending Orders", value: orders.filter((o) => o.status === "PENDING").length, color: "text-yellow-400" },
              { label: "Success Rate", value: orders.length ? `${Math.round((completedOrders / orders.length) * 100)}%` : "—", color: "text-green-400" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl border border-white/[0.07] bg-[#111]">
                <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent orders preview */}
          <div>
            <h3 className="font-semibold text-white mb-3">Recent Orders</h3>
            {orders.slice(0, 5).length === 0 ? (
              <div className="text-center py-12 text-white/30 border border-white/[0.06] rounded-xl">
                No orders yet.{" "}
                <button onClick={() => router.push("/services")} className="text-amber-400 hover:underline">
                  Place your first order
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#111] hover:bg-[#141414] cursor-pointer transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{order.service.name}</p>
                      <p className="text-xs text-white/30 mt-0.5">
                        {order.targetUsername} · {order.quantity.toLocaleString()} units
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[order.status]?.class}`}>
                        {statusConfig[order.status]?.label}
                      </span>
                      <p className="text-xs text-amber-400 font-semibold">${order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
            <table className="w-full text-sm">
              <thead className="border-b border-white/[0.07]">
                <tr className="text-white/40 text-xs uppercase tracking-wider">
                  {["Service", "Target", "Quantity", "Price", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white text-xs leading-tight">{order.service.name}</div>
                      <div className="text-white/30 text-[11px]">{order.service.category}</div>
                    </td>
                    <td className="py-3.5 px-4 text-white/50 text-xs">{order.targetUsername}</td>
                    <td className="py-3.5 px-4 text-white/60 text-xs">{order.quantity.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-amber-400 font-semibold">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusConfig[order.status]?.class}`}>
                        {statusConfig[order.status]?.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-white/30 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-white/30 hover:text-amber-400 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-white/30">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Wallet Tab */}
      {activeTab === "wallet" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">Transaction History</h3>
            <Button
              size="sm"
              onClick={() => setAddFundsOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Funds
            </Button>
          </div>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-4 rounded-xl border border-white/[0.06] bg-[#111]">
                <div>
                  <p className="text-sm text-white font-medium">{tx.description}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {new Date(tx.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </p>
                </div>
                <span className={`font-bold text-sm ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-12 text-white/30 border border-white/[0.06] rounded-xl">
                No transactions yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <h3 className="font-semibold text-amber-300 mb-2">API Access</h3>
            <p className="text-sm text-white/50 mb-4">
              Use your API key to integrate with our Public API v2. Keep your key secret.
            </p>
            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              Generate API Key
            </Button>
          </div>
          <div className="p-5 rounded-xl border border-white/[0.07] bg-[#111]">
            <p className="text-sm text-white/60 mb-1 font-medium">Base URL</p>
            <code className="text-xs text-amber-300 bg-black/40 px-3 py-1.5 rounded-md block">
              {process.env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.com"}/api/v2
            </code>
          </div>
          <Button asChild variant="outline" className="border-white/10 text-white/60">
            <a href="/api-docs">View API Documentation →</a>
          </Button>
        </div>
      )}

      <AddFundsModal open={addFundsOpen} onClose={() => setAddFundsOpen(false)} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
