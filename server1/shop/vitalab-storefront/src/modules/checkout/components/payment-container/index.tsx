import React from "react"
import { useCheckout } from "@lib/context/checkout-context"
import type { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"

import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  liqpay: {
    title: "Онлайн оплата",
    description: "Visa / MasterCard",
  },
  manual: {
    title: "Оплата у пункті забору біоматеріалу",
    description: "Оплата готівкою або карткою у пункті забору біоматеріалу",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  console.log(paymentSession.provider_id)
  return (
    <div
      className={clsx(
        "flex flex-col gap-y-4 border-b border-gray-200 last:border-b-0",
        {
          "bg-gray-50": selected,
        }
      )}
    >
      <button
        className={"grid grid-cols-[12px_1fr] gap-x-4 px-8 py-4"}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3 className="text-base-semi leading-none text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="text-small-regular mt-2 text-gray-700">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
          {selected && (
            <div className="mt-4 w-full">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  const { onPaymentCompleted } = useCheckout()
  console.log("1", onPaymentCompleted)
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pr-7 pt-8">
          <PaymentStripe />
        </div>
      )
    case "liqpay":
      return null
    case "manual":
      // We only display the test payment form if we are in a development environment
      // return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
      return null
    default:
      return null
  }
}

export default PaymentContainer
