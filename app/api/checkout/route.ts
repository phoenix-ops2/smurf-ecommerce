import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Simulate order processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!body || body.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Order received!",
    orderId: Math.floor(Math.random() * 100000),
  });
}
