// src/app/admin/services/page.tsx
import { prisma } from "@/lib/prisma";
import { AdminServicesClient } from "@/components/admin/admin-services-client";
export const metadata = { title: "Manage Services" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminServicesClient services={JSON.parse(JSON.stringify(services))} />;
}
