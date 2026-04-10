// src/app/faq/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChevronDown } from "lucide-react";

export const metadata = { title: "FAQ" };

const faqs = [
  { q: "What is SMM Panel Pro?", a: "SMM Panel Pro is a premium Social Media Marketing panel offering affordable, fast services for followers, likes, views, and more across all major platforms including Instagram, TikTok, YouTube, and Twitter/X." },
  { q: "How fast are orders delivered?", a: "Most orders begin processing within 1–5 minutes of placement. Full delivery depends on the quantity ordered, but most complete within 24 hours. High-volume orders may take up to 72 hours." },
  { q: "Are the followers and likes real?", a: "We offer a range of service tiers. Our premium services deliver high-quality, real-looking profiles. We clearly label all service descriptions to help you choose the right tier for your needs." },
  { q: "Is my account safe?", a: "Yes. All our services comply with platform guidelines and use safe, gradual delivery methods to protect your account from flags or restrictions." },
  { q: "How do I add funds to my wallet?", a: "Navigate to your Dashboard, click 'Add Funds', select an amount, and complete payment via Stripe. Funds are credited instantly after successful payment." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards (Visa, Mastercard, Amex) via our secure Stripe integration. We do not store any card data." },
  { q: "Can I get a refund?", a: "If an order fails to complete or significantly underdelivers, we offer a refund or re-delivery. Contact support with your order ID within 30 days of the order date." },
  { q: "Do you have a public API?", a: "Yes! We offer a full Public API v2 for developers. Visit our API documentation page to learn how to integrate our services into your own platform using API key authentication." },
  { q: "How do I get an API key?", a: "Log into your dashboard, navigate to the API Keys tab, and generate a new key. Keep it secure — anyone with your key can place orders on your behalf." },
  { q: "What happens if my order drops?", a: "Many of our services include non-drop guarantees. If you notice a drop within the guarantee period, open a support ticket and we will top it back up at no charge." },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-white/40">Everything you need to know about SMM Panel Pro</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.07] bg-[#111] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                  <span className="font-medium text-white text-sm pr-4">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-white/30 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/[0.05]">
                  <div className="pt-3">{faq.a}</div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <p className="text-white font-semibold mb-2">Still have questions?</p>
            <p className="text-sm text-white/40 mb-4">Our support team is available 24/7</p>
            <a
              href="mailto:support@smmpanelpro.com"
              className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
