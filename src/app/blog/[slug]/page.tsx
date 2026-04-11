import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "what-is-smm-panel": {
    title: "What is an SMM Panel and How Does It Work?",
    date: "April 10, 2026", category: "Guide",
    content: `An SMM Panel is an online platform where you can purchase social media services like followers, likes, and views at wholesale prices.\n\n## How It Works\n\nWhen you place an order, the panel connects to a network of providers and delivers engagement to your account gradually using drip-feed technology.\n\n## Who Uses SMM Panels?\n\nContent creators, businesses, digital agencies, and resellers all use SMM panels to boost their social media presence quickly and affordably.\n\n## Is It Safe?\n\nYes — when using a reputable provider with drip-feed delivery. Our 365-day refill guarantee ensures your numbers stay stable long-term.`,
  },
  "instagram-growth-guide-2026": {
    title: "Instagram Growth Guide 2026", date: "April 8, 2026", category: "Instagram",
    content: `Growing on Instagram in 2026 requires consistency and smart use of SMM services.\n\n## Post Reels Daily\n\nInstagram heavily favors Reels in 2026. Aim for 3-4 per week with trending audio.\n\n## Use SMM Services Strategically\n\nStart with 1,000-5,000 followers to build social proof. Then boost new posts with likes in the first hour to signal popularity to the algorithm.\n\n## Safety Tips\n\nAlways use drip-feed delivery. Never buy more than 10% of your existing follower count at once.`,
  },
  "safe-upi-payments-smm": {
    title: "How to Add Funds via UPI Safely", date: "April 5, 2026", category: "Payments",
    content: `Adding funds via UPI is instant and free. Here is how to do it safely.\n\n## Step by Step\n\nLogin → Wallet → Add Funds → Enter amount → Select UPI on Razorpay checkout → Pay with Google Pay, PhonePe, or Paytm.\n\n## Safety Tips\n\nAlways verify the URL is your panel domain before paying. Never share your UPI PIN with anyone.`,
  },
  "telegram-channel-growth": {
    title: "How to Grow a Telegram Channel Fast", date: "April 2, 2026", category: "Telegram",
    content: `Telegram is booming in India. Here is how to grow your channel.\n\n## Buy Initial Members\n\nStart with 500-1000 members to create credibility. Empty channels rarely get organic joins.\n\n## Post Daily\n\nShare valuable content like tips, news, or exclusive deals every day to keep members engaged.\n\n## Our Telegram Services\n\nChannel Members from ₹12/1000, Post Views from ₹0.5/1000, Reactions from ₹8/1000.`,
  },
  "youtube-monetization-views": {
    title: "YouTube Monetization: Which Views Service to Use", date: "March 28, 2026", category: "YouTube",
    content: `Not all YouTube view services are safe for monetized channels.\n\n## High Retention Views\n\nAlways choose High Retention Views for monetized channels. These have 60-80% watch time and are safe for the YouTube Partner Program.\n\n## Watch Time Service\n\nOur Watch Time service directly adds hours to your channel. At ₹180 per 100 hours, this is the fastest way to reach monetization eligibility.`,
  },
  "smm-reseller-guide": {
    title: "How to Start an SMM Reseller Business in India", date: "March 25, 2026", category: "Business",
    content: `SMM reselling is one of the most profitable online businesses in India.\n\n## How It Works\n\nBuy services at wholesale from our panel and sell at retail to your clients. Example: buy Instagram followers at ₹18/1000, sell at ₹50/1000, profit ₹32 per 1000.\n\n## Get Started\n\nCreate an account, generate an API key from your dashboard, and integrate with your own website to automate orders.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="mb-8">
            <span className="text-xs font-semibold text-amber-400 mb-3 block">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
            <p className="text-white/40 text-sm">{post.date}</p>
          </div>
          <div className="space-y-4">
            {paragraphs.map((p, i) => {
              if (p.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{p.slice(3)}</h2>;
              if (p.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-amber-400 mt-6 mb-2">{p.slice(4)}</h3>;
              return <p key={i} className="text-white/60 leading-relaxed text-sm">{p}</p>;
            })}
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
