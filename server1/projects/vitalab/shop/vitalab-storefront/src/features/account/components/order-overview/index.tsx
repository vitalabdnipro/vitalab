import React from "react"
import Link from "next/link"
// import { Button } from "@components/atoms/button"
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
  // const { orders, isLoading } = useCustomerOrders({
  //   limit: 50,
  //   offset: 0,
  //   fields: "display_id,metadata",
  // })

  // const xxx = medusaClient.customers
  //   .listOrders({ limit: 50, offset: 0 })
  //   .then(({ orders, limit, offset, count }) => {
  //     console.log("xxx", orders)
  //   })

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

          // <div key={o.id} className="flex flex-1 items-stretch">
          //   {/*  hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_24px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] */}
          //   <div className="flex min-h-[180px] w-full max-w-full flex-col justify-end rounded-[5px] bg-white pt-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-200">
          //     <div className="h mx-4 mt-2 flex flex-initial flex-col items-stretch justify-start gap-1 pb-3">
          //       <Text as="p" size="md" weight="semibold">
          //         #{55500000000 + o.display_id}
          //       </Text>
          //       <Text as="p" size="xs" weight="default">
          //         {new Date(o.created_at).toLocaleDateString("uk-UA", {
          //           year: "numeric",
          //           month: "long",
          //           day: "numeric",
          //         })}
          //       </Text>
          //       <div className="flex items-center"></div>
          //     </div>
          //     <div className="p-2">
          //       {/* <Button
          //         variant="outline"
          //         size="sm"
          //         className="w-full rounded-b-md bg-gray-50"
          //       >
          //         <span class="relative flex h-3 w-3">
          //           <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          //           <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          //         </span>
          //         результати
          //       </Button> */}
          //       {/* <button class="h-7.5 text-primary relative inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold leading-none text-neutral-800 shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.08),_0px_1px_0px_rgb(0_0_0_/_0.06),_0px_1px_2px_rgb(0_0_0_/_0.05),_0px_2px_4px_rgb(0_0_0_/_0.04),_0px_4px_8px_rgb(0_0_0_/_0.03),_0px_2px_12px_rgb(0_0_0_/_0.02),_inset_0px_1px_0px_rgb(255_255_255),_inset_0px_1px_0px_rgb(255_255_255_/_0.94),_inset_0px_0px_2px_1px_rgb(255_255_255)] [text-shadow:0px_1px_0px_rgb(255_255_255_/_0.8)] after:absolute after:inset-0 after:block after:rounded-md after:bg-gradient-to-t after:from-black/5 after:opacity-75 after:transition-opacity hover:after:opacity-100">
          //         <span class="relative flex h-3 w-3">
          //           <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          //           <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          //         </span>
          //         результати
          //       </button> */}
          //       <a
          //         className="initial:border-none dark:bg-gray-750 group relative inline-flex h-8 w-full shrink-0 transform-gpu touch-none select-none items-center justify-center rounded-md bg-white px-4 text-[13.01px] font-semibold text-gray-900 shadow-[0px_1px_1px_-1px_rgb(0_0_0_/_0.08),_0px_2px_2px_-1px_rgb(0_0_0_/_0.08),_0px_0px_0px_1px_rgb(0_0_0_/_0.06),_inset_0px_1px_0px_#fff,_inset_0px_1px_2px_1px_#fff,_inset_0px_1px_2px_rgb(0_0_0_/_.06),_inset_0px_-4px_8px_-4px_rgb(0_0_0_/_0.04)] outline-none transition before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded before:bg-gradient-to-b before:from-white/[0.08] before:opacity-0 before:transition-opacity after:pointer-events-none after:absolute after:-inset-[3px] after:rounded-lg after:border after:border-blue-500 after:opacity-0 after:ring-2 after:ring-blue-500/20 after:transition-opacity hover:before:opacity-100 focus:!outline-none focus:!ring-0 focus-visible:after:opacity-100 active:!outline-none active:!ring-0 active:after:opacity-0 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-50 dark:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_2px_2px_-1px_rgb(0_0_0_/_0.12),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)] dark:hover:before:opacity-50 [&>span]:drop-shadow-[0px_1px_0px_rgb(255_255_255)] dark:[&>span]:drop-shadow-[0px_1px_1px_rgb(0_0_0_/_0.6)]"
          //         data-state="closed"
          //         href="https://auth.campsite.design/sign-in"
          //       >
          //         <span className="relative z-[2] flex items-center gap-1.5">
          //           <span class="relative flex h-3 w-3">
          //             <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          //             <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          //           </span>
          //           результати
          //         </span>
          //       </a>
          //     </div>
          //   </div>
          // </div>
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
