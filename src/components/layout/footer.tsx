import Link from "next/link";
import { Zap } from "lucide-react";
import { NewsletterForm } from "@/components/landing/newsletter-form";

const links = {
  services: [
    { label: "All Services",     href: "/services" },
    { label: "Instagram SMM",    href: "/instagram-smm" },
    { label: "YouTube SMM",      href: "/youtube-smm" },
    { label: "Telegram SMM",     href: "/telegram-smm" },
    { label: "New Order",        href: "/new-order" },
    { label: "API Docs",         href: "/api-docs" },
  ],
  company: [
    { label: "About Us",         href: "/about" },
    { label: "Contact Us",       href: "/contact" },
    { label: "FAQ",              href: "/faq" },
    { label: "Blog",             href: "/blog" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy",    href: "/refund-policy" },
  ],
  account: [
    { label: "Sign Up",          href: "/signup" },
    { label: "Sign In",          href: "/signin" },
    { label: "Dashboard",        href: "/dashboard" },
    { label: "Support Tickets",  href: "/tickets" },
    { label: "Add Funds",        href: "/dashboard" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-base font-bold">SMM Panel Pro</span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-5">
              India's most reliable SMM Panel. High-retention, non-drop services for Instagram, YouTube,
              Telegram, TikTok and more. Services from ₹3/1000.
            </p>
            <div className="space-y-2 text-xs text-white/35">
              <p>📞 <a href="tel:+918901926799" className="hover:text-white/60">+91 89019 26799 (10AM–10PM)</a></p>
              <p>💬 <a href={`https://wa.me/918901926799`} target="_blank" rel="noreferrer" className="hover:text-white/60">WhatsApp Support (24/7)</a></p>
              <p>✉️ <a href="mailto:support@smmpanelpro.com" className="hover:text-white/60">support@smmpanelpro.com</a></p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2.5">
              {links.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Account</h3>
            <ul className="space-y-2.5">
              {links.account.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/[0.06] pt-8 mb-8">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-white mb-1">Subscribe to Newsletter</p>
            <p className="text-xs text-white/35 mb-3">Get SMM tips, new services & exclusive deals.</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t border-white/[0.06] pt-8 mb-8">
          <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">Accepted Payments</p>
          <div className="flex flex-wrap gap-2">
            {["UPI", "Paytm", "PhonePe", "Google Pay", "NEFT/IMPS", "Visa", "Mastercard"].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-xs text-white/40">{p}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} SMM Panel Pro. All rights reserved.</p>
          <p className="text-xs text-white/20">🇮🇳 Made in India · Trusted by 10,000+ customers</p>
        </div>
      </div>
    </footer>
  );
}
