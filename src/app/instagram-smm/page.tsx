export const dynamic = "force-dynamic";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Shield, RefreshCw, Star } from "lucide-react";

export const metadata = {
  title: "Instagram SMM Panel — Buy Instagram Followers, Likes & Views",
  description: "Best Instagram SMM Panel in India. Buy real Instagram followers, likes, views, reels views & comments. Cheapest rates, instant delivery, 365-day guarantee.",
};

const services = [
  { name: "Instagram Followers (Real)",    rate: "₹18",  min: "100",   desc: "High-retention real followers. Gradual delivery for safety." },
  { name: "Instagram Likes (Fast)",        rate: "₹4",   min: "50",    desc: "Instant likes from real-looking accounts." },
  { name: "Instagram Views (Reels)",       rate: "₹1",   min: "500",   desc: "Boost your Reels reach and discoverability." },
  { name: "Instagram Story Views",         rate: "₹2",   min: "100",   desc: "Increase your story views instantly." },
  { name: "Instagram Comments",            rate: "₹80",  min: "10",    desc: "Real custom or random comments on posts." },
  { name: "Instagram Impressions",         rate: "₹1.5", min: "1000",  desc: "Improve your post impressions and reach." },
];

const features = [
  { icon: Zap,         text: "Orders start in 5–15 minutes" },
  { icon: Shield,      text: "100% safe — no password required" },
  { icon: RefreshCw,   text: "365-day drop protection & refills" },
  { icon: Star,        text: "High-retention, non-drop quality" },
];

export default function InstagramSMMPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 border-b border-white/[0.06]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(225,48,108,0.07) 0%, transparent 60%)" }} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold rounded-full px-4 py-1.5 mb-5">
              📸 Instagram SMM Panel
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Best Instagram SMM Panel India<br />
              <span style={{ background: "linear-gradient(135deg, #E1306C, #fd1d1d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Followers, Likes & Views
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
              Grow your Instagram account fast with high-retention services. Cheapest rates in India,
              instant start, and 365-day refill guarantee.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2 text-sm text-white/60">
                  <f.icon className="h-3.5 w-3.5 text-amber-400" /> {f.text}
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 h-12">
              <Link href="/signup">Start Growing Instagram Now</Link>
            </Button>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Instagram Services</h2>
            <div className="rounded-xl border border-white/[0.07] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#0a0a0a] border-b border-white/[0.07]">
                  <tr>
                    {["Service", "Rate per 1K", "Min Order", "Details"].map((h) => (
                      <th key={h} className="text-left py-3.5 px-5 text-xs text-white/40 uppercase tracking-wider font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.name} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-4 px-5 font-medium text-white">{s.name}</td>
                      <td className="py-4 px-5 text-amber-400 font-bold">{s.rate}</td>
                      <td className="py-4 px-5 text-white/50">{s.min}</td>
                      <td className="py-4 px-5 text-white/40 text-xs">{s.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <Button asChild className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
                <Link href="/signup">Sign Up & Order Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0a0a0a] border-t border-white/[0.06]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Instagram SMM FAQ</h2>
            <div className="space-y-5">
              {[
                { q: "Is it safe to buy Instagram followers?", a: "Yes, when using our drip-feed system which delivers followers gradually over time, mimicking organic growth. We never ask for your password." },
                { q: "How fast will I see results?", a: "Orders typically start within 5–15 minutes of placement. Full delivery time depends on quantity ordered." },
                { q: "Will followers drop?", a: "We offer a 365-day refill guarantee. If your numbers drop within a year, we refill them for free from your dashboard." },
                { q: "What do I need to provide?", a: "Just your Instagram username or post/reel URL. We never need your password or login credentials." },
              ].map((faq) => (
                <div key={faq.q} className="p-5 rounded-xl border border-white/[0.07] bg-[#111]">
                  <p className="font-semibold text-white mb-2">{faq.q}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
