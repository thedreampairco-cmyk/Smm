export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Clock, TrendingUp, Star, Users, CheckCircle2, RefreshCw, Headphones, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/landing/newsletter-form";
import { StatsCounter } from "@/components/landing/stats-counter";
import { WhatsAppButton } from "@/components/support/whatsapp-button";

const platforms = [
  { name: "Instagram", emoji: "📸", color: "#E1306C", services: 24, href: "/instagram-smm" },
  { name: "TikTok",    emoji: "🎵", color: "#69C9D0", services: 18, href: "/services" },
  { name: "YouTube",   emoji: "▶️",  color: "#FF0000", services: 15, href: "/youtube-smm" },
  { name: "Telegram",  emoji: "✈️",  color: "#0088cc", services: 12, href: "/telegram-smm" },
  { name: "Twitter/X", emoji: "𝕏",  color: "#1DA1F2", services: 10, href: "/services" },
  { name: "Facebook",  emoji: "👍", color: "#1877F2", services:  9, href: "/services" },
  { name: "Spotify",   emoji: "🎧", color: "#1DB954", services:  8, href: "/services" },
  { name: "LinkedIn",  emoji: "💼", color: "#0A66C2", services:  6, href: "/services" },
];

const benefits = [
  { icon: Zap,         title: "Ultra-Fast Delivery",         desc: "Orders start processing in 5–15 minutes using safe drip-feed systems to protect your accounts." },
  { icon: Shield,      title: "365-Day Refill Guarantee",    desc: "If your numbers drop within a year, we refill them for free. No questions asked." },
  { icon: Headphones,  title: "24/7 WhatsApp Support",       desc: "Our support team is available round the clock via Live Ticket and WhatsApp for instant help." },
  { icon: TrendingUp,  title: "Proven Results",              desc: "Over 3 lakh orders completed. Trusted by influencers, brands, and reseller agencies." },
  { icon: Star,        title: "Premium Quality",             desc: "High-retention, non-drop services. Real-looking engagement from quality sources." },
  { icon: RefreshCw,   title: "Easy Refill Requests",        desc: "Request refills directly from your dashboard for any completed order that has dropped." },
];

const steps = [
  { n: "01", title: "Sign Up",           desc: "Click Sign Up, fill in your details, and complete registration in under a minute." },
  { n: "02", title: "Add Funds Securely", desc: "Top up your wallet via UPI, Paytm, PhonePe, or card. Instant credit to your account." },
  { n: "03", title: "Select Service",    desc: "Go to New Order, pick your service, add your link and quantity desired." },
  { n: "04", title: "Receive Results",   desc: "Monitor delivery from your dashboard. Our team handles refills and ensures quality." },
];

const testimonials = [
  { name: "Priya Sharma",      role: "Instagram Influencer",   text: "I've been using this panel for over a year. The drip-feed system is amazing — my followers look completely organic and I've had zero drops.", avatar: "P" },
  { name: "Rahul Verma",       role: "Digital Marketing Agency", text: "We process hundreds of reseller orders daily through the API. Super reliable, instant delivery, and the support team responds within minutes.", avatar: "R" },
  { name: "Ankit Tiwari",      role: "YouTube Creator",        text: "The 365-day refill guarantee sold me. I got 50K YouTube views and they're still holding 6 months later. Best panel I've used.", avatar: "A" },
  { name: "Neha Patel",        role: "Business Owner",         text: "UPI payments make it so convenient. No international card hassles. Top up, order, done. My Telegram channel grew 10x in a month.", avatar: "N" },
];

const featured = [
  { name: "Instagram Followers (Real)", platform: "Instagram", rate: 18,   popular: true  },
  { name: "Instagram Likes (Fast)",     platform: "Instagram", rate: 4,    popular: true  },
  { name: "YouTube Views (HQ)",         platform: "YouTube",   rate: 9,    popular: false },
  { name: "TikTok Followers",           platform: "TikTok",    rate: 22,   popular: true  },
  { name: "Telegram Members",           platform: "Telegram",  rate: 12,   popular: false },
  { name: "Spotify Streams",            platform: "Spotify",   rate: 3,    popular: false },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-400 font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            India's #1 SMM Panel — Services from ₹3/1000
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 animate-fade-in">
            Grow Your Social Media{" "}
            <span className="block" style={{ background: "linear-gradient(135deg, #d4af37 0%, #f5e070 50%, #d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Presence Fast
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/50 mb-10 leading-relaxed animate-fade-in">
            Premium followers, likes, views & engagement for Instagram, TikTok, YouTube, Telegram and more.
            Instant UPI/Paytm payments. Non-drop with 365-day refill guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 animate-fade-in">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-8 h-12 shadow-lg shadow-amber-500/20">
              <Link href="/signup">Start Growing Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 h-12 px-8">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
          <StatsCounter />
        </div>
      </section>

      {/* Platforms */}
      <section className="border-y border-white/[0.06] bg-[#0a0a0a] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-white/30 uppercase tracking-widest mb-8">
            Services available for all major platforms
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {platforms.map((p) => (
              <Link key={p.name} href={p.href}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all group">
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-[10px] text-white/50 text-center leading-tight">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Quick & Easy Process</h2>
            <p className="text-white/40">Get your desired services in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative p-6 rounded-2xl border border-white/[0.07] bg-[#111] group hover:border-amber-500/25 transition-all">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-amber-500/30 z-10" />
                )}
                <div className="text-4xl font-black mb-3" style={{ color: "rgba(212,175,55,0.15)", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose SMM Panel Pro?</h2>
            <p className="text-white/40 max-w-xl mx-auto">Everything you need to dominate social media, all in one place.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl border border-white/[0.07] bg-[#111] hover:border-amber-500/30 hover:bg-[#141414] transition-all group">
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
      <section className="py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Services</h2>
              <p className="text-white/40">Our most popular services — non-drop, fast delivery</p>
            </div>
            <Button asChild variant="outline" className="border-white/10 text-white/60 hover:text-white">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((s) => (
              <div key={s.name} className="relative p-5 rounded-xl border border-white/[0.07] bg-[#111] hover:border-amber-500/25 transition-all group">
                {s.popular && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full px-2.5 py-0.5">🔥 Popular</span>
                )}
                <div className="text-xs font-medium text-white/30 mb-1.5">{s.platform}</div>
                <div className="font-semibold text-white mb-3 group-hover:text-amber-100 transition-colors">{s.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold" style={{ color: "#d4af37" }}>₹{s.rate}</span>
                  <span className="text-xs text-white/30">per 1K</span>
                </div>
                <Button asChild size="sm" className="mt-4 w-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 font-medium">
                  <Link href="/new-order">Order Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our Clients Say</h2>
            <p className="text-white/40">Trusted by thousands of creators and agencies across India</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="p-5 rounded-2xl border border-white/[0.07] bg-[#111] flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />)}
                </div>
                <p className="text-sm text-white/55 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-14 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">Accepted Payment Methods</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["UPI", "Paytm", "PhonePe", "Google Pay", "NEFT/IMPS", "Debit Card", "Credit Card"].map((p) => (
              <span key={p} className="px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white/50 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-white/40 text-sm mb-6">Get the latest SMM tips, new services, and exclusive deals in your inbox.</p>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-6"
            style={{ boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}>
            <Users className="h-6 w-6 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Grow Your Audience?</h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Join over 10,000 customers who trust SMM Panel Pro to grow their social media presence.
          </p>
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 h-12 shadow-lg shadow-amber-500/20">
            <Link href="/signup">Create Free Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-white/30">
            {["No credit card required", "Instant UPI payments", "365-day refill guarantee"].map((t) => (
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
