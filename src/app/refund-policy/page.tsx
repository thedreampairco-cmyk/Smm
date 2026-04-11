export const dynamic = "force-dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = { title: "Refund Policy" };

const sections = [
  {
    title: "1. General Refund Policy",
    content: "All purchases on SMM Panel Pro are final once an order has started processing. We do not offer cash refunds once a service has been delivered or is in progress. However, we do offer wallet credits in certain eligible cases.",
  },
  {
    title: "2. When You Are Eligible for a Refund",
    content: "You may be eligible for a wallet credit refund if: (a) your order was charged but never started within 72 hours, (b) the service was delivered to the wrong account due to our error, or (c) the service was significantly under-delivered (received less than 50% of the ordered quantity).",
  },
  {
    title: "3. Non-Refundable Cases",
    content: "Refunds will NOT be issued in the following cases: orders that have been completed as specified, partial delivery that meets the minimum threshold, drops in numbers after delivery (use our refill guarantee instead), accounts that were banned or restricted after delivery, wrong target URL/username provided by the customer.",
  },
  {
    title: "4. Our 365-Day Refill Guarantee",
    content: "Instead of refunds, we offer a 365-day refill guarantee on most services. If your numbers drop within one year of the order completion, you can request a free refill directly from your dashboard. This is our preferred resolution method as it better serves your social media goals.",
  },
  {
    title: "5. How to Request a Refund or Refill",
    content: "To request a refund or refill, go to your Dashboard → Orders → select the relevant order → click 'Request Refill'. For refund requests (wallet credit), open a Support Ticket from the Tickets page. Include your Order ID and reason for the request. Our team will review within 24–48 hours.",
  },
  {
    title: "6. Wallet Credits",
    content: "Approved refunds are issued as wallet credits, not cash. These credits can be used for future orders on our platform. Wallet credits are non-transferable and non-withdrawable.",
  },
  {
    title: "7. Payment Disputes",
    content: "If you initiate a payment dispute or chargeback with your bank or payment provider without first contacting us, your account may be permanently suspended. We encourage you to contact our support team first — we resolve most issues within 24 hours.",
  },
  {
    title: "8. Contact Us",
    content: "For any refund-related queries, please open a Support Ticket from your dashboard or contact us via WhatsApp. Our support team is available 24/7.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Refund Policy</h1>
            <p className="text-white/40 text-sm">Last updated: April 2026</p>
          </div>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
                <p className="text-white/55 leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
