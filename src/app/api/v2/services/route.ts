// src/app/api/v2/services/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, apiSuccess, apiError } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const { error } = await validateApiKey(req);
  if (error) return error;

  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: {
        id: true, name: true, category: true,
        description: true, rate: true,
        minQuantity: true, maxQuantity: true,
      },
      orderBy: { category: "asc" },
    });
    return apiSuccess(services);
  } catch {
    return apiError("Internal server error", 500);
  }
}
