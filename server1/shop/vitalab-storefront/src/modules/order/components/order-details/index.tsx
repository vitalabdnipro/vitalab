import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/atoms/accordion"
import { Order } from "@medusajs/medusa"
import { cn } from "@utils/cn"
import { ChevronDown, ChevronUp } from "lucide-react"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({
  order,
  showStatus,
  showItems,
  setShowItems,
}: OrderDetailsProps) => {
  // const items = order.items
  //   .filter((item) => item.variant.product.metadata.category.code !== 14)
  //   .reduce((acc, i) => acc + i.quantity, 0)

  const formatStatus = (str: string) => {
    // const formatted = str.split("_").join(" ")
    // return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="border-b p-4">
      <span className="text-sm text-gray-700">
        Дякуємо, ваше замовлення було успішно опрацьовано!
      </span>
      <h1 className="text-2xl-semi mt-2 uppercase">
        #{3330011000 + order.display_id}
      </h1>
      <span className="text-xs text-gray-400">
        {order.id.split("order_")[1]}
      </span>
      <div className="text-small-regular mt-4 flex items-center divide-x text-gray-700">
        <span className="pr-2">
          {new Date(order.created_at).toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <button
          className="flex px-2"
          onClick={() => setShowItems(showItems === "" ? "item-1" : "")}
        >
          {/* {`${items} ${items !== 1 ? "аналізів" : "аналіз"}`} */}
          дослідження
          <ChevronUp
            className={cn(
              "ease-[cubic-bezier(0.87, 0, 0.13, 1)] ml-1 h-5 w-5 text-gray-400 transition-transform duration-300",
              { "rotate-180": showItems === "" }
            )}
          />
        </button>
        {order.payment_status === "captured" && (
          <span className="pl-2 font-semibold text-green-500">Оплачено</span>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
