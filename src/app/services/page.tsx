// src/app/services/page.tsx
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesClient } from "@/components/services/services-client";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { popularity: "desc" },
  });
  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category))).sort()];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Services</h1>
            <p className="text-white/40">Browse our full catalog of social media services.</p>
          </div>
          <ServicesClient services={JSON.parse(JSON.stringify(services))} categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
