import React, { useEffect, useState } from "react"
import { medusaClient } from "@lib/config"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { Address, Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import { useQuery } from "@tanstack/react-query"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import { MapPin, Pin, PinIcon } from "lucide-react"
import { useCart, useUpdateCart } from "medusa-react"
import labs from "../../../../data/order_labs.json"

type OrderCompletedTemplateProps = {
  order: Order
}


const Location = ({ cart }) => {
  const location = labs[cart?.metadata?.laboratory - 1]
  return (
    <div className="flex items-center">
      <div>
        <MapPin className="mr-2 h-8 w-8" />
      </div>
      <div className="text-sm">
        {/* Чекаємо на Вас за адресою: */}
        <div className="font-semibold">{location?.label}</div>
        <div className="text-xs leading-5">{location?.address}</div>
      </div>
    </div>
  )
}

const fetchCart = async (id: string) => {
  return await medusaClient.carts.retrieve(id).then(({ cart }) => cart)
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const updateCart = useUpdateCart(order.cart_id)
  const [showItems, setShowItems] = useState("")
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_cart", order.cart_id],
    () => fetchCart(order.cart_id)
  )
  const enrichedItems = useEnrichedLineItems(order.items, order.cart_id)

  console.log(data?.context, "data context")
  useEffect(() => {
    if (
      !order?.cart_id ||
      !enrichedItems?.length ||
      data?.context?.marketing ||
      isLoading
    ) {
      console.log("already updated", data?.context?.marketing)

      return
    }

    console.log("updating marketing")
    updateCart.mutate({
      context: {
        marketing: true,
      },
    })

    eCommerceCart({
      cardId: order.cart_id,
      event: "purchase",
      data: {
        transaction_id: 3330011000 + order.display_id, // Номер замовлення
        affiliation: "cart", // Значення cart, якщо замовлення з кошика
        value: (order.total / 100).toFixed(2), // Загальна сума замовлення. Розділення для копійок має бути у вигляді крапки
        tax: "0",
        shipping: "0",
        currency: "UAH",
        items: enrichedItems.map((item) => ({
          item_name: item.title,
          item_id: item.variant.product.mid_code,
          price: (item.unit_price / 100).toFixed(2),
          item_brand: "Vitalab",
          quantity: 1,
          ...transformCategories(
            item.variant.product.metadata?.category_tree as any
          ),
        })),
      },
    })
  }, [order.cart_id, enrichedItems, data?.context?.marketing, isLoading])

  return (
    <div className="">
      <OrderDetails
        order={order}
        showItems={showItems}
        setShowItems={setShowItems}
      />
      <Items order={order} cartId={order.cart_id} showItems={showItems} />
      <div className="grid p-4">
        <Location cart={data} />
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
