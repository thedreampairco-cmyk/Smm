"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function getStrength(pw: string) {
  const checks = [
    pw.length >= 8,
    /[A-Z]/.test(pw),
    /[a-z]/.test(pw),
    /\d/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ];
  return checks.filter(Boolean).length;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const strength = getStrength(form.password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (strength < 3) {
      toast({ title: "Weak password", description: "Please choose a stronger password.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      toast({ title: "Registration failed", description: data.error ?? "Something went wrong.", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/dashboard");
  }

  const requirements = [
    { label: "At least 8 characters", met: form.password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(form.password) },
    { label: "Number", met: /\d/.test(form.password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(form.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-16">
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="w-full max-w-md relative">
        <div className="rounded-2xl border border-white/[0.08] bg-[#111] p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg">SMM Panel Pro</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-white/40 text-sm mt-1">Start growing your social media today</p>
          </div>

          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            variant="outline"
            className="w-full border-white/10 hover:bg-white/5 text-white/80 mb-5 h-11"
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-xs text-white/25">or sign up with email</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white/60 text-sm mb-1.5 block">Full Name</Label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11"
              />
            </div>

            <div>
              <Label className="text-white/60 text-sm mb-1.5 block">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11"
              />
            </div>

            <div>
              <Label className="text-white/60 text-sm mb-1.5 block">Password</Label>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : "#262626" }}
                      />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}

              {/* Requirements */}
              {form.password && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {requirements.map((r) => (
                    <div key={r.label} className={`flex items-center gap-1 text-[11px] ${r.met ? "text-green-400" : "text-white/30"}`}>
                      {r.met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-amber-400 hover:text-amber-300 font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-white/25 mt-4">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-white/50">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
