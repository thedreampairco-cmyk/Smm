// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { TrendingUp, ShoppingBag, Users, Clock, DollarSign } from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalOrders, totalUsers, pendingOrders, monthlyRevenue, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "DEPOSIT", createdAt: { gte: startOfMonth } },
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true, name: true } },
        service: { select: { name: true } },
      },
    }),
  ]);

  const stats = [
    { label: "Total Orders",    value: totalOrders.toLocaleString(),                       icon: ShoppingBag, color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Active Users",    value: totalUsers.toLocaleString(),                        icon: Users,       color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
    { label: "Pending Orders",  value: pendingOrders.toLocaleString(),                     icon: Clock,       color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
    { label: "Monthly Revenue", value: `$${(monthlyRevenue._sum.amount ?? 0).toFixed(2)}`, icon: DollarSign,  color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  const statusConfig: Record<string, string> = {
    PENDING: "badge-pending", IN_PROGRESS: "badge-in-progress",
    COMPLETED: "badge-completed", PARTIAL: "badge-partial", CANCELLED: "badge-cancelled",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your SMM Panel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-white/[0.07] bg-[#111]">
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border mb-3 ${s.bg}`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.02]">
          <h2 className="font-semibold text-white text-sm">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/[0.05]">
              <tr className="text-white/35 text-xs uppercase tracking-wider">
                {["User", "Service", "Quantity", "Price", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-xs text-white/60">{o.user.name ?? o.user.email}</td>
                  <td className="py-3 px-4 text-xs text-white">{o.service.name}</td>
                  <td className="py-3 px-4 text-xs text-white/50">{o.quantity.toLocaleString()}</td>
                  <td className="py-3 px-4 text-xs text-amber-400 font-semibold">${o.totalPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusConfig[o.status]}`}>
                      {o.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-white/30">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
