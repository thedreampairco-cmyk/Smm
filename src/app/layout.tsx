import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { WhatsAppButton } from "@/components/support/whatsapp-button";

export const metadata: Metadata = {
  title: {
    default: "SMM Panel Pro — India's #1 Social Media Marketing Panel",
    template: "%s | SMM Panel Pro",
  },
  description:
    "Best SMM Panel India. Buy Instagram followers, YouTube views, Telegram members, TikTok likes & more. Services from ₹3/1000. Instant UPI payments. 365-day refill guarantee.",
  keywords: ["SMM panel India", "buy Instagram followers", "buy YouTube views", "cheapest SMM panel", "Indian SMM panel", "UPI SMM panel"],
  openGraph: {
    title: "SMM Panel Pro — India's #1 SMM Panel",
    description: "Premium Social Media Marketing Services from ₹3/1000",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        
        
        
      </head>
      <body className="min-h-screen bg-[#0f0f0f] text-white antialiased">
        <Providers>
          {children}
          <WhatsAppButton />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
