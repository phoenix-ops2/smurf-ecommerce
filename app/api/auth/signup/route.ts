import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  // Simulate delay and return fake user
  await new Promise((res) => setTimeout(res, 1000));

  return NextResponse.json({
    id: Date.now(), // fake ID
    email,
    token: "fake-signup-token",
  });
}
