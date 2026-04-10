"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, Zap, ArrowLeft, Settings } from "lucide-react";

const nav = [
  { href: "/admin",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/services", label: "Services",   icon: Package },
  { href: "/admin/orders",   label: "Orders",     icon: ShoppingBag },
  { href: "/admin/users",    label: "Users",      icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 border-r border-white/[0.06] bg-[#0f0f0f] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Zap className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-tight">SMM Panel Pro</p>
          <p className="text-[10px] text-amber-400 font-medium">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-white/40 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to App
        </Link>
      </div>
    </aside>
  );
}
