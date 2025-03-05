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
      {/* <div className="relative grid min-h-[72px] w-full min-w-[100px] rounded-lg border bg-white shadow sm:grid-cols-2"> */}
      <Card className="mt-8 grid border bg-white sm:grid-cols-2 md:mt-0" shadow="medium">
        <CheckoutForm />
        <CheckoutSummary />
      </Card>
      {/* </div> */}
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
