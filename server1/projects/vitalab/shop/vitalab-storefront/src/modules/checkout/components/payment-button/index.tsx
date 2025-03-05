import crypto from "crypto"
import React, { useEffect, useState } from "react"
// import Button from "@modules/common/components/button"
import { Button } from "@components/atoms/button"
import { useCheckout } from "@lib/context/checkout-context"
import type { Order, PaymentSession } from "@medusajs/medusa"
import Spinner from "@modules/common/icons/spinner"
import type { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { jsonToBase64 } from "@utils/json-to-base64"
import { useCart, useMeCustomer } from "medusa-react"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { customer, isLoading } = useMeCustomer()
  const { cart } = useCart()

  console.log("cart:", cart)
  useEffect(() => {
    setNotReady(true)

    if (!cart) {
      return
    }

    if (!customer) {
      return
    }

    if (
      cart.metadata?.laboratory === undefined ||
      Number(cart.metadata.laboratory) === 0
    ) {
      return
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      )
    case "manual":
      return <ManualTestPaymentButton notReady={notReady} />
    case "liqpay":
      return <LiqpayPaymentButton notReady={notReady} />
    case "paypal":
      return (
        <PayPalPaymentButton notReady={notReady} session={paymentSession} />
      )
    default:
      return <Button disabled>Оформити замовлення</Button>
  }
}

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("cardNumber")

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address.first_name +
              " " +
              cart.billing_address.last_name,
            address: {
              city: cart.billing_address.city ?? undefined,
              country: cart.billing_address.country_code ?? undefined,
              line1: cart.billing_address.address_1 ?? undefined,
              line2: cart.billing_address.address_2 ?? undefined,
              postal_code: cart.billing_address.postal_code ?? undefined,
              state: cart.billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={submitting || disabled || notReady}
        onClick={handlePayment}
      >
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
      {errorMessage && (
        <div className="text-small-regular mt-2 text-red-500">
          {errorMessage}
        </div>
      )}
    </>
  )
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: cart?.region.currency_code.toUpperCase(),
        intent: "authorize",
      }}
    >
      {errorMessage && (
        <span className="mt-4 text-rose-500">{errorMessage}</span>
      )}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async () => session.data.id as string}
        onApprove={handlePayment}
        disabled={notReady || submitting}
      />
    </PayPalScriptProvider>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted } = useCheckout()

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? <Spinner /> : "Оформити замовлення"}
    </Button>
  )
}

const LiqpayPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompletedTest } = useCheckout()

  // sandbox_i97454434667
  // sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP

  const handlePayment = async () => {
    setSubmitting(true)

    const order: Order = await onPaymentCompletedTest()
    console.log("dat", order)

    setSubmitting(false)

    const jsonString = {
      // public_key: "sandbox_i97454434667",
      public_key: "i11466114070",
      version: "3",
      action: "pay",
      amount: order.paid_total / 100,
      currency: "UAH",
      description: `#${3330011000 + order.display_id}`,
      order_id: order.id,
      language: "uk",
      result_url:
        "https://api.vitalab.com.ua/liqpay?apiKey=pk_01H111QK2FNA1E4P6BJR1S2BQR",
      server_url:
        "https://api.vitalab.com.ua/liqpay/callback?apiKey=pk_01H111QK2FNA1E4P6BJR1S2BQR",
      product_description: "test p desc",
      // ...props,
    }

    const data = jsonToBase64(JSON.stringify(jsonString))
    const signString =
      "t8goNd6c0S6pVmhEW2Sa2gJPMQDmD4KLxaHMWX3D" +
      data +
      "t8goNd6c0S6pVmhEW2Sa2gJPMQDmD4KLxaHMWX3D"
    const sha1 = crypto.createHash("sha1")
    sha1.update(signString)
    const signature = sha1.digest("base64")

    const formData = new FormData()
    formData.append("data", data)
    formData.append("signature", signature)

    console.log("data", data)
    console.log("signature", signature)

    // Create a new form element
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://www.liqpay.ua/api/3/checkout"

    // Add the form data as hidden input fields
    for (const [name, value] of formData.entries()) {
      console.log("value", value)
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = name
      input.value = String(value)
      form.appendChild(input)
    }

    // Append the form to the document body and submit it
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? <Spinner /> : "Перейти до оплати"}
    </Button>
  )
}

export default PaymentButton
