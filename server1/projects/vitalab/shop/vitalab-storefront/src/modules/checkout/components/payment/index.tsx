import { useCheckout } from "@lib/context/checkout-context"
import Spinner from "@modules/common/icons/spinner"
import { useEffect } from "react"
import PaymentContainer from "../payment-container"
import StepContainer from "../step-container"

const Payment = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: isSame },
  } = useCheckout()

  /**
   * Fallback if the payment session are not loaded properly we
   * retry to load them after a 5 second delay.
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (cart?.shipping_address && cart?.payment_sessions) {
      timeout = setTimeout(() => {
        initPayment()
      }, 5000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <StepContainer
      title="Вибір способу оплати"
      index={3}
      closedState={
        <div className="text-small-regular pb-8 pt-2">
          <p>Для вибору способу оплати, необхідно спочатку заповнити Ваші дані.</p>
        </div>
      }
    >
      <div>
        {cart?.payment_sessions?.length ? (
          cart.payment_sessions
            .sort((a, b) => {
              return a.provider_id > b.provider_id ? 1 : -1
            })
            .map((paymentSession) => {
              return (
                <PaymentContainer
                  paymentSession={paymentSession}
                  key={paymentSession.id}
                  selected={
                    cart?.payment_session?.provider_id ===
                    paymentSession.provider_id
                  }
                  setSelected={() =>
                    setPaymentSession(paymentSession.provider_id)
                  }
                />
              )
            })
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
            <Spinner />
          </div>
        )}
      </div>
    </StepContainer>
  )
}

export default Payment
