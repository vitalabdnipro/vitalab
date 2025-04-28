import { useEffect, type ReactElement } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ItemsTable } from "@components/cart"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import { Button } from "@components/v2/button"
import { medusaClient } from "@lib/config"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem } from "@medusajs/medusa"
import CheckoutTemplate from "@modules/checkout/templates"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"

const Cart = () => {
  let { cart } = useCart()
  const items = useEnrichedLineItems()
  const router = useRouter()

  if (!cart || !cart?.id?.length) {
    return
  }

  const updateCartItem = async (item: LineItem) => {
    try {
      if (cart?.id && item.quantity > 1) {
        console.log("item quantity:", item.quantity)

        cart = await medusaClient.carts.lineItems
          .update(cart.id, item.id, {
            quantity: 1,
          })
          .then(({ cart }) => cart)
          
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating cart item:", error)
    }
  }

  const updateCartItems = async () => {
    if (cart?.items) {
      for (const item of cart.items) {
        await updateCartItem(item)
      }
    }
  }

  updateCartItems()

  return (
    <Section>
      <div className="pb-20">
        <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
            } as React.CSSProperties
          }
        >
          <Breadcrumbs title="Кошик" />
          {cart.items.length ? (
            <CheckoutTemplate data={items} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="text-center md:col-span-2 md:col-start-2">
                <h2 className="mb-4 text-xl">Кошик порожній</h2>
                <Button className="mt-2" asChild>
                  <Link href="/analyzes/11">Замовити дослідження</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

Cart.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Cart

