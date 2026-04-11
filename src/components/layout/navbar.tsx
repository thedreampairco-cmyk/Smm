"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, Zap, LayoutDashboard, ShoppingBag, Wallet, LogOut, ChevronDown, PlusCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/services",       label: "Services" },
  { href: "/new-order",      label: "New Order",  auth: true },
  { href: "/faq",            label: "FAQ" },
  { href: "/api-docs",       label: "API" },
];

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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 group-hover:bg-amber-500/20 transition-colors">
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-base font-bold tracking-tight">
              SMM<span style={{ background: "linear-gradient(135deg, #d4af37, #f5e070)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Panel</span> Pro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((l) => (!l.auth || session) && (
              <Link key={l.href} href={l.href}
                className="px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all">
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link href="/admin" className="px-3 py-2 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold h-8 text-xs">
                  <Link href="/new-order"><PlusCircle className="h-3.5 w-3.5 mr-1" /> New Order</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 h-9">
                      <div className="h-6 w-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">
                        {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <span className="text-sm max-w-[100px] truncate">{session.user?.name ?? session.user?.email}</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-[#161616] border-white/10 text-white">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/new-order" className="flex items-center gap-2 cursor-pointer"><PlusCircle className="h-4 w-4" /> New Order</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tickets" className="flex items-center gap-2 cursor-pointer"><MessageCircle className="h-4 w-4" /> Support</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wallet" className="flex items-center gap-2 cursor-pointer"><Wallet className="h-4 w-4" /> Wallet</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-400 focus:text-red-300 cursor-pointer flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white/70 hover:text-white h-9">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild className="bg-amber-500 hover:bg-amber-400 text-black font-semibold h-9">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white/70 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0f0f0f] px-4 py-4 space-y-1">
          {navLinks.map((l) => (!l.auth || session) && (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="block text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5">
              {l.label}
            </Link>
          ))}
          {session && (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5">Dashboard</Link>
              <Link href="/tickets" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5">Support</Link>
              {isAdmin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="block text-amber-400 py-2.5 px-3 rounded-lg hover:bg-amber-500/10">Admin Panel</Link>}
              <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full text-left text-red-400 py-2.5 px-3 rounded-lg hover:bg-red-500/10">Sign Out</button>
            </>
          )}
          {!session && (
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="border-white/10"><Link href="/signin">Sign In</Link></Button>
              <Button asChild className="bg-amber-500 text-black font-semibold"><Link href="/signup">Get Started Free</Link></Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
