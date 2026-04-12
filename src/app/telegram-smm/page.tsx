import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Telegram SMM Panel — Buy Telegram Members, Views & Reactions",
  description: "Best Telegram SMM Panel India. Buy Telegram channel members, post views, reactions & comments. Instant delivery, non-drop.",
};

const services = [
  { name: "Telegram Channel Members",   rate: "₹12",  min: "100",  desc: "Real-looking members for channels & groups." },
  { name: "Telegram Post Views",        rate: "₹0.5", min: "1000", desc: "Instant post views delivered in minutes." },
  { name: "Telegram Reactions",         rate: "₹8",   min: "50",   desc: "👍❤️🔥 reactions on any post." },
  { name: "Telegram Group Members",     rate: "₹15",  min: "100",  desc: "Active-looking group members." },
  { name: "Telegram Poll Votes",        rate: "₹20",  min: "50",   desc: "Votes for any Telegram poll option." },
  { name: "Telegram Forwards",          rate: "₹10",  min: "100",  desc: "Forward your posts to increase reach." },
];

export default function TelegramSMMPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-20 border-b border-white/[0.06]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,136,204,0.06) 0%, transparent 60%)" }} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full px-4 py-1.5 mb-5">
              ✈️ Telegram SMM Panel
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Telegram SMM Panel India<br />
              <span style={{ background: "linear-gradient(135deg, #0088cc, #0099dd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Members, Views & Reactions
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
              Grow your Telegram channel or group with real-looking members and engagement.
              Perfect for crypto channels, prediction groups, business communities.
            </p>
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 h-12">
              <Link href="/signup">Grow Your Telegram Now</Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Telegram Services</h2>
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
