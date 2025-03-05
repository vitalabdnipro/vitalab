import crypto from "crypto"
import { NextResponse } from "next/server"

import { base64ToJson } from "~/utils/base64-to-json"
import { createSignature } from "~/utils/create-signature"

// interface SubscribeRequest extends NextApiRequest {
//   body: {
//     data?: string
//   }
// }

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const data = formData.get("data") as string
    const signature = formData.get("signature") as string

    const isSignatureValid = createSignature(data) === signature

    if (isSignatureValid) {
      const dataObject = base64ToJson(data)

      console.log("dataObject:", dataObject)

      // return NextResponse.redirect(`/success?id=${id}`)
    }

    return new Response("ok", { status: 200 })
  } catch (error) {
    console.log("error:", error)

    return new Response("error", { status: 500 })
  }

  // console.log(formData)

  // const data = formData.get("data")
  // const signature = formData.get("signature")

  // const decodedData = Buffer.from(testData, "base64").toString("utf-8")

  // const dataObject = JSON.parse(decodedData)
  // console.log("dataObject:", dataObject)

  // const data = request.body.data
  // console.log("data", data)
  // console.log("signature", signature)

  // const { searchParams } = new URL(request.url)
  // const data = searchParams.get("data")
  // const signature = searchParams.get("signature")
  // console.log("data server:", data)
  // console.log("signature server:", signature)

  // return NextResponse.json({ res })
  //   const res = await request.json()
  //   return NextResponse.json({ res })
  //   return NextResponse.redirect(`/success?id=${id}`)
  //   return NextResponse.redirect(`/success?id=${id}`)
}
