import { useMemo } from "react"
import { formatAmount, useCart, useProducts } from "medusa-react"
import type { CalculatedVariant } from "types/medusa"

type useProductPriceProps = {
  id: string
  variantId?: string
}

const useProductPrice = ({ id, variantId }: useProductPriceProps) => {
  const { cart } = useCart()

  const { products, isLoading, isError } = useProducts(
    {
      id: id,
      cart_id: cart?.id,
    },
    { enabled: !!cart }
  )

  const product = products?.[0]

  const getPercentageDiff = (original: number, calculated: number) => {
    const diff = original - calculated
    const decrease = (diff / original) * 100

    return decrease.toFixed()
  }

  const cheapestPrice = () => {
    if (!product || !cart?.region) {
      return null
    }

    const variants = product.variants as CalculatedVariant[]

    const cheapestVariant = variants.reduce((prev, curr) => {
      return prev.calculated_price < curr.calculated_price ? prev : curr
    })

    return {
      calculated_price: cheapestVariant.calculated_price,
      original_price: cheapestVariant.original_price,
      price_type: cheapestVariant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        cheapestVariant.original_price,
        cheapestVariant.calculated_price
      ),
    }
  }

  const variantPrice = () => {
    if (!product || !variantId || !cart?.region) {
      return null
    }

    const variant = product.variants.find(
      (v) => v.id === variantId || v.sku === variantId
    ) as CalculatedVariant

    if (!variant) {
      return null
    }

    return {
      calculated_price: variant.calculated_price,
      original_price: variant.original_price,
      price_type: variant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        variant.original_price,
        variant.calculated_price
      ),
    }
  }

  return {
    product,
    cheapestPrice,
    variantPrice,
    isLoading,
    isError,
  }
}

export default useProductPrice
