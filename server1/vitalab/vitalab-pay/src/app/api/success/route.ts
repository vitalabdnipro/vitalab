import { NextResponse } from "next/server"
import dayjs from "dayjs"

import { transporter } from "~/lib/nodemailer"
import { base64ToJson } from "~/utils/base64-to-json"
import { createSignature } from "~/utils/create-signature"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const data = formData.get("data") as string
    const signature = formData.get("signature") as string

    const isSignatureValid = createSignature(data) === signature

    if (isSignatureValid) {
      const dataObject = base64ToJson(data)

      console.log("dataObject:", dataObject)

      const res = await transporter.sendMail({
        from: "pay@vitalab.com.ua",
        to: "info@vitalab.com.ua",
        subject: `Оплата замовлення #${dataObject.order_id} (pay.vitalab.com.ua)`,
        text: "_",
        html: `<div>
          <p>Оплата liqpay</p>
          <p><strong>Статус оплати:</strong> ${dataObject.status}</p>
          <p><strong>Номер замовлення:</strong> ${dataObject.order_id}</p>
          <p><strong>Сума:</strong> ${dataObject.amount} грн</p>
          <p><strong>Дата оплати:</strong> ${dayjs(dataObject.end_date).format(
            "DD.MM.YYYY HH:mm"
          )}</p>          
        </div>`,
      })

      console.log("res:", res.messageId)
    } else {
      console.log("signature is not valid")
    }

    return new Response("ok", { status: 200 })
  } catch (error) {
    console.log("error:", error)

    return new Response("error", { status: 500 })
  }
}
