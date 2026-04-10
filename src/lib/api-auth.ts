// src/lib/api-auth.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60; // requests per minute

export async function validateApiKey(req: NextRequest) {
  const apiKey =
    req.headers.get("x-api-key") ||
    req.nextUrl.searchParams.get("api_key");

  if (!apiKey) {
    return { error: NextResponse.json({ error: "API key required" }, { status: 401 }) };
  }

  // Rate limiting
  const now = Date.now();
  const entry = rateLimitMap.get(apiKey) || { count: 0, resetAt: now + 60000 };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + 60000;
  }

  entry.count++;
  rateLimitMap.set(apiKey, entry);

  if (entry.count > RATE_LIMIT) {
    return { error: NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 }) };
  }

  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey, isActive: true },
    include: { user: { include: { wallet: true } } },
  });

  if (!key) {
    return { error: NextResponse.json({ error: "Invalid API key" }, { status: 401 }) };
  }

  // Update last used
  await prisma.apiKey.update({
    where: { id: key.id },
    data: { lastUsed: new Date() },
  });

  return { user: key.user };
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
