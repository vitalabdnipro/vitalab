import crypto from "crypto"
import { env } from "env.mjs"
import { CheckIcon, X } from "lucide-react"

import { cn } from "~/utils/cn"
import { jsonToBase64 } from "~/utils/json-to-base64"

const getOrder = async ({ id }) => {
  const requestData = {
    version: "3",
    public_key: env.LIQPAY_PUBLIC_KEY,
    action: "status",
    order_id: id,
  }

  const data = jsonToBase64(JSON.stringify(requestData))
  const signString = env.LIQPAY_PRIVATE_KEY + data + env.LIQPAY_PRIVATE_KEY
  const sha1 = crypto.createHash("sha1")
  sha1.update(signString)
  const signature = sha1.digest("base64")

  // Generate the signature
  //const data = Buffer.from(JSON.stringify(requestData)).toString("base64")
  //const signature = crypto
  // .createHmac("sha1", env.LIQPAY_PRIVATE_KEY)
  //  .update(data)
  //  .digest("base64")

  //   console.log(data)
  // Fetch order status from LiqPay
  const response = await fetch("https://www.liqpay.ua/api/request", {
    method: "POST",
    headers: {
      "Content-Type": "Content-Type': 'application/x-www-form-urlencoded",
      //Authorization: `Signature ${env.LIQPAY_PUBLIC_KEY}:${signature}`,
    },
    body: `data=${encodeURIComponent(data)}&signature=${encodeURIComponent(
      signature
    )}`,
  })

  //const status = await response.json()
  //console.log(status)

  return await response.json()
}

const Status = ({ id, status }) => {
  console.log(status)
  return (
    <div className="flex max-w-lg flex-col items-center rounded-md">
      <div
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full",
          {
            "bg-red-500/10": status === "failure" || status === "error" || status === undefined,
            "bg-emerald-500/10": status === "success",
          }
        )}
      >
        {status === "success" ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
            <CheckIcon className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
            <X className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-base">
          {status === "success"
            ? "Оплату підтверджено!"
            : "Помилка під час оплати!"}
        </h2>
        <h1 className="mt-2 text-xl font-semibold">Замовлення #{id}</h1>
      </div>
    </div>
  )
}

export default async function Checkout({ params, searchParams }) {
  // const status = searchParams.get("status")
  console.log("params:", searchParams.status === "")
  // const order = await getOrder(params.id)
  // console.log("status:", order)

  const id = params.id
  const status = searchParams.status

  return (
    <div className="geist-wrapper mt-16 flex items-center justify-center">
      <Status status={status} id={id} />
    </div>
  )
}
