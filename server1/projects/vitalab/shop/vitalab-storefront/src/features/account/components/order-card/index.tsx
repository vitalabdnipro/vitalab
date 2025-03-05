import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/atoms/accordion"
import { Button } from "@components/atoms/button"
import { Text } from "@components/atoms/text"
import * as Tooltip from "@components/atoms/tooltip"
import { useModal } from "@hooks/use-modal"
import type { Order } from "@medusajs/medusa"
import { api } from "@utils/api"
import { Eye, Info, InfoIcon } from "lucide-react"
// import Button from "@modules/common/components/button"
import { formatAmount } from "medusa-react"

import { OrderStatus } from "../order-status"
import { OrderStatusDot } from "../order-status-dot"
import { OrderCardInfoModal } from "./order-card-info-modal"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { data, isLoading } = api.order.get.useQuery({
    id: (3330011000 + order.display_id).toString(),
  })
  //const [ ready, setReady ] = useState(false)
  const [active, open, close] = useModal()

  // const numberOfLines = useMemo(() => {
  //   return order.items
  //     .filter((item) => item.variant.product?.metadata.category.code !== 14)
  //     .reduce((acc, item) => {
  //       return acc + item.quantity
  //     }, 0)
  // }, [order])

  // const numberOfProducts = useMemo(() => {
  //   return order.items.length
  // }, [order])

  // if (!data) {
  //   return <div>Error...</div>
  // }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data?.status === "failed") {
    return null
    return (
      <div className="relative flex min-h-[180px] w-full max-w-full flex-col justify-end rounded-[5px] bg-white pt-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-200">
        <div className="h mx-4 mt-2 flex flex-initial flex-col items-stretch justify-start gap-1 pb-3">
          <div className="flex items-center">
            <Text as="p" size="md" weight="semibold">
              #{3330011000 + order.display_id}
            </Text>
            {/* <Info className="ml-2 h-4 w-4" /> */}
          </div>
          <div className="flex items-center text-sm text-red-500">
            <InfoIcon className="mr-2 h-5 w-5" />
            Замовлення не знайдено
          </div>
        </div>
      </div>
    )
  }

  if (!data?.data[0]) {
    return <div>Not found</div>
  }

  // const isReady = data.data[0].forms.every(
  //   (form: any) => form.status === "created"
  // )
  
  const isReady = data.data[0].forms
    .filter((f: any) => f.name !== "Без бланка")
    .every((form: any) => form.status === "created")

  return (
    <div className="relative flex flex-1 items-stretch">
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={300}>
          <Tooltip.Trigger asChild>
            <OrderStatusDot
              state={isReady ? "ready" : "processing"}
              className="left-2 top-2 z-10"
            />
          </Tooltip.Trigger>
          <Tooltip.Content>
            Статуc:{" "}
            <span className="">
              {isReady ? "Дослідження готове" : "Дослідження обробляється"}
            </span>
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
      <Info
        onClick={open}
        className="absolute right-2 top-2 z-10 h-4 w-4 hover:opacity-40"
      />
      <div className="relative flex min-h-[180px] w-full max-w-full flex-col justify-end rounded-[5px] bg-white pt-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-200">
        <div className="h mx-4 mt-2 flex flex-initial flex-col items-stretch justify-start gap-1 pb-3">
          <div className="flex items-center">
            <Text as="p" size="md" weight="semibold">
              #{3330011000 + order.display_id}
            </Text>
            {/* <Info className="ml-2 h-4 w-4" /> */}
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Text as="p" size="xs" weight="default">
              {new Date(order.created_at).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
            {/* <div className="text-xs">{order.total / 100} грн</div> */}
            <div className="flex items-center text-xs">
              {/* дослідження
              {`${numberOfLines} ${numberOfLines > 1 ? "аналізів" : "аналіз"}`} */}
            </div>
          </div>
          <div className="flex items-center"></div>
        </div>
        <div className="relative flex min-h-[57px] items-center justify-between gap-3 rounded-b-[5px] border-t bg-gray-50 px-3">
          {/* <Button variant="ghost" size="sm" >
              Видалити
            </Button> */}
          <OrderStatus order={data} isReady={isReady} />
          {/* <AddProfileModal active={active} onClickOutside={close} /> */}
        </div>
      </div>
      <OrderCardInfoModal active={active} close={close} order={order} />
    </div>
  )
}

export default OrderCard
