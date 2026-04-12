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
  description: "Best SMM Panel India. Buy Instagram followers, YouTube views, Telegram members, TikTok likes. From ₹3/1000. Instant UPI. 365-day refill guarantee.",
  keywords: ["SMM panel India","buy Instagram followers","buy YouTube views","cheapest SMM panel","UPI SMM panel"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
