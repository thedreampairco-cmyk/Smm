"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Reset failed");
      setDone(true);
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/[0.08] bg-[#111] p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg">SMM Panel Pro</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Set New Password</h1>
          </div>

          {done ? (
            <div className="text-center py-4">
              <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <p className="text-white font-semibold">Password reset successful!</p>
              <p className="text-white/40 text-sm mt-1">Redirecting to sign in…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">New Password</Label>
                <div className="relative">
                  <Input type={showPw ? "text" : "password"} placeholder="Min 8 characters"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11 pr-11" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Confirm Password</Label>
                <Input type="password" placeholder="Repeat password"
                  value={confirm} onChange={(e) => setConfirm(e.target.value)} required
                  className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11" />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" disabled={loading || !token}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetForm /></Suspense>;
}
