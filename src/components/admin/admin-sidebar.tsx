"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, Zap, ArrowLeft, MessageCircle, RefreshCw, BarChart3 } from "lucide-react";

const nav = [
  { href: "/admin",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/services", label: "Services",   icon: Package },
  { href: "/admin/orders",   label: "Orders",     icon: ShoppingBag },
  { href: "/admin/users",    label: "Users",      icon: Users },
  { href: "/admin/tickets",  label: "Tickets",    icon: MessageCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 flex-shrink-0 border-r border-white/[0.06] bg-[#0f0f0f] flex flex-col min-h-screen">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Zap className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-tight">SMM Panel Pro</p>
          <p className="text-[10px] text-amber-400 font-medium">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <Link href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Panel
        </Link>
      </div>
    </aside>
  );
}
