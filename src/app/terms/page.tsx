// src/app/terms/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = { title: "Terms of Service" };

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing or using SMM Panel Pro ('the Service'), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site." },
  { title: "2. Use of Services", body: "You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others. You may not use the Service to violate any platform's terms of service, to engage in fraudulent activity, or to harm third parties." },
  { title: "3. Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials and API keys. You are responsible for all activity that occurs under your account. Notify us immediately of any unauthorized use." },
  { title: "4. Payments & Wallet", body: "All wallet top-ups are final and non-refundable except in cases of service failure. Prices are in USD and include any applicable fees. We reserve the right to change pricing with 7 days notice." },
  { title: "5. Refund Policy", body: "Refunds are available only for undelivered or significantly underdelivered orders. Requests must be submitted within 30 days via support. Wallet balances are non-refundable to the original payment method." },
  { title: "6. Service Availability", body: "We strive for 99.9% uptime but do not guarantee uninterrupted service. We may modify, suspend, or discontinue any service at any time without notice." },
  { title: "7. Prohibited Activities", body: "You may not attempt to reverse-engineer, scrape, or exploit the platform. Reselling services without explicit written permission is prohibited. Creating fake accounts or engaging in fraudulent reviews is strictly forbidden." },
  { title: "8. Limitation of Liability", body: "SMM Panel Pro shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Service, including loss of profits, data, or account standing on third-party platforms." },
  { title: "9. Privacy", body: "Our collection and use of personal information is governed by our Privacy Policy. By using the Service, you consent to such processing and you warrant that all data provided by you is accurate." },
  { title: "10. Changes to Terms", body: "We reserve the right to modify these terms at any time. Changes are effective immediately upon posting. Continued use of the Service constitutes acceptance of the revised terms." },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
            <p className="text-sm text-white/30">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-white mb-2">{s.title}</h2>
                <p className="text-white/55 leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl border border-white/[0.07] bg-[#111]">
            <p className="text-sm text-white/40">
              If you have questions about these Terms, contact us at{" "}
              <a href="mailto:legal@smmpanelpro.com" className="text-amber-400 hover:underline">
                legal@smmpanelpro.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
