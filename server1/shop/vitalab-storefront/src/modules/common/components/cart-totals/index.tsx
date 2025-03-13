import React from "react"
import type { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const { discount_total, total } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="text-small-regular text-gray-700">
        {/* <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
          <span>Проміжний підсумок</span>
          <span>{getAmount(subtotal)}</span>
        </div> */}
        <div className="flex flex-col gap-y-1">
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Знижка</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {/* {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>Подарункова картка</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )} */}
          {/* <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(tax_total)}</span>
          </div> */}
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
        <div className="text-base-regular mb-2 flex items-center justify-between text-gray-900">
          <span>Всього</span>
          <span>{total / 100} грн</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotals
