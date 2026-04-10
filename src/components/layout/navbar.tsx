"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Menu, X, Zap, LayoutDashboard, ShoppingBag,
  Wallet, LogOut, User, Settings, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0f0f0f]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 border border-gold/30 group-hover:bg-gold/20 transition-colors">
              <Zap className="h-4 w-4 text-gold-400" style={{ color: "#d4af37" }} />
            </div>
            <span className="text-base font-bold tracking-tight">
              SMM<span className="text-gold-gradient" style={{
                background: "linear-gradient(135deg, #d4af37, #f5e070)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}> Panel</span> Pro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/services" className="text-white/60 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/faq" className="text-white/60 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/api-docs" className="text-white/60 hover:text-white transition-colors">
              API
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <div className="h-7 w-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-semibold text-amber-400">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm">{session.user?.name ?? session.user?.email}</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-[#161616] border-white/10 text-white"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                      <ShoppingBag className="h-4 w-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="h-4 w-4" /> Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-400 focus:text-red-300 cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white/70 hover:text-white">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild className="btn-gold bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0f0f0f] px-4 py-4 space-y-3">
          <Link href="/services" className="block text-white/70 hover:text-white py-2">Services</Link>
          <Link href="/faq" className="block text-white/70 hover:text-white py-2">FAQ</Link>
          <Link href="/api-docs" className="block text-white/70 hover:text-white py-2">API Docs</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block text-white/70 hover:text-white py-2">Dashboard</Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block text-red-400 py-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="border-white/10">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-amber-500 text-black font-semibold">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
