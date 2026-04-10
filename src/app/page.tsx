import Link from "next/link";
import { ArrowRight, Zap, Shield, Clock, TrendingUp, Star, Users, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const platforms = [
  { name: "Instagram", color: "#E1306C", services: 24 },
  { name: "TikTok", color: "#69C9D0", services: 18 },
  { name: "YouTube", color: "#FF0000", services: 15 },
  { name: "Twitter/X", color: "#1DA1F2", services: 12 },
  { name: "Facebook", color: "#1877F2", services: 10 },
  { name: "Spotify", color: "#1DB954", services: 8 },
];

const benefits = [
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Orders start processing within minutes. No waiting, no delays—your growth begins immediately.",
  },
  {
    icon: Shield,
    title: "100% Safe & Secure",
    desc: "All services comply with platform guidelines. Your account safety is our top priority.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock customer support to resolve any issue quickly and professionally.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    desc: "Over 500K orders completed. Trusted by influencers, brands, and agencies globally.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Only real, high-quality accounts. No bots. Engagement that actually makes a difference.",
  },
];

const featured = [
  { name: "Instagram Followers", platform: "Instagram", rate: 1.99, popular: true },
  { name: "TikTok Followers", platform: "TikTok", rate: 2.49, popular: true },
  { name: "YouTube Subscribers", platform: "YouTube", rate: 5.99, popular: false },
  { name: "Instagram Likes", platform: "Instagram", rate: 0.49, popular: false },
  { name: "TikTok Video Views", platform: "TikTok", rate: 0.05, popular: true },
  { name: "Spotify Streams", platform: "Spotify", rate: 0.29, popular: false },
];

const stats = [
  { value: "500K+", label: "Orders Completed" },
  { value: "50K+", label: "Active Customers" },
  { value: "99.8%", label: "Satisfaction Rate" },
  { value: "2 min", label: "Avg. Start Time" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-400 font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            #1 Rated SMM Panel — 500K+ Orders Delivered
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 animate-fade-in">
            Grow Your Social Media{" "}
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #f5e070 50%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Presence Fast
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/50 mb-10 leading-relaxed animate-fade-in">
            Premium followers, likes, views & engagement services for every major platform.
            Instant delivery, real results, unbeatable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-8 h-12 shadow-lg shadow-amber-500/20"
            >
              <Link href="/signup">
                Start Growing Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 h-12 px-8"
            >
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #f5e070)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="border-y border-white/[0.06] bg-[#0a0a0a] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-white/30 uppercase tracking-widest mb-8">
            Services available for all major platforms
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer"
              >
                <div
                  className="text-2xl font-extrabold group-hover:scale-110 transition-transform"
                  style={{ color: p.color }}
                >
                  {p.name[0]}
                </div>
                <span className="text-xs text-white/50">{p.name}</span>
                <span className="text-[10px] text-white/30">{p.services} services</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose SMM Panel Pro?</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Everything you need to dominate social media, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl border border-white/[0.07] bg-[#111] hover:border-amber-500/30 hover:bg-[#141414] transition-all group"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4 group-hover:bg-amber-500/15 transition-colors">
                  <b.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Services</h2>
              <p className="text-white/40">Our most popular services, loved by thousands.</p>
            </div>
            <Button asChild variant="outline" className="border-white/10 text-white/60 hover:text-white">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((s) => (
              <div
                key={s.name}
                className="relative p-5 rounded-xl border border-white/[0.07] bg-[#111] hover:border-amber-500/25 transition-all group"
              >
                {s.popular && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full px-2.5 py-0.5">
                    Popular
                  </span>
                )}
                <div className="text-xs font-medium text-white/30 mb-1.5">{s.platform}</div>
                <div className="font-semibold text-white mb-3 group-hover:text-amber-100 transition-colors">
                  {s.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold" style={{ color: "#d4af37" }}>
                    ${s.rate}
                  </span>
                  <span className="text-xs text-white/30">per 1K</span>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 w-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 font-medium"
                >
                  <Link href="/services">Order Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-6"
            style={{ boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
          >
            <Users className="h-6 w-6 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Audience?
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Join over 50,000 customers who trust SMM Panel Pro to grow their social media presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 h-12 shadow-lg shadow-amber-500/20"
            >
              <Link href="/signup">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-white/30">
            {["No credit card required", "Instant account creation", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500/60" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
