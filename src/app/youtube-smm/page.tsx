export const dynamic = "force-dynamic";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "YouTube SMM Panel — Buy YouTube Views, Subscribers & Likes",
  description: "Best YouTube SMM Panel. Buy real YouTube views, subscribers, likes, watch time & comments. Safe for monetized channels. Instant delivery.",
};

const services = [
  { name: "YouTube Views (High Retention)", rate: "₹9",   min: "500",   desc: "Safe for monetized channels. High watch-time." },
  { name: "YouTube Subscribers",            rate: "₹55",  min: "100",   desc: "Real-looking subscribers. Boosts channel credibility." },
  { name: "YouTube Likes",                  rate: "₹12",  min: "50",    desc: "Fast delivery likes from real-looking accounts." },
  { name: "YouTube Comments (Custom)",      rate: "₹150", min: "5",     desc: "Custom comments written per your instructions." },
  { name: "YouTube Watch Time (Hours)",     rate: "₹180", min: "100",   desc: "Real watch-time hours. Helps monetization eligibility." },
  { name: "YouTube Shares",                 rate: "₹25",  min: "50",    desc: "Increase your video shares across platforms." },
];

export default function YouTubeSMMPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-20 border-b border-white/[0.06]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,0,0,0.06) 0%, transparent 60%)" }} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-full px-4 py-1.5 mb-5">
              ▶️ YouTube SMM Panel
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              YouTube SMM Panel India<br />
              <span style={{ background: "linear-gradient(135deg, #FF0000, #cc0000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Views, Subscribers & Watch Time
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
              Grow your YouTube channel with high-retention views, real subscribers, and monetization-safe watch time.
              Fast delivery, affordable prices, 365-day guarantee.
            </p>
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 h-12">
              <Link href="/signup">Grow Your YouTube Channel</Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">YouTube Services</h2>
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
                <Link href="/new-order">Place Order Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
