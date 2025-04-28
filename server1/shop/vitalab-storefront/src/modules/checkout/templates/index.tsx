import { Card } from "@components/ui"
import { CheckoutProvider } from "@lib/context/checkout-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { useCart, useMeCustomer } from "medusa-react"

import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"

const CheckoutTemplate = (props) => {
  const { cart } = useCart()
  const items = useEnrichedLineItems()

  if (!cart || !cart?.id?.length) {
    return <div>loading...</div>
  }

  return (
    <CheckoutProvider>
      <CheckoutLoader />
      <Card className="mt-8 grid border bg-white sm:grid-cols-2 md:mt-0" shadow="medium">
        <CheckoutForm />
        <CheckoutSummary />
      </Card>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
