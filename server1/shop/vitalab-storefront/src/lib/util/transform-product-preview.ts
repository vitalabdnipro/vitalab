import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import type { Product, Region } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import type { ProductPreviewType } from "types/global"
import type { CalculatedVariant } from "types/medusa"

const transformProductPreview = (
  product: Product,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as CalculatedVariant[]

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    thumbnail: product.thumbnail,
  }
}

export default transformProductPreview
