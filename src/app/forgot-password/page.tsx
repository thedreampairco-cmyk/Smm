"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="w-full max-w-md relative">
        <div className="rounded-2xl border border-white/[0.08] bg-[#111] p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg">SMM Panel Pro</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-white/40 text-sm mt-1">Enter your email to receive a reset link</p>
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <CheckCircle2 className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Check your email</h3>
              <p className="text-white/40 text-sm mb-6">
                If an account exists for <span className="text-white">{email}</span>, we've sent a password reset link.
              </p>
              <Link href="/signin" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
                ← Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Email Address</Label>
                <Input
                  type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <Link href="/signin" className="flex items-center justify-center gap-1.5 text-sm text-white/40 hover:text-white mt-2">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
