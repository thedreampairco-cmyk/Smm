"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ShoppingCart, Info, X, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderPlacementModal } from "./order-placement-modal";
import { ServiceDetailModal } from "./service-detail-modal";

interface Service {
  id: string; name: string; category: string; description: string;
  rate: number; minQuantity: number; maxQuantity: number; popularity: number;
}

interface Props { services: Service[]; categories: string[]; }

type SortKey = "popular" | "price-asc" | "price-desc" | "name";

export function ServicesClient({ services, categories }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("popular");
  const [page, setPage] = useState(1);
  const [orderTarget, setOrderTarget] = useState<Service | null>(null);
  const [detailTarget, setDetailTarget] = useState<Service | null>(null);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    let list = services;
    if (category !== "All") list = list.filter((s) => s.category === category);
    if (search) list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.rate - b.rate);
      case "price-desc": return [...list].sort((a, b) => b.rate - a.rate);
      case "name": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default: return [...list].sort((a, b) => b.popularity - a.popularity);
    }
  }, [services, category, search, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleOrder(service: Service) {
    if (!session) { router.push("/signin?callbackUrl=/services"); return; }
    setOrderTarget(service);
  }

  return (
    <>
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-[#111] border-white/10 text-white placeholder:text-white/25 pl-10 h-10 focus:border-amber-500/40"
          />
        </div>

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="bg-[#111] border border-white/10 text-white/70 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-amber-500/40"
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-[#111] border border-white/10 text-white/70 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-amber-500/40"
        >
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-white/30 mb-5">
        Showing {paginated.length} of {filtered.length} services
      </p>

      {/* Pricing table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.07] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] border-b border-white/[0.07]">
            <tr className="text-white/40 text-xs uppercase tracking-wider">
              {["Service", "Category", "Rate / 1K", "Min Qty", "Max Qty", "Actions"].map((h) => (
                <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((service) => (
              <tr
                key={service.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="font-medium text-white text-xs leading-snug max-w-[220px]">
                    {service.name}
                    {service.popularity > 90 && (
                      <span className="ml-2 text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full px-1.5 py-0.5 font-bold">
                        Hot
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-xs text-white/40 bg-white/[0.05] px-2 py-0.5 rounded-md">
                    {service.category}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-amber-400 font-bold">${service.rate.toFixed(2)}</span>
                </td>
                <td className="py-3.5 px-4 text-white/50 text-xs">{service.minQuantity.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-white/50 text-xs">{service.maxQuantity.toLocaleString()}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDetailTarget(service)}
                      className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.07] transition-all"
                      title="View details"
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleOrder(service)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition-all"
                    >
                      <ShoppingCart className="h-3 w-3" /> Order
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginated.length === 0 && (
          <div className="py-16 text-center text-white/30">No services match your search.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 text-sm rounded-lg border transition-all ${
                p === page
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400 font-semibold"
                  : "border-white/[0.08] text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {orderTarget && (
        <OrderPlacementModal service={orderTarget} onClose={() => setOrderTarget(null)} />
      )}
      {detailTarget && (
        <ServiceDetailModal service={detailTarget} onClose={() => setDetailTarget(null)} onOrder={() => { setDetailTarget(null); handleOrder(detailTarget); }} />
      )}
    </>
  );
}
