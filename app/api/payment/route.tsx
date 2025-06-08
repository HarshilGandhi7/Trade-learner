import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { amount, currency, receipt } = await request.json();
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Razorpay API error:", errorData);
    return NextResponse.json(
      {
        success: false,
        message: "Payment initiation failed",
        error: errorData.error?.description || "Unknown error",
      },
      { status: response.status }
    );
  }

  const orderData=await response.json();

  return NextResponse.json({
    success: true,
    message: "Payment initiated",
    data: orderData,
  });
}
