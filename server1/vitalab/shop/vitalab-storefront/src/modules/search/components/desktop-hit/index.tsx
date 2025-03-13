import { useState } from "react"
import { useRouter } from "next/router"
import { useToast } from "@hooks/use-toast"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { useModal } from "@lib/context/modal-context"
import { useStore } from "@lib/context/store-context"
import Medusa from "@medusajs/medusa-js"
import Hit, { HitProps } from "@modules/search/components/hit"
import { api } from "@utils/api"
import { useCart } from "medusa-react"

const DesktopHit = ({ hit, isDisabled, setIsDisabled, close }: HitProps) => {
  // const { close } = useModal()
  const { storeCart } = useStore()
  const { cart, setCart } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      toast({
        // title: `${hit.title}`,
        description: (
          <>
            <span className="font-semibold">{hit.title}</span> додано до кошика.
          </>
        ),
      })
      setLoading(false)
      setIsDisabled(false)
      // timedOpen();
      close()
    },
  })

  const add = async () => {
    const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
    const { product } = await medusa.products.retrieve(hit.id)
    // push(`/products/${hit.handle}`)

    if (product.status === "draft") {
      toast({
        description: (
          <>
            <span>Це дослідження не можна замовити.</span>
          </>
        ),
      })
      return
    }

    setLoading(true)
    setIsDisabled(true)
    mutation.mutate({
      cartId: cart?.id,
      manipulationId: product.metadata.manipulation_id,
      variantId: product.variants[0].id,
    })
  }

  const inCart = cart?.items.some((item) => item.variant.product.id === hit.id)

  return (
    <div
      className="group w-full text-left"
      // onClick={add}
      // disabled={isDisabled || inCart}
    >
      <Hit
        hit={hit}
        loading={loading}
        inCart={inCart}
        addToCart={add}
        disabled={isDisabled}
        close={close}
      />
    </div>
  )
}

export default DesktopHit
