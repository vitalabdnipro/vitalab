import React from "react"
import Link from "next/link"
import { Text } from "@components/atoms/text/text"
import { Button } from "@components/v2/button"
import OrderCard from "@features/account/components/order-card"
import { useCustomerOrdersWithKey } from "@hooks/use-customer-orders-with-key"
import { medusaClient } from "@lib/config"
import Spinner from "@modules/common/icons/spinner"
import { useQuery } from "@tanstack/react-query"
import { useCustomerOrders } from "medusa-react"

import { OrderStatusDot } from "../order-status-dot"

const fetchOrdersList = async (offset: number) =>
  await medusaClient.customers.listOrders({
    limit: offset,
    offset: 0,
    fields: "display_id,metadata",
    expand: "items,shipping_address",
  })

const OrderOverview = () => {
  const [offset, setOffset] = React.useState(5)
  // const { orders, isLoading, setOffset, key } = useCustomerOrdersWithKey()

  const handleOffsetChange = () => {
    // Update the offset state by incrementing it by 5
    console.log("offset", offset)
    setOffset(offset + 5)
  }

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_orders_list", offset],
    () => fetchOrdersList(offset)
  )

  console.log("data", data)

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-12 text-gray-900">
        <Spinner size={36} />
      </div>
    )
  }

  if (data?.orders?.length) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {/* <button onClick={handleOffsetChange}>test</button> */}
        {data.orders.map((o) => (
          <OrderCard order={o} />
        ))}
        <div className="mx-auto mt-10 md:col-span-1 md:col-start-2">
          <Button asChild>
            <Link href="/analyzes/11">Замовити дослідження</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-y-4">
      <p className="text-base-regular">У вас ще немає замовлень</p>
      <div className="mt-4">
        <Button asChild>
          <Link href="/analyzes/11">Замовити дослідження</Link>
        </Button>
      </div>
    </div>
  )
}

export default OrderOverview
