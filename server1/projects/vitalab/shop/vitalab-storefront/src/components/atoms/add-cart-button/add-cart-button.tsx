import { useState } from "react"
import { medusaClient } from "@lib/config"
import { useStore } from "@lib/context/store-context"
import { api } from "@utils/api"
import { Loader2 } from "lucide-react"
import { useCart } from "medusa-react"

const Button = ({ children, loading = false, ...props }) => (
  <button
    className="group inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-700 py-1.5 text-[15px] font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-gray-600"
    {...props}
  >
    {!loading ? children : <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
  </button>
)

export function AddCartButton({ id }: { id: string }) {
  const { cart, setCart } = useCart()
  const [loading, setLoading] = useState(false)
  const { storeCart } = useStore()
  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      setLoading(false)
      // timedOpen();
    },
  })
  
  const { data, isLoading } = api.product.getById.useQuery({ id })

  if (!cart?.id) {
    return <div>error</div>
  }

  const inCart = cart?.items.some((item) => item.variant.product.id === id)

  if (isLoading || data === undefined) {
    return <div>loading...</div>
  }

  return !inCart ? (
    <Button
      loading={mutation.isLoading}
      disabled={loading}
      onClick={() => {
        console.log("test")
        setLoading(true)
        mutation.mutate({
          cartId: cart?.id,
          manipulationId: data?.metadata?.manipulation_id,
          variantId: data.variants[0].id,
        })
      }}
    >
      Замовити
    </Button>
  ) : (
    <Button disabled>У кошику</Button>
  )
}
