import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {  
  const { searchParams } = new URL(request.url)
  const number = searchParams.get("num");
  const phone = searchParams.get("phone");

  const response = await fetch(
    "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
    {
      method: "POST",
      headers: {
        token: "3cf9db27be144476b963e54889c1f127",
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify({
        num: "555000009053",
        phone: null,
      }),
    }
  );

  const data = await response.json();
  // // console.log(data.data[0].forms[2]);

  return NextResponse.json(data);
}
