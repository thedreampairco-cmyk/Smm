import Link from "next/link";
import { Zap, Twitter, Github, Mail } from "lucide-react";

const links = {
  product: [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/services" },
    { label: "API Docs", href: "/api-docs" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  company: [
    { label: "FAQ", href: "/faq" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-base font-bold">SMM Panel Pro</span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              The premium destination for social media marketing services. Trusted by thousands
              of creators and businesses worldwide.
            </p>
            <div className="flex gap-4 mt-5">
              {[Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/30 hover:text-amber-400 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              {links.product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} SMM Panel Pro. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built for creators. Powered by ambition.
          </p>
        </div>
      </div>
    </footer>
  );
}
