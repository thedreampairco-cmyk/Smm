import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Payments not configured yet. Please add funds manually via admin panel." },
    { status: 503 }
  );
}
