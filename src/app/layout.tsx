import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "SMM Panel Pro — #1 Social Media Marketing Panel",
    template: "%s | SMM Panel Pro",
  },
  description:
    "Boost your social media presence with SMM Panel Pro. Premium followers, likes, views and more for Instagram, TikTok, YouTube, and Twitter. Fast delivery, affordable prices.",
  keywords: ["SMM panel", "social media marketing", "buy followers", "buy likes", "instagram followers"],
  openGraph: {
    title: "SMM Panel Pro",
    description: "Premium Social Media Marketing Services",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0f0f0f] text-white antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
