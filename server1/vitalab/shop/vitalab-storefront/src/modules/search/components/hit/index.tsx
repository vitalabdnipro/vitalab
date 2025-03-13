import { Dispatch, SetStateAction } from "react"
import Link from "next/link"
import * as Modal from "@components/atoms/dialog"
import { Spinner } from "@components/atoms/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/molecules/dialog"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import {
  CheckBadgeIcon,
  CheckIcon,
  PlusIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid"
import type { ProductVariant } from "@medusajs/medusa"
import Thumbnail from "@modules/products/components/thumbnail"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import {
  CheckCircle2,
  Clock3Icon,
  Plus,
  PlusCircle,
  PlusCircleIcon,
  PlusSquare,
  X,
} from "lucide-react"
import { useCart, useProduct } from "medusa-react"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  collection_handle: string | null
  collection_id: string | null
  mid_code: string | null
  metadata: { manipulation_id: string }
  price: number
  days: string
}

export type HitProps = {
  hit: ProductHit
  loading: boolean
  inCart: boolean
  close: () => void
  addToCart: () => void
  disabled: boolean
  // isDisabled: boolean
  // setIsDisabled: Dispatch<SetStateAction<boolean>>
}

function Icon({ isLoading, inCart }: { isLoading: boolean; inCart: boolean }) {
  let icon = (
    <PlusCircle className="h-6 w-6 text-gray-500 opacity-60 transition group-hover:opacity-100" />
  )

  if (inCart) {
    return (icon = <CheckCircle2 className="h-6 w-6 text-green-600" />)
  } else if (isLoading) {
    return (icon = <Spinner />)
  }

  return icon
}

const DescriptionModal = ({ hit }: { hit: ProductHit }) => {
  if (!hit.description) {
    return null
  }

  // console.log("hh", hit)
  const сontent = hit?.description.split(";")

  return (
    // <Dialog>
    //   <DialogTrigger className="outline-none">
    //     <InformationCircleIcon className="ml-2 h-5 w-5 text-green-600"/>
    //   </DialogTrigger>
    //   <DialogContent className="p-0 sm:max-w-3xl">ggggg</DialogContent>
    // </Dialog>
    <Modal.Root>
      <Modal.Trigger>
        <InformationCircleIcon className="mx-2 h-5 w-5 text-green-600 transition ease-hover hover:text-green-800" />
      </Modal.Trigger>
      <Modal.Body>
        <div className="absolute right-2 top-2">
          <Modal.Close>
            <X className="h-5 w-5" />
          </Modal.Close>
        </div>
        <Modal.Title className="mt-2 text-sm">{hit.title}</Modal.Title>
        {сontent.map((c, index) => {
          return (
            index !== 0 && (
              <div key={c} className="text-[13px]">
                {c}
              </div>
            )
          )
        })}
      </Modal.Body>
    </Modal.Root>
  )
}

const Hit = ({ hit, loading, inCart, addToCart, disabled, close }: HitProps) => {
  const { cart } = useCart()
  const { product, isLoading } = useProduct(hit.id)

  const handleClick = () => {
    if (!cart?.id) {
      return
    }

    eCommerceCart({
      cardId: cart?.id,
      event: "add_to_cart",
      data: {
        items: [
          {
            item_name: product?.title?.trim() || "",
            item_id: hit.mid_code,
            price: hit.price.toFixed(2), // Ціна товару. Розділення для копійок має бути у вигляді крапки
            item_brand: "Vitalab",
            quantity: 1,
            ...transformCategories(product?.metadata?.category_tree as any),
          },
        ],
      },
    })

    addToCart()
  }

  if (!hit?.price) {
    return null
  }

  return (
    <div key={hit.id} className="flex h-fit items-center px-4 py-1 md:py-2">
      <Link href={`/tests/${hit.id}`} className="absolute top-0 left-0 bottom-0 right-[75px]" onClick={() => close()}/>
      <div className="grid w-full grid-cols-[1fr_5px] gap-4 md:grid-cols-[1fr_50px]">
        {/* <Thumbnail thumbnail={hit.thumbnail} size="full" /> */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            {/* {hit.collection_id && (
              <Link href={`/collections/${hit.collection_id}`} legacyBehavior>
                <a className="text-xs text-gray-500">{hit.collection_handle}</a>
              </Link>
            )} */}
            <span className="mr-2 text-xs text-gray-400">{hit.mid_code}.</span>
            <span className="items-center text-[13px]">
              {hit.title} - {hit?.price} грн
              <div className="ml-2 inline items-center" title="Срок виконання">
                <Clock3Icon className="mr-1 inline-flex h-3.5 w-3.5" />
                <span className="text-[12px] leading-3">{hit?.days} д.</span>
              </div>
            </span>
            {/* <span className="text-xs text-gray-700">{hit.description}</span> */}
          </div>
        </div>
      </div>

      <DescriptionModal hit={hit} />
      <button onClick={handleClick} disabled={disabled || inCart || isLoading}>
        {/* {loading ? (
          <Spinner />
        ) : (
          <Plus className="h-5 w-5 text-gray-400 hover:text-gray-900" />
        )} */}
        <Icon isLoading={loading} inCart={inCart} />
      </button>
    </div>
  )
}

export default Hit
