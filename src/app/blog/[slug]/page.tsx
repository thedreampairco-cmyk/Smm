import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "what-is-smm-panel": {
    title: "What is an SMM Panel and How Does It Work?",
    date: "April 10, 2026",
    category: "Guide",
    content: `An SMM (Social Media Marketing) Panel is an online platform where individuals and businesses can purchase social media engagement services such as followers, likes, views, and comments at wholesale prices.

## How It Works

SMM panels work by connecting buyers with a network of service providers. When you place an order:

1. You select a service (e.g., Instagram followers)
2. Enter your target URL or username
3. Specify the quantity
4. Pay from your wallet balance
5. The panel processes your order through its provider network
6. Delivery begins within minutes

## Who Uses SMM Panels?

- **Content Creators** — Boost initial engagement on new accounts
- **Businesses** — Build social proof for their brand pages
- **Digital Agencies** — Manage multiple client campaigns efficiently
- **Resellers** — Buy wholesale and sell retail to their own customers via our API

## Is It Safe?

Yes, when using a reputable panel like SMM Panel Pro that uses drip-feed delivery technology. This means followers or likes are delivered gradually over time, mimicking organic growth patterns that platforms expect to see.

## Key Features to Look For

- **Non-drop guarantee** — Numbers should stay stable after delivery
- **365-day refill guarantee** — Free top-ups if numbers drop
- **Drip-feed delivery** — Safe, gradual delivery
- **Indian payment methods** — UPI, Paytm, PhonePe support
- **24/7 support** — Quick resolution of any issues`,
  },
  "instagram-growth-guide-2026": {
    title: "Instagram Growth Guide 2026 — Best Strategies",
    date: "April 8, 2026",
    category: "Instagram",
    content: `Growing on Instagram in 2026 requires a combination of organic strategies and smart use of SMM services. Here's a complete guide.

## Organic Growth Strategies

### 1. Post Consistently
Aim for at least 3-4 Reels per week. Instagram's algorithm heavily favors Reels in 2026.

### 2. Use Trending Audio
Reels with trending audio get 3-5x more reach. Check the trending audio section daily.

### 3. Optimize Your Profile
- Clear profile picture
- Keyword-rich bio
- Link to your website or WhatsApp

## Using SMM Services Strategically

### Start with Followers
Getting your first 1,000-5,000 followers creates social proof. New visitors are more likely to follow an account with existing followers.

### Boost New Posts with Likes
When you post new content, buy 200-500 likes within the first hour. This signals to Instagram's algorithm that your content is popular.

### Reels Views for Discovery
Buying Reels views helps push your content into the Explore page, where it can reach new organic audiences.

## Safety Tips

Always use our drip-feed delivery option for followers. Never buy more than 10% of your existing follower count at once.`,
  },
  "safe-upi-payments-smm": {
    title: "How to Add Funds via UPI on SMM Panels Safely",
    date: "April 5, 2026",
    category: "Payments",
    content: `Adding funds via UPI to your SMM Panel wallet is quick, free, and instant. Here's a step-by-step guide.

## Step 1: Login to Your Account

Sign in to SMM Panel Pro with your email and password.

## Step 2: Go to Wallet

Click on your profile → Wallet, or visit /wallet directly.

## Step 3: Click Add Funds

Choose a preset amount or enter a custom amount.

## Step 4: Select UPI Payment

On the Razorpay checkout page, choose UPI as your payment method.

## Step 5: Pay with Any UPI App

You can use:
- **Google Pay** — Most popular, instant settlement
- **PhonePe** — Reliable and fast
- **Paytm** — Accepts wallet + UPI
- **BHIM** — Direct bank UPI transfer
- **Any banking app** with UPI support

## Step 6: Funds Added Instantly

As soon as payment is confirmed, your wallet balance updates automatically. No delays.

## Safety Tips

- Always check the URL before paying — only pay on smmpanelpro.com
- Never share your UPI PIN with anyone
- Keep payment receipts for reference`,
  },
  "telegram-channel-growth": {
    title: "How to Grow a Telegram Channel Fast in 2026",
    date: "April 2, 2026",
    category: "Telegram",
    content: `Telegram channels are one of the fastest-growing social platforms in India. Here's how to grow yours quickly.

## Why Telegram is Booming in India

- No algorithm suppression — all posts reach all members
- Forward feature spreads content virally
- Perfect for prediction channels, crypto signals, business updates

## Quick Growth Strategies

### 1. Buy Initial Members
Start with 500-1000 members to create credibility. Empty channels rarely get organic joins.

### 2. Post Valuable Content Daily
- Stock/crypto tips
- Exclusive deals
- News updates

### 3. Cross-promote
Share your Telegram link on Instagram, YouTube descriptions, and WhatsApp status.

### 4. Boost Post Views
Buying post views helps your content appear more popular, increasing forwards.

## Our Telegram Services

- **Channel Members** — ₹12 per 1000
- **Post Views** — ₹0.5 per 1000  
- **Reactions** — ₹8 per 1000
- **Poll Votes** — ₹20 per 1000`,
  },
  "youtube-monetization-views": {
    title: "YouTube Monetization: Which Views Service to Use",
    date: "March 28, 2026",
    category: "YouTube",
    content: `Not all YouTube view services are safe for monetized channels. Here's what you need to know.

## YouTube Partner Program Requirements

To monetize your channel, you need:
- 1,000 subscribers
- 4,000 watch hours in the past 12 months

## High-Retention vs Regular Views

**Regular views** — Counted by YouTube but may have low watch time. Not recommended for monetized channels.

**High-retention views** — Viewers watch 60-80% of your video. Safe for monetized channels and helps with the 4,000 hour requirement.

## Which Service to Choose

For monetized channels, always choose:
- ✅ "High Retention Views" 
- ✅ "Watch Time Hours" service
- ❌ Never use cheap "bot views"

## Watch Time Service

Our Watch Time service directly adds hours to your channel's count. This is the most efficient way to reach monetization eligibility.

**Price: ₹180 per 100 hours** — far cheaper than waiting months organically.

## Safety Notes

- Never buy more than 2,000 views per day on a monetized channel
- Use drip-feed delivery
- Keep at least 50% organic traffic to avoid detection`,
  },
  "smm-reseller-guide": {
    title: "How to Start an SMM Reseller Business in India",
    date: "March 25, 2026",
    category: "Business",
    content: `Starting an SMM reseller business in India is one of the most profitable online businesses in 2026. Here's how to get started.

## What is SMM Reselling?

You buy services at wholesale prices from our panel and sell them to your clients at retail prices, keeping the margin as profit.

**Example:**
- Buy Instagram followers at ₹18/1000
- Sell to client at ₹50/1000
- Profit: ₹32 per 1000 = 177% margin

## Step 1: Create an Account

Sign up on SMM Panel Pro and add funds to your wallet.

## Step 2: Get Your API Key

Go to Dashboard → API Keys → Generate Key. This lets you automate orders from your own website.

## Step 3: Set Up Your Reseller Website

Create a simple website with your own branding. Use our API to automatically place orders when your customers purchase.

## Step 4: Set Your Pricing

Mark up services by 50-200% depending on competition in your area.

## Step 5: Market Your Business

- Instagram and WhatsApp marketing work best in India
- Target digital marketing agencies and content creators
- Offer first order discounts

## Profit Calculator

With just 10 customers spending ₹500/month each:
- Monthly revenue: ₹5,000
- Your cost (at 50% margin): ₹2,500
- **Monthly profit: ₹2,500+**

Scale to 100 customers = ₹25,000+/month`,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  // Convert markdown-lite to HTML-ish
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-amber-400 mb-3 block">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
            <p className="text-white/40 text-sm">{post.date}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {paragraphs.map((p, i) => {
              if (p.startsWith("## ")) return (
                <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{p.slice(3)}</h2>
              );
              if (p.startsWith("### ")) return (
                <h3 key={i} className="text-lg font-semibold text-amber-400 mt-6 mb-2">{p.slice(4)}</h3>
              );
              if (p.startsWith("- ") || p.includes("\n- ")) {
                const items = p.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
                return (
                  <ul key={i} className="space-y-1.5 mb-4 pl-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-white/60 text-sm leading-relaxed list-disc"
                        dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-white/60 leading-relaxed mb-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>").replace(/✅|❌/g, (m) => `<span>${m}</span>`) }} />
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <p className="text-white font-semibold mb-2">Ready to grow your social media?</p>
            <p className="text-white/50 text-sm mb-4">Join 10,000+ customers using SMM Panel Pro</p>
            <Link href="/signup"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Get Started Free →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
