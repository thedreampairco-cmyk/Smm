export const dynamic = "force-dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Zap, Users, TrendingUp } from "lucide-react";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 border-b border-white/[0.06]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              India's Most Reliable{" "}
              <span style={{ background: "linear-gradient(135deg, #d4af37, #f5e070)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                SMM Panel
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              SMM Panel Pro is the most trusted platform for high-quality, non-drop social media services.
              We serve creators, businesses, and resellers across India with affordable, fast, and reliable growth solutions.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap,        title: "Speed",      desc: "Orders begin processing in 5–15 minutes with our ultra-fast delivery infrastructure." },
                { icon: Shield,     title: "Safety",     desc: "Drip-feed technology ensures organic-looking growth. No account bans, ever." },
                { icon: Users,      title: "Trusted",    desc: "Over 10,000 active customers and 3 lakh+ orders completed successfully." },
                { icon: TrendingUp, title: "Results",    desc: "365-day refill guarantee on all major services. Non-drop, high-retention." },
              ].map((v) => (
                <div key={v.title} className="p-6 rounded-2xl border border-white/[0.07] bg-[#111] text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                    <v.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-[#0a0a0a] border-t border-white/[0.06]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-5">Our Story</h2>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>
                SMM Panel Pro was built with a simple goal: to give Indian creators and businesses access to
                affordable, high-quality social media growth services without the complexity, hidden fees, or
                unreliable delivery that plagues most panels.
              </p>
              <p>
                We integrate with the most reliable service providers globally and pass those savings on to you.
                Whether you're an Instagram influencer, a YouTube creator, a Telegram channel owner, or a
                digital marketing agency — our platform is built to scale with your needs.
              </p>
              <p>
                Our team is committed to transparency, fast support, and continuous improvement. We listen to
                our users and regularly add new services and features based on your feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: "10K+",  label: "Active Customers" },
                { value: "5K+",   label: "Services Available" },
                { value: "3L+",   label: "Orders Completed" },
                { value: "365",   label: "Day Refill Guarantee" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold mb-1"
                    style={{ background: "linear-gradient(135deg, #d4af37, #f5e070)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.value}
                  </p>
                  <p className="text-sm text-white/40">{s.label}</p>
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
