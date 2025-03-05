import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id") ?? null

  console.log("id:", id)
  if (id === null) {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "id" query',
          code: "MISSING_ID",
        },
      },
      { status: 400 }
    )
  }

  const res = await fetch(
    "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
    {
      method: "POST",
      headers: {
        token: "3cf9db27be144476b963e54889c1f127",
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify({
        num: id,
        phone: null,
      }),
    }
  )

  const order = await res.json()

  return NextResponse.json({ ...order, id })
}
