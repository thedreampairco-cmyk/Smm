export const dynamic = "force-dynamic";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Blog — SMM Tips & Guides" };

const posts = [
  { slug: "what-is-smm-panel",                title: "What is an SMM Panel and How Does It Work?",            date: "April 10, 2026", category: "Guide",     excerpt: "Learn how SMM panels work, how to use them safely, and how to choose the best provider for your needs." },
  { slug: "instagram-growth-guide-2026",       title: "Instagram Growth Guide 2026 — Best Strategies",         date: "April 8, 2026",  category: "Instagram", excerpt: "The definitive guide to growing your Instagram account in 2026 using organic and paid strategies." },
  { slug: "safe-upi-payments-smm",             title: "How to Add Funds via UPI on SMM Panels Safely",         date: "April 5, 2026",  category: "Payments",  excerpt: "Step-by-step guide to topping up your SMM panel wallet using UPI, Paytm, and PhonePe safely." },
  { slug: "telegram-channel-growth",           title: "How to Grow a Telegram Channel Fast in 2026",           date: "April 2, 2026",  category: "Telegram",  excerpt: "Proven strategies to grow your Telegram channel members and engagement using SMM services." },
  { slug: "youtube-monetization-views",        title: "YouTube Monetization: Which Views Service to Use",      date: "March 28, 2026", category: "YouTube",   excerpt: "Not all YouTube view services are safe for monetized channels. Here's what to look for." },
  { slug: "smm-reseller-guide",               title: "How to Start an SMM Reseller Business in India",        date: "March 25, 2026", category: "Business",  excerpt: "Complete guide to starting a profitable SMM reseller business using our API and white-label panel." },
];

const categoryColors: Record<string, string> = {
  Guide:     "bg-purple-500/15 text-purple-400 border-purple-500/25",
  Instagram: "bg-pink-500/15 text-pink-400 border-pink-500/25",
  Payments:  "bg-green-500/15 text-green-400 border-green-500/25",
  Telegram:  "bg-blue-500/15 text-blue-400 border-blue-500/25",
  YouTube:   "bg-red-500/15 text-red-400 border-red-500/25",
  Business:  "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-3">SMM Blog</h1>
            <p className="text-white/40">Tips, guides, and strategies for social media growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article key={post.slug}
                className="p-5 rounded-2xl border border-white/[0.07] bg-[#111] hover:border-amber-500/20 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-white/30">{post.date}</span>
                </div>
                <h2 className="font-bold text-white text-sm leading-snug mb-2 flex-1">{post.title}</h2>
                <p className="text-xs text-white/45 leading-relaxed mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium mt-auto">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
