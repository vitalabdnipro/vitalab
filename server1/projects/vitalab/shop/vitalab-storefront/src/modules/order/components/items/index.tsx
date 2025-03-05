import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/atoms/accordion"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import type { Order } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { cn } from "@utils/cn"
import type { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  order: Order
  cartId: string
  openItems?: string
}

const Items = ({ order, cartId, showItems }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(order.items, cartId)

  return (
    <div
      className={cn("flex flex-col gap-y-2 border-gray-200 px-4 pb-0", {
        "border-b": showItems === "item-1",
      })}
    >
      <Accordion
        type="single"
        collapsible
        className="border-none"
        value={showItems}
        // onValueChange={setValue}
      >
        <AccordionItem value="item-1" className="border-none">
          <AccordionContent>
            <>
              {enrichedItems?.length
                ? enrichedItems
                    .sort((a, b) => {
                      // return a.created_at > b.created_at ? -1 : 1
                      if (
                        a.variant.product.metadata?.category?.code === 14 &&
                        b.variant.product.metadata?.category?.code !== 14
                      ) {
                        return 1
                      } else if (
                        a.variant.product.metadata?.category?.code !== 14 &&
                        b.variant.product.metadata?.category?.code === 14
                      ) {
                        return -1
                      } else {
                        return a.created_at > b.created_at ? -1 : 1
                      }
                    })
                    .map((item, index) => {
                      return (
                        <div className="grid gap-x-4 pt-4" key={item.id}>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex flex-1 flex-col text-s">
                              <div className="grid">
                                <div>
                                  <div className="mr-4 overflow-hidden text-ellipsis text-s">
                                    {/* {item.variant.product.mid_code} */}
                                    <span className="font-normal text-gray-400">
                                      {index + 1}.
                                    </span>{" "}
                                    {item.title}
                                  </div>
                                  <LineItemOptions variant={item.variant} />
                                  {/* <span>Quantity: {item.quantity}</span> */}
                                </div>
                                {/* <div className="whitespace-nowrap">
                              <LineItemPrice
                                quantity={item.quantity}
                                region={region}
                                variant={item.variant as CalculatedVariant}
                              />
                            </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                : Array.from(Array(order.items.length).keys()).map((i) => {
                    return <SkeletonLineItem key={i} />
                  })}
              <div className="ml-auto mt-4 flex w-40 flex-col">
                <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
                <div className="text-base-regular mb-2 flex items-center justify-between text-gray-900">
                  <span>Всього:</span>
                  <span>{order.total / 100} грн</span>
                  {/* <span>{getAmount(order.total)}</span> */}
                </div>
              </div>
            </>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Items
