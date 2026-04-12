import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; category: string; body: string[] }> = {
  "what-is-smm-panel": {
    title: "What is an SMM Panel and How Does It Work?",
    date: "April 10, 2026", category: "Guide",
    body: [
      "An SMM (Social Media Marketing) Panel is an online platform where individuals and businesses purchase social media engagement services like followers, likes, and views at wholesale prices.",
      "When you place an order, the panel connects to a network of providers and delivers engagement gradually using drip-feed technology — making growth look organic and safe.",
      "SMM panels are used by content creators, businesses, digital agencies, and resellers. Our 365-day refill guarantee ensures your numbers stay stable long-term.",
    ],
  },
  "instagram-growth-guide-2026": {
    title: "Instagram Growth Guide 2026",
    date: "April 8, 2026", category: "Instagram",
    body: [
      "Growing on Instagram in 2026 requires consistency and smart strategy. The algorithm heavily favors Reels — aim for 3-4 per week with trending audio.",
      "Use SMM services strategically: start with 1,000-5,000 followers to build social proof, then boost new posts with likes in the first hour to signal popularity.",
      "Always use drip-feed delivery and never buy more than 10% of your existing follower count at once for maximum safety.",
    ],
  },
  "safe-upi-payments-smm": {
    title: "How to Add Funds via UPI Safely",
    date: "April 5, 2026", category: "Payments",
    body: [
      "Adding funds via UPI is instant and free. Login → Wallet → Add Funds → Enter amount → Pay with Google Pay, PhonePe, or Paytm on the Razorpay checkout.",
      "Always verify the URL is your panel domain before paying. Never share your UPI PIN with anyone. Keep payment receipts for reference.",
    ],
  },
  "telegram-channel-growth": {
    title: "How to Grow a Telegram Channel Fast",
    date: "April 2, 2026", category: "Telegram",
    body: [
      "Telegram is booming in India. Start with 500-1000 members to create credibility — empty channels rarely get organic joins.",
      "Post valuable content daily: tips, news, exclusive deals. Use our Telegram services: Channel Members from ₹12/1000, Post Views from ₹0.5/1000.",
    ],
  },
  "youtube-monetization-views": {
    title: "YouTube Monetization: Which Views Service to Use",
    date: "March 28, 2026", category: "YouTube",
    body: [
      "For monetized channels, always choose High Retention Views — viewers watch 60-80% of your video, making it safe for the YouTube Partner Program.",
      "Our Watch Time service at ₹180 per 100 hours is the fastest way to reach the 4,000-hour monetization requirement.",
    ],
  },
  "smm-reseller-guide": {
    title: "How to Start an SMM Reseller Business in India",
    date: "March 25, 2026", category: "Business",
    body: [
      "Buy services at wholesale from our panel, sell at retail to your clients, keep the margin as profit. Example: buy Instagram followers at ₹18/1000, sell at ₹50/1000 — 177% margin.",
      "Get your API key from the dashboard and integrate with your own website to automate orders. With 100 regular customers you can earn ₹25,000+/month.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title, description: post.body[0].slice(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="text-xs font-semibold text-amber-400 mb-3 block">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">{post.title}</h1>
          <p className="text-white/40 text-sm mb-10">{post.date}</p>
          <div className="space-y-5">
            {post.body.map((p, i) => (
              <p key={i} className="text-white/65 leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <p className="text-white font-semibold mb-2">Ready to grow your social media?</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Get Started Free →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
