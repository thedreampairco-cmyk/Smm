export const dynamic = "force-dynamic";
"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Phone, Clock, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setDone(true);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-3">Contact Us</h1>
            <p className="text-white/40 max-w-xl mx-auto">
              Have a question or need help? Our support team is available 24/7 to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="space-y-5">
              {[
                { icon: MessageCircle, label: "WhatsApp Support", value: "Chat instantly on WhatsApp", link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918901926799"}`, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
                { icon: Mail,          label: "Email Support",    value: "support@smmpanelpro.com",    link: "mailto:support@smmpanelpro.com", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                { icon: Clock,         label: "Support Hours",    value: "24/7 — We never sleep",      link: null, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              ].map((c) => (
                <div key={c.label} className="p-5 rounded-2xl border border-white/[0.07] bg-[#111] flex gap-4">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl border flex items-center justify-center ${c.bg}`}>
                    <c.icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 mb-0.5">{c.label}</p>
                    {c.link ? (
                      <a href={c.link} target="_blank" rel="noreferrer" className={`text-sm font-medium ${c.color} hover:underline`}>{c.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-white">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                <p className="text-sm text-amber-300 font-semibold mb-1.5">⚡ Fastest Response</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  For urgent issues, WhatsApp is the fastest way to reach us. Average response time: under 15 minutes.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#111] p-6">
              {done ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <CheckCircle2 className="h-14 w-14 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold text-white mb-4">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/60 text-sm mb-1.5 block">Your Name</Label>
                      <Input placeholder="John Doe" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required
                        className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11" />
                    </div>
                    <div>
                      <Label className="text-white/60 text-sm mb-1.5 block">Email</Label>
                      <Input type="email" placeholder="you@example.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required
                        className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/60 text-sm mb-1.5 block">Subject</Label>
                    <Input placeholder="How can we help?" value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                      className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11" />
                  </div>
                  <div>
                    <Label className="text-white/60 text-sm mb-1.5 block">Message</Label>
                    <textarea placeholder="Describe your issue or question in detail..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required rows={5}
                      className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm resize-none" />
                  </div>
                  <Button type="submit" disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
