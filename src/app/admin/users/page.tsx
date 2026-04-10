// src/app/admin/users/page.tsx
import { prisma } from "@/lib/prisma";
export const metadata = { title: "Manage Users" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { wallet: true, _count: { select: { orders: true } } },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Users</h1>
        <p className="text-white/40 text-sm">{users.length} registered users</p>
      </div>

      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] border-b border-white/[0.07]">
              <tr className="text-white/35 text-xs uppercase tracking-wider">
                {["Name", "Email", "Role", "Balance", "Orders", "Joined"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-xs text-white font-medium">{u.name ?? "—"}</td>
                  <td className="py-3 px-4 text-xs text-white/60">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                      u.role === "ADMIN"
                        ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                        : "text-white/40 bg-white/[0.05] border-white/10"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-green-400 font-semibold">
                    ${u.wallet?.balance.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="py-3 px-4 text-xs text-white/50">{u._count.orders}</td>
                  <td className="py-3 px-4 text-xs text-white/30">
                    {new Date(u.createdAt).toLocaleDateString()}
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
