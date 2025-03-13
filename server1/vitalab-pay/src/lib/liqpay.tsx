import crypto from "crypto"
import React from "react"

import { jsonToBase64 } from "~/utils/json-to-base64"
import { Button } from "~/components/ui/button"

interface LiqPayProps {
  publicKey: string
  privateKey: string
  amount: number
  description: string
  orderId: string
  title?: string
  style?: object
  disabled?: boolean
  productDescription?: string
}

export const LiqPayPay: React.FC<LiqPayProps> = ({
  publicKey,
  privateKey,
  amount,
  currency,
  description = "test",
  orderId,
  title = "Payment",
  disabled,
  serverUrl,
  resultUrl,
  productDescription,
  ...props
}: LiqPayProps & Record<string, any>) => {
  const jsonString = {
    public_key: publicKey,
    version: "3",
    action: "pay",
    amount: amount,
    currency: "UAH",
    description: description,
    order_id: orderId,
    language: "uk",
    result_url: process.env.LIQPAY_RESULT_URL,
    server_url: process.env.LIQPAY_SERVER_URL,
    product_description: productDescription,
    ...props,
  }

  const data = jsonToBase64(JSON.stringify(jsonString))
  const signString = privateKey + data + privateKey
  const sha1 = crypto.createHash("sha1")
  sha1.update(signString)
  const signature = sha1.digest("base64")

  console.log("data",data)
  console.log("signature", signature)
  return (
    <form
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      acceptCharset="utf-8"
      className="flex w-full justify-center sm:justify-end"
    >
      <input type="hidden" name="data" value={data} />
      <input type="hidden" name="signature" value={signature} />
      {/* <input type="hidden" name="language" value="ru" /> */}

      <Button className="">{title}</Button>
    </form>
  )
}
