import { Fragment, useMemo } from "react"
import Link from "next/link"
import { Card } from "@components/ui"
import { Button } from "@components/ui/button2"
import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { api } from "@utils/api"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import { formatAmount, useCart } from "medusa-react"
import type { CalculatedVariant } from "types/medusa"

const CartDropdown = () => {
  const { cart, setCart } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem, countAnalysis, storeCart } = useStore()
  const { state, open, close } = useCartDropdown()
  const mutation = api.cart.remove.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      // timedOpen();
    },
  })
  // const totalItems = useMemo(() => countAnalysis(cart.items), [cart.items])

  let totalItems = 0

  if (cart && cart.items.length) {
    totalItems = countAnalysis(cart.items)
  }

  console.log(items)
  // function customComparator(a, b) {
  //   if (a.includes("14") && !b.includes("14")) {
  //     return 1
  //   } else if (!a.includes("14") && b.includes("14")) {
  //     return -1
  //   } else {
  //     return a.localeCompare(b)
  //   }
  // }

  return (
    <div
      className="z-50 hidden h-full md:flex"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {/* {console.dir(cart)} */}
      <Popover className="relative h-full">
        {/* <Link href="/cart" passHref>
          <Popover.Button
            as={"div"}
            className="h-full"
          >{`My Bag (${totalItems})`}</Popover.Button>
        </Link> */}

        <Popover.Button className="h-full">
          {/* rgba(66, 71, 112, 0.06) */}
          <Card className="h-[56px] !min-h-full max-w-[290px] cursor-pointer rounded-lg bg-white shadow-[0_0_0_1px_rgb(229,231,235)] transition ease-hover hover:shadow-card-small">
            {/* <div className="grid py-2 px-6 text-s">
                <div className="font-semibold">Оформити замовлення</div>
                <div>test</div>
              </div> */}
            <div className="relative flex items-center py-2 pl-4 pr-6 text-s">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                // className="h-6 w-6 after:absolute after:left-0 after:bottom-2 after:w-px after:bg-slate-900"
                className="mr-5 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
              <div className="text-right before:absolute before:inset-y-2 before:left-12 before:w-px before:bg-[rgba(66,71,112,0.06)]">
                <div className="font-semibold">Оформити замовлення</div>
                <div>
                  {totalItems === 1
                    ? `${totalItems} аналіз на `
                    : `${totalItems} аналізів на `}
                  {cart.total ? cart.total / 100 : 0} грн
                </div>
              </div>
            </div>
          </Card>
        </Popover.Button>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute left-1/2 z-10 mt-3 hidden w-[400px] -translate-x-1/2 rounded-lg bg-white text-gray-900 shadow-card-medium after:absolute after:-top-3 after:h-0 after:w-full after:border-[6px] after:border-transparent sm:block"
          >
            {/* <div className="flex items-center justify-center p-4">
              <h3 className="text-large-semi">Shopping Bag</h3>
            </div> */}
            {/* {console.log("items",items)} */}
            {cart && items?.length ? (
              <>
                <div className="no-scrollbar mt-4 grid max-h-[402px] grid-cols-1 gap-y-6 overflow-y-scroll px-4">
                  {items
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
                    .map((item) => (
                      <div
                        className="grid grid-cols-[1fr_100px] gap-x-2 border-b border-dashed pb-6 text-s"
                        key={item.id}
                      >
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="mr-4 w-[220px] overflow-hidden text-ellipsis text-s">
                                  {/* <Link
                                    href={`/products/${item.variant.product.handle}`}
                                  > */}
                                  {item.title}
                                  {/* </Link> */}
                                </h3>
                                <LineItemOptions variant={item.variant} />
                              </div>
                            </div>
                          </div>
                          <div className="text-small-regular flex flex-1 items-end justify-between">
                            <div></div>
                          </div>
                        </div>
                        <div className="w-[100px]">
                          <div className="flex items-center justify-end divide-x">
                            <div className="flex items-center">
                              {/* {item.variant.product.metadata?.category?.code !==
                                464 && (
                                <span className="mr-1">{item.quantity} x</span>
                              )} */}
                              <LineItemPrice
                                region={cart.region}
                                variant={item.variant as CalculatedVariant}
                                quantity={item.quantity}
                                style="tight"
                              />
                            </div>
                            {item.variant.product.metadata?.category?.code !==
                            14 ? (
                              <button
                                className="ml-2 flex items-center gap-x-1 pl-1 text-gray-500"
                                // onClick={() => deleteItem(item.id)}
                                onClick={() => {
                                  eCommerceCart({
                                    event: "remove_from_cart",
                                    cardId: cart?.id,
                                    data: {
                                      items: [
                                        {
                                          item_name: item.title || "",
                                          item_id: item.variant.mid_code,
                                          price: (
                                            item.variant.calculated_price / 100
                                          ).toFixed(2),
                                          item_brand: "Vitalab",
                                          quantity: 1,
                                          ...transformCategories(
                                            item.variant.product.metadata
                                              ?.category_tree as any
                                          ),
                                        },
                                      ],
                                    },
                                  })

                                  mutation.mutate({
                                    cartId: cart?.id,
                                    lineId: item.id,
                                  })
                                }}
                              >
                                <Trash
                                  size={14}
                                  className="text-black opacity-60 transition hover:opacity-100"
                                />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Підсумок{" "}
                    </span>
                    <span className="text-base font-semibold">
                      {cart.subtotal / 100 || 0} грн
                    </span>
                  </div>

                  <Link
                    href="/cart"
                    // className="border-brand-color bg-brand-color relative inline-flex h-10 w-full max-w-full cursor-pointer items-center justify-center rounded-[5px] border px-3 font-medium text-white transition hover:bg-transparent hover:text-black"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100"
                    onClick={close}
                  >
                    Оформити замовлення
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center gap-y-4 py-4">
                  {/* <div className="text-small-regular flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
                    <span>0</span>
                  </div> */}
                  <span>Кошик порожній</span>
                  <div>
                    {/* <Link href="/analyzes/1318">
                      <span className="sr-only">Go to all products page</span>
                      <Button onClick={close}>Explore products</Button>
                    </Link> */}
                    <Link
                      href="/analyzes/11"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100"
                      // className="border-brand-color bg-brand-color relative inline-flex h-10 w-full max-w-full cursor-pointer items-center justify-center rounded-[5px] border px-3 font-medium text-white transition hover:bg-transparent hover:text-black"
                      onClick={close}
                    >
                      До каталогу
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
