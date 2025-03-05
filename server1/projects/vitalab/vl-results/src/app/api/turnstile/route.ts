import { headers } from "next/headers"
import { NextResponse } from "next/server"

interface TurnstileResponse {
  success: boolean
  error_codes: string[]
  error_messages: string[]
}

export async function POST(request: Request) {
  const header = headers()
  const { token } = await request.json()

  const form = new URLSearchParams()
  form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)
  form.append("response", token)
  form.append("remoteip", header.get("x-forwarded-for") as string)
  // form.append("remoteip", request.headers["x-forwarded-for"] as string)

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  )

  const data = await res.json()
  console.log(data)

  //return NextResponse.json(data, { status: 200 })
  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
    headers: { "content-type": "application/json" },
  })
}
