// src/app/api-docs/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata = { title: "API Documentation" };

const endpoints = [
  {
    method: "GET", path: "/api/v2/services",
    description: "List all active services",
    response: `{ "success": true, "data": [{ "id": "...", "name": "...", "category": "...", "rate": 1.99, "minQuantity": 100, "maxQuantity": 100000 }] }`,
  },
  {
    method: "POST", path: "/api/v2/orders",
    description: "Place a new order",
    body: `{ "serviceId": "cuid", "quantity": 1000, "targetUsername": "@handle" }`,
    response: `{ "success": true, "data": { "orderId": "...", "status": "PENDING", "totalPrice": 1.99 } }`,
  },
  {
    method: "GET", path: "/api/v2/orders/:orderId",
    description: "Get order status",
    response: `{ "success": true, "data": { "id": "...", "status": "COMPLETED", "quantity": 1000, "totalPrice": 1.99 } }`,
  },
  {
    method: "GET", path: "/api/v2/balance",
    description: "Get current wallet balance",
    response: `{ "success": true, "data": { "balance": 45.50, "currency": "USD" } }`,
  },
];

const methodColors: Record<string, string> = {
  GET: "text-green-400 bg-green-500/10 border-green-500/25",
  POST: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  PATCH: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  DELETE: "text-red-400 bg-red-500/10 border-red-500/25",
};

export default function APIDocsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.com";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">API Documentation</h1>
            <p className="text-white/40">Public API v2 — Build integrations with SMM Panel Pro</p>
          </div>

          {/* Auth */}
          <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-10">
            <h2 className="font-bold text-amber-300 mb-3">Authentication</h2>
            <p className="text-sm text-white/60 mb-3">
              All API requests require an API key. Pass it as a header or query parameter:
            </p>
            <code className="block text-xs text-amber-300 bg-black/40 px-4 py-3 rounded-lg">
              x-api-key: YOUR_API_KEY<br />
              — or —<br />
              {baseUrl}/api/v2/services?api_key=YOUR_API_KEY
            </code>
            <p className="text-xs text-white/30 mt-3">Generate your API key from the Dashboard → API Keys tab.</p>
          </div>

          {/* Base URL */}
          <div className="mb-8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Base URL</p>
            <code className="text-sm text-amber-300 bg-[#111] border border-white/[0.07] px-4 py-2.5 rounded-lg block">
              {baseUrl}/api/v2
            </code>
          </div>

          {/* Rate limiting */}
          <div className="p-4 rounded-xl border border-white/[0.07] bg-[#111] mb-10 text-sm text-white/50">
            <span className="text-white font-medium">Rate Limiting:</span> 60 requests per minute per API key.
            Exceeding the limit returns HTTP 429.
          </div>

          {/* Endpoints */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Endpoints</h2>
            {endpoints.map((ep, i) => (
              <div key={i} className="rounded-xl border border-white/[0.07] bg-[#111] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${methodColors[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-white font-mono">{ep.path}</code>
                </div>
                <div className="px-5 py-4 space-y-4">
                  <p className="text-sm text-white/60">{ep.description}</p>
                  {ep.body && (
                    <div>
                      <p className="text-xs text-white/35 uppercase tracking-wider mb-1.5 font-semibold">Request Body</p>
                      <pre className="text-xs text-green-300 bg-black/30 px-4 py-3 rounded-lg overflow-x-auto">
                        {ep.body}
                      </pre>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-1.5 font-semibold">Response</p>
                    <pre className="text-xs text-white/60 bg-black/30 px-4 py-3 rounded-lg overflow-x-auto">
                      {ep.response}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Error codes */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">Error Codes</h2>
            <div className="rounded-xl border border-white/[0.07] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.02] border-b border-white/[0.07]">
                  <tr className="text-white/35 text-xs uppercase tracking-wider">
                    <th className="text-left py-3 px-4">Code</th>
                    <th className="text-left py-3 px-4">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["400", "Bad Request — Invalid input parameters"],
                    ["401", "Unauthorized — Missing or invalid API key"],
                    ["402", "Payment Required — Insufficient wallet balance"],
                    ["404", "Not Found — Resource does not exist"],
                    ["429", "Too Many Requests — Rate limit exceeded"],
                    ["500", "Internal Server Error — Contact support"],
                  ].map(([code, desc]) => (
                    <tr key={code} className="border-b border-white/[0.04]">
                      <td className="py-3 px-4 text-red-400 font-mono font-bold text-xs">{code}</td>
                      <td className="py-3 px-4 text-xs text-white/50">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
