import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import type { Region } from "@medusajs/medusa"
import { cn } from "@utils/cn"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import type { CalculatedVariant } from "types/medusa"

type LineItemPriceProps = {
  variant: CalculatedVariant
  region: Region
  quantity: number
  style?: "default" | "tight"
}

const LineItemPrice = ({
  variant,
  region,
  quantity,
  style = "default",
}: LineItemPriceProps) => {
  // const hasReducedPrice = variant.calculated_price < variant.original_price;
  const getPercentageDiff = () => {
    const diff = variant.original_price - variant.calculated_price
    const decrease = (diff / variant.original_price) * 100

    return decrease
  }
  const hasReducedPrice = getPercentageDiff()

  return (
    <div className="flex flex-col text-right text-gray-700">
      <span
        className={cn("text-s", {
          "text-orange-600 font-semibold": hasReducedPrice > 11,
        })}
      >
        {variant.calculated_price / 100} грн
        {/* {formatAmount({
          amount: variant.calculated_price * quantity,
          region: region,
          includeTaxes: false,
        })} */}
      </span>
      {/* {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-gray-500">Original: </span>
            )}
            <span className="line-through">
              {formatAmount({
                amount: variant.original_price * quantity,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-rose-600">
              -
              {getPercentageDiff(
                variant.original_price,
                variant.calculated_price
              )}
              %
            </span>
          )}
        </>
      )} */}
    </div>
  )
}

export default LineItemPrice
