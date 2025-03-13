import { useEffect } from "react"
import { useStore } from "@lib/context/store-context"
import DiscountCode from "@modules/checkout/components/discount-code"
import GiftCard from "@modules/checkout/components/gift-card"
import PaymentButton from "@modules/checkout/components/payment-button"
import CartTotals from "@modules/common/components/cart-totals"
import { api } from "@utils/api"
import { cn } from "@utils/cn"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import { Trash2 } from "lucide-react"
import { useCart } from "medusa-react"

const CheckoutSummary = () => {
  const { storeCart } = useStore()
  const { cart, setCart } = useCart()
  const mutation = api.cart.remove.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      // timedOpen();
    },
  })

  useEffect(() => {
    if (!cart?.id || !cart?.items?.length) return

    eCommerceCart({
      cardId: cart.id,
      event: "begin_checkout",
      data: {
        items: cart.items.map((item) => ({
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
  }, [cart])

  if (!cart?.id) {
    return null
  }

  // if (mutation.isLoading) return <div className="relative flex items-center justify-center rounded-r-md border-l border-gray-200 bg-gray-100 p-2">test</div>

  return (
    <div className="relative flex items-start justify-center rounded-r-md border-l border-gray-200 bg-gray-100 p-2">
      {/* <div className="relative w-full max-w-[246px]">test</div> */}
      <div className="flex w-full flex-col-reverse gap-y-8 lg:flex-col">
        <div className="flex w-full flex-col gap-y-6 rounded-lg border border-gray-200 bg-white p-4">
          {cart.items
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
              console.log("card item", item)
              return (
                <div
                  className={cn("border-gray-100 text-s", {
                    "border-b pb-6": index < cart.items.length - 1,
                  })}
                >
                  <div className="flex items-center">
                    <div className="flex font-semibold">{item.title}</div>
                  </div>
                  <div className="flex justify-between pt-1">
                    <div className="text-gray-500">
                      #{item.variant.product.mid_code}
                    </div>
                    {item.variant.product.metadata?.category?.code !== 14 ? (
                      <div className="flex items-center justify-end divide-x divide-gray-200">
                        <div className="flex gap-x-1 pr-2">
                          <span>{item.unit_price / 100} грн</span>
                        </div>
                        <div className="px-2">
                          <button
                            onClick={() => {
                              eCommerceCart({
                                event: "remove_from_cart",
                                cardId: cart?.id,
                                data: {
                                  items: [
                                    {
                                      item_name: item.title || "",
                                      item_id: item.variant.mid_code,
                                      price: (item.unit_price / 100).toFixed(2),
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
                            className="flex items-center"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-gray-900" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <span>{item.unit_price / 100} грн</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          <CartTotals cart={cart} />
          <PaymentButton paymentSession={cart?.payment_session} />
        </div>
        {/* <div className="p-6 bg-white">
        <DiscountCode cart={cart} />
      </div>
      <GiftCard cart={cart} /> */}
      </div>
    </div>
  )
}

export default CheckoutSummary
