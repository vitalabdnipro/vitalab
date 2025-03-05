import { NextResponse } from "next/server"

import { base64ToJson } from "~/utils/base64-to-json"
import { createSignature } from "~/utils/create-signature"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const data = formData.get("data") as string
    const signature = formData.get("signature") as string

    console.log("req:", request)
    // console.log("signature:", signature)

    const isSignatureValid = createSignature(data) === signature

    if (isSignatureValid) {
      const dataObject = base64ToJson(data)
      console.log("dataObject:", dataObject)

      const url = new URL(
        `/${dataObject.order_id}/checkout`,
        "https://pay.vitalab.com.ua"
      )
      // const url = `https://pay.vitalab.com.ua/${dataObject.order_id}/checkout?status=${dataObject.status}`

      // Add ?from=/incoming-url to the /login URL
      url.searchParams.set("status", dataObject.status)

      // And redirect to the new URL
      return NextResponse.redirect(url, { status: 302 })
    }

    console.log("wrong signature")
    return new Response("ok", { status: 200 })
  } catch (error) {
    console.log("error:", error)

    return new Response("error", { status: 500 })
  }
}
