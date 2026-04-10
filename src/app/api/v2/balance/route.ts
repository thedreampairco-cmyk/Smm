// src/app/api/v2/balance/route.ts
import { NextRequest } from "next/server";
import { validateApiKey, apiSuccess } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const { error, user } = await validateApiKey(req);
  if (error) return error;

  return apiSuccess({
    balance: user!.wallet?.balance ?? 0,
    currency: user!.wallet?.currency ?? "USD",
  });
}
