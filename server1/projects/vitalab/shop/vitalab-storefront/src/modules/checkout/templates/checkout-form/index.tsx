import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Shipping from "@modules/checkout/components/shipping"
import Laboratory from "features/checkout/laboratory/laboratory"
import { useCart } from "medusa-react"

const CheckoutForm = () => {
  const { cart } = useCart()

  if (!cart?.id) {
    return null
  }

  return (
    <div className="">
      <div className="grid w-full grid-cols-1 gap-y-8 p-6 text-slate-900">
        <div>
          <Addresses />
        </div>

        <div>
          {/* <Shipping cart={cart} /> */}
          <Laboratory cart={cart} />
        </div>

        <div>
          <Payment />
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
