import { NextResponse } from "next/server"
import dayjs from "dayjs"

import { transporter } from "~/lib/nodemailer"
import { base64ToJson } from "~/utils/base64-to-json"
import { createSignature } from "~/utils/create-signature"

export async function POST(request: Request) {
  try {
    return NextResponse.redirect("http://localhost:3000/test", { status: 302 })
  } catch (error) {
    console.error("Error:", error)
  }
  //   return NextResponse.redirect("https://pay.vitalab.com.ua")
  //   return Response.redirect("https://pay.vitalab.com.ua", 302)
}

//   try {
//     // const url = new URL(`/${dataObject.order_id}/checkout`, "https://pay.vitalab.com.ua")
//     const url = `https://pay.vitalab.com.ua`

//     // Add ?from=/incoming-url to the /login URL
//     // url.searchParams.set("status", dataObject.status)

//     // And redirect to the new URL
//     console.log("test")
//     // return NextResponse.redirect(new URL("https://pay.vitalab.com.ua"))
//   } catch (error) {
//     console.log("error111:", error)

//     return new Response("error1111333", { status: 500 })
//   }
// }
