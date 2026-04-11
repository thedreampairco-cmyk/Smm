"use client";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setDone(true);
      else setError("Failed to subscribe. Try again.");
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  }

  if (done) return (
    <div className="flex items-center justify-center gap-2 text-green-400">
      <CheckCircle2 className="h-5 w-5" />
      <span className="font-medium">You're subscribed!</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email" placeholder="Enter your email"
        value={email} onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-[#111] border-white/10 text-white placeholder:text-white/30 focus:border-amber-500/50 h-11 flex-1"
      />
      <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-11 px-6">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </Button>
      {error && <p className="text-xs text-red-400 mt-1 absolute">{error}</p>}
    </form>
  );
}
